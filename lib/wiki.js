// Wiki reader — reads markdown files from /wiki at build time.
// Exposes: getAllSlugs, getPage, getAllSlugsSet.
// All paths are resolved from the project root.

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const WIKI_DIR = path.join(process.cwd(), "wiki");

// Files that exist in /wiki but should not become pages.
const NON_PAGE_FILES = new Set(["index.md", "log.md"]);

export function getAllSlugs() {
  if (!fs.existsSync(WIKI_DIR)) return [];
  return fs
    .readdirSync(WIKI_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

// All slugs that become real pages under /wiki/[slug]/
export function getPageSlugs() {
  return getAllSlugs().filter((s) => !NON_PAGE_FILES.has(`${s}.md`));
}

// Set-form of page slugs, used to detect redlinks.
export function getSlugsSet() {
  return new Set(getPageSlugs());
}

export function getPage(slug) {
  const filePath = path.join(WIKI_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return { slug, frontmatter: data || {}, body: content || "" };
}

// Preprocess markdown body: resolve [[WikiLink]] and [[WikiLink|display]].
// - If the target slug exists → blue internal link
// - If not → red link with class="redlink"
// Replacement outputs raw HTML so we can carry the redlink class through;
// react-markdown is configured with rehype-raw to allow inline HTML.
export function preprocessWikiLinks(body, slugsSet) {
  return body.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_, target, label) => {
    const slug = target.trim().replace(/\s+/g, "_");
    const display = (label || target).trim();
    const exists = slugsSet.has(slug);
    const href = `/wiki/${slug}/`;
    if (exists) {
      return `<a href="${href}">${display}</a>`;
    }
    return `<a href="${href}" class="redlink">${display}</a>`;
  });
}

// Returns the index.md body (no frontmatter assumed).
export function getIndexBody() {
  const p = path.join(WIKI_DIR, "index.md");
  if (!fs.existsSync(p)) return "";
  return fs.readFileSync(p, "utf8");
}
