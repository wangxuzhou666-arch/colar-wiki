// Shared Wikipedia-style shell: top bar, tabs, sidebar, footer.
// All tabs (Article / Talk / View source / History) link to real
// destinations — Talk and History route to GitHub equivalents for the
// current page's source markdown file.

import SearchBox from "./SearchBox";

const GH_OWNER = "wangxuzhou666-arch";
const GH_REPO = "colar-wiki";
const GH_BASE = `https://github.com/${GH_OWNER}/${GH_REPO}`;

export function WikiTopBar({ slug, pages }) {
  const fileEditUrl = slug
    ? `${GH_BASE}/edit/main/wiki/${slug}.md`
    : `${GH_BASE}`;
  const fileHistoryUrl = slug
    ? `${GH_BASE}/commits/main/wiki/${slug}.md`
    : `${GH_BASE}/commits/main`;
  const issuesUrl = slug
    ? `${GH_BASE}/issues/new?title=${encodeURIComponent(`Talk: ${slug}`)}`
    : `${GH_BASE}/issues`;

  return (
    <>
      <div className="wiki-topbar">
        <div className="wiki-topbar-inner">
          <a
            href="/wiki/Colar_Wang/"
            className="wiki-logo"
            style={{ textDecoration: "none" }}
          >
            Colarpedia
            <span>The Free Résumé</span>
          </a>
          <SearchBox pages={pages || []} />
        </div>
      </div>
      <div className="wiki-tabs">
        <div className="wiki-tabs-inner">
          <a href="#" className="active">
            Article
          </a>
          <a
            href={issuesUrl}
            className="external"
            target="_blank"
            rel="noreferrer"
            title="Open a GitHub issue to discuss this page"
          >
            Talk
          </a>
          <a
            href={fileEditUrl}
            className="external"
            target="_blank"
            rel="noreferrer"
            title="Edit this page on GitHub"
          >
            View source
          </a>
          <a
            href={fileHistoryUrl}
            className="external"
            target="_blank"
            rel="noreferrer"
            title="View this page's commit history on GitHub"
          >
            History
          </a>
        </div>
      </div>
    </>
  );
}

export function WikiSidebar() {
  return (
    <aside className="wiki-sidebar" aria-label="Navigation">
      <h4>Navigation</h4>
      <ul>
        <li>
          <a href="/wiki/Colar_Wang/">Main page</a>
        </li>
        <li>
          <a href="/wiki/Colar_Wang/#see-also">Contents</a>
        </li>
      </ul>

      <h4>Notable works</h4>
      <ul>
        <li>
          <a href="/wiki/KitchenSurvivor/">KitchenSurvivor</a>
        </li>
        <li>
          <a href="/wiki/AgentConfig/">AgentConfig</a>
        </li>
      </ul>

      <h4>Experience</h4>
      <ul>
        <li>
          <a href="/wiki/ByteDance_TikTok_internship/">ByteDance / TikTok</a>
        </li>
        <li>
          <a href="/wiki/China_Galaxy_Securities/">China Galaxy Securities</a>
        </li>
        <li>
          <a href="/wiki/CITIC_Futures/">CITIC Futures</a>
        </li>
        <li>
          <a href="/wiki/China_International_Capital_Corporation/">CICC</a>
        </li>
      </ul>

      <h4>Education</h4>
      <ul>
        <li>
          <a href="/wiki/University_of_Pennsylvania/">U. of Pennsylvania</a>
        </li>
        <li>
          <a href="/wiki/University_of_Nottingham/">U. of Nottingham</a>
        </li>
      </ul>

      <h4>Concepts</h4>
      <ul>
        <li>
          <a href="/wiki/First-principles_thinking/">First-principles thinking</a>
        </li>
      </ul>

      <h4>Contribute</h4>
      <ul>
        <li>
          <a
            href="https://www.linkedin.com/in/xuzhou-wang/"
            className="external"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
        </li>
        <li>
          <a href="mailto:xuzhou.wang.upenn@gmail.com">Email the author</a>
        </li>
      </ul>
    </aside>
  );
}

export function WikiFooter() {
  return (
    <footer className="wiki-footer">
      <p>This page was last edited on 7 April 2026, at 00:00 (UTC).</p>
      <p>
        Text is available under the personal responsibility of its author;
        additional terms may apply. Colarpedia is a stylistic tribute to
        Wikipedia and not affiliated with the Wikimedia Foundation.
      </p>
      <p>
        <a
          href="https://www.linkedin.com/in/xuzhou-wang/"
          className="external"
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn
        </a>
        {" · "}
        <a href="mailto:xuzhou.wang.upenn@gmail.com">Contact</a>
        {" · "}
        <a
          href="https://github.com/wangxuzhou666-arch"
          className="external"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
      </p>
    </footer>
  );
}

// Inline [edit] link kept exported for backward compat.
export function EditLink() {
  const href = `${GH_BASE}/edit/main/wiki`;
  return (
    <span className="edit-link">
      <a href={href} target="_blank" rel="noreferrer">
        edit
      </a>
    </span>
  );
}
