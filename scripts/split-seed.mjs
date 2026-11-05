import { readFileSync, writeFileSync } from "node:fs";

const text = readFileSync(new URL("./seed.sql", import.meta.url), "utf8");
const marker = "(select id from public.categories where slug = 'fantasy')";
const at = text.indexOf(marker);
const head = text.slice(0, at).trimEnd().replace(/,\s*$/, ";\n");
const insertAt = text.lastIndexOf("insert into public.products", at);
const valuesAt = text.indexOf("values", insertAt);
const cols = text.slice(insertAt, valuesAt + "values".length);
const reviewsAt = text.indexOf("insert into public.reviews");
const rest = text.slice(at, reviewsAt).trim().replace(/,\s*$/, ";\n");
writeFileSync(new URL("./seed-a.sql", import.meta.url), head);
writeFileSync(new URL("./seed-b.sql", import.meta.url), `${cols}\n${rest}\n${text.slice(reviewsAt)}`);
console.log("split", head.length, rest.length);
