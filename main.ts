// Fortune Cookie for an AI Agent — round 2 entrypoint.
//
// Reads the single fortune line from entry.txt next to this file and
// copies it byte-for-byte to $MAKEFUN_OUTPUT_DIR/entry.txt, where the
// sealed scorer checks it (UTF-8 text, 1 to 140 characters, not only
// whitespace). Refuses anything else with exit code 1.
//
// Uses only node:fs, node:path and node:url — no dependencies, no DOM,
// no network, nothing written back into the repository.

import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.txt");

const outputDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outputDir) {
  console.error("MAKEFUN_OUTPUT_DIR is not set");
  process.exit(1);
}

const text = readFileSync(source, "utf8");
if (text.trim().length === 0) {
  console.error("entry.txt is empty or whitespace-only");
  process.exit(1);
}
const length = [...text].length; // code points, so astral characters count once
if (length > 140) {
  console.error(`entry.txt is ${length} characters, over the 140 limit`);
  process.exit(1);
}

mkdirSync(outputDir, { recursive: true });
copyFileSync(source, join(outputDir, "entry.txt"));
