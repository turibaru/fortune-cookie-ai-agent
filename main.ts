import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Copies entry.txt byte-for-byte to $MAKEFUN_OUTPUT_DIR/entry.txt.
// Writes nothing to the repo and renders nothing.
// A fortune-cookie line is at most 140 characters: the guard below
// enforces that cap (and rejects empty text) before anything is written,
// so an oversize entry fails loudly instead of reaching the judge.
const here = dirname(fileURLToPath(import.meta.url));
const src = join(here, "entry.txt");
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

const buf = readFileSync(src);
const text = buf.toString("utf8");
if (text.trim().length === 0) {
  console.error("entry.txt is empty or whitespace-only");
  process.exit(1);
}
const chars = [...text].length;
if (chars > 140) {
  console.error(`entry.txt is ${chars} characters; the fortune-cookie cap is 140, entry rejected`);
  process.exit(1);
}
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), buf);
