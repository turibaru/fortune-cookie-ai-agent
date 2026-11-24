// Fortune runner: it takes the single line kept next to this script and hands it on to the grading folder.
// The line must stay within one hundred and forty characters, counted one code point at a time.
// The finished file always lands in the folder named by MAKEFUN_OUTPUT_DIR, nowhere else.
// Running it again on the same line always produces the same output file, with nothing extra added.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const outputDir = process.env.MAKEFUN_OUTPUT_DIR;

if (!outputDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}

mkdirSync(outputDir, { recursive: true });

const entry = readFileSync(join(root, "entry.txt"), "utf8");

const entryLength = [...entry].length;
if (entryLength > 140) {
  console.error(`entry is ${entryLength} characters, over the 140-character limit`);
  process.exit(1);
}

writeFileSync(join(outputDir, "entry.txt"), entry);
