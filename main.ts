import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Copies entry.txt byte-for-byte to $MAKEFUN_OUTPUT_DIR/entry.txt.
// Writes nothing to the repo and renders nothing.
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
  console.error(`entry.txt is ${chars} characters, over the 140 limit`);
  process.exit(1);
}
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), buf);
