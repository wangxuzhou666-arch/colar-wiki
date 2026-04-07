# Colarpedia

A Wikipedia-styled personal résumé built as a multi-page LLM-maintained wiki.

Live site: **https://colar-wiki.vercel.app/wiki/Colar_Wang/**

> Visual homage to Wikipedia · architecture inspired by Karpathy's
> [LLM Wiki](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f) pattern.

## What is this

Most personal sites are single pages of hand-written HTML. Colarpedia is
a **wiki** — a directory of interlinked markdown files (`wiki/*.md`)
about a single person (me), rendered in a faithful Wikipedia visual
style. Every project, job, school, and concept gets its own page. Pages
link to each other with `[[WikiLink]]` syntax. Redlinks exist for pages
that haven't been written yet.

Content and presentation are completely decoupled:

- **`/wiki/*.md`** — the source of truth. Plain markdown with YAML
  frontmatter that drives the right-floated infobox.
- **`/app`, `/components`, `/lib`** — the Next.js rendering layer. You
  almost never need to touch this.
- **`CLAUDE.md`** — the schema that tells Claude Code how to maintain
  the wiki over time (voice rules, ingest workflow, frontmatter format).

## Why a wiki and not a one-pager

Because my life keeps adding pages. A static résumé is frozen the
moment it's written; a wiki grows. When I start at a new company,
ship a new product, or read a book that changes how I think, the
right response is _add a page_, not _rewrite the homepage_. The LLM
does the bookkeeping: updating cross-references, bumping statuses,
appending the change log.

## Stack

- **Next.js 15** (App Router, `output: 'export'` → fully static)
- **react-markdown** + **remark-gfm** + **rehype-raw** + **rehype-slug**
- **gray-matter** for YAML frontmatter
- Custom `[[WikiLink]]` preprocessor with automatic red links
- Zero client-side JavaScript beyond the root redirect

## Local development

```bash
npm install
npm run dev          # http://localhost:3000
```

## Build

```bash
npm run build        # static export to ./out
```

## Add a new page

1. Create `wiki/<Page_Name>.md` with frontmatter (see existing pages).
2. Link to it from relevant places with `[[Page_Name]]`.
3. Add an entry to `wiki/index.md`.
4. Append to `wiki/log.md`.

Or just ask Claude Code: _"add a page for X and update Colar_Wang.md"_.
`CLAUDE.md` tells it exactly how.

## Credit

- Pattern: Andrej Karpathy, _LLM Wiki_ (2026).
- Visual system: Wikipedia (Wikimedia Foundation).
