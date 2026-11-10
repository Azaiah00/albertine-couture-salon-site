// Flow audit: checks the BUILT HTML (run `npm run build` first).
// Titles, descriptions, one H1, image alts, NAP, emoji, placeholders,
// internal links and every Vagaro menu price from services.ts shown on /services.
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const APP = join(ROOT, ".next/server/app");
const fails = [];
const warn = [];
const ok = (c, m) => (c ? null : fails.push(m));

function walk(dir, out = []) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (f.endsWith(".html")) out.push(p);
  }
  return out;
}
const strip = (h) => h.replace(/<!-- -->/g, "").replace(/<script[\s\S]*?<\/script>/g, "").replace(/<style[\s\S]*?<\/style>/g, "");
const text = (h) => strip(h).replace(/<[^>]+>/g, " ").replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/\s+/g, " ");

const files = walk(APP).filter((f) => !/_not-found|_global-error/.test(f));
const routes = new Set(files.map((f) => f.slice(APP.length).replace(/\.html$/, "").replace(/\/index$/, "") || "/"));
routes.add("/");
const isPortal = (r) => r.startsWith("/portal") || r === "/book";

for (const f of files) {
  const route = f.slice(APP.length).replace(/\.html$/, "").replace(/^\/index$/, "/") || "/";
  const html = readFileSync(f, "utf8");
  const body = strip(html);
  const t = ((html.match(/<title>([^<]*)<\/title>/) || [])[1] ?? "").replace(/&amp;/g, "&");
  const d = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1] ?? "";
  ok(t, `${route}: missing <title>`);
  if (!isPortal(route)) {
    if (t.length > 70) warn.push(`${route}: title ${t.length} chars — "${t}"`);
    ok(d.length >= 70 && d.length <= 165, `${route}: description ${d.length} chars`);
    const h1 = (body.match(/<h1[\s>]/g) || []).length;
    ok(h1 === 1, `${route}: ${h1} <h1> elements`);
    ok(/\(301\) 765-4915/.test(body), `${route}: Gaithersburg phone missing`);
    ok(/\(571\) 409-8230/.test(body), `${route}: Dumfries phone missing`);
    ok(/305 Muddy Branch Rd/.test(body), `${route}: Gaithersburg address missing`);
    ok(/<link rel="canonical"/.test(html), `${route}: canonical missing`);
  }
  for (const img of body.match(/<img\b[^>]*>/g) || []) ok(/\balt="/.test(img), `${route}: <img> without alt: ${img.slice(0, 90)}`);
  const tx = text(html);
  ok(!/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u.test(tx), `${route}: emoji in visible text`);
  ok(!/lorem|ipsum|TODO|TBD|undefined|NaN/.test(tx), `${route}: placeholder / debug text visible`);
  for (const m of body.matchAll(/href="(\/[^"#?]*)/g)) {
    const h = m[1].replace(/\/$/, "") || "/";
    if (/\.(png|jpg|webp|svg|xml|txt|webmanifest|html|ico)$/.test(h) || h.startsWith("/_next")) continue;
    ok(routes.has(h), `${route}: broken internal link ${h}`);
  }
  // wrong facts that must never appear
  ok(!/Mon(day)?[^.]{0,20}1:00 ?PM/.test(tx), `${route}: Yelp's 1 PM opening time shown`);
}

// Every service price in services.ts must be visible on /services
const servicesHtml = text(readFileSync(join(APP, "services.html"), "utf8"));
const ts = readFileSync(join(ROOT, "src/lib/services.ts"), "utf8");
const menu = [...ts.matchAll(/vagaro: "([^"]+)"[^\n]*?price: (\d+)/g)].map((m) => [m[1], +m[2]]);
for (const [name, price] of menu) {
  if (!price) continue;
  const p = "$" + price.toLocaleString("en-US");
  ok(servicesHtml.includes(p), `/services missing price ${p} (${name})`);
}
// wrong facts: other client's details must never ship
for (const f of files) ok(!/I Am Image|Portland|503\) 224/.test(readFileSync(f, "utf8")), `${f.slice(APP.length)}: leftover I Am Image detail`);
ok(existsSync(join(ROOT, "public/og.jpg")), "public/og.jpg missing");

console.log(`Checked ${files.length} pages, ${menu.length} menu items.`);
warn.forEach((w) => console.log("WARN", w));
if (fails.length) {
  fails.forEach((f) => console.log("FAIL", f));
  process.exit(1);
}
console.log("Flow audit passed.");
