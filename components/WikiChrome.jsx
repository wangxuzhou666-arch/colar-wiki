// Shared Wikipedia-style shell: top bar, tabs, sidebar, footer.
// The sidebar lists real wiki pages; all links go to /wiki/<slug>/.

export function WikiTopBar() {
  return (
    <>
      <div className="wiki-topbar">
        <div className="wiki-topbar-inner">
          <a href="/wiki/Colar_Wang/" className="wiki-logo" style={{ textDecoration: "none" }}>
            Colarpedia
            <span>The Free Résumé</span>
          </a>
          <div className="wiki-search">
            <input
              type="text"
              placeholder="Search Colarpedia"
              aria-label="Search Colarpedia"
              disabled
            />
          </div>
        </div>
      </div>
      <div className="wiki-tabs">
        <div className="wiki-tabs-inner">
          <a href="#" className="active">Article</a>
          <a href="#talk">Talk</a>
          <a href="#read">Read</a>
          <a
            href="https://github.com/wangxuzhou666-arch/colar-wiki"
            className="external"
            target="_blank"
            rel="noreferrer"
          >
            View source
          </a>
          <a href="#history">History</a>
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
        <li><a href="/wiki/Colar_Wang/">Main page</a></li>
        <li><a href="/wiki/Colar_Wang/#see-also">Contents</a></li>
      </ul>

      <h4>Notable works</h4>
      <ul>
        <li><a href="/wiki/KitchenSurvivor/">KitchenSurvivor</a></li>
        <li><a href="/wiki/AgentConfig/">AgentConfig</a></li>
      </ul>

      <h4>Experience</h4>
      <ul>
        <li><a href="/wiki/ByteDance_TikTok_internship/">ByteDance / TikTok</a></li>
        <li><a href="/wiki/China_Galaxy_Securities/">China Galaxy Securities</a></li>
        <li><a href="/wiki/CITIC_Futures/">CITIC Futures</a></li>
        <li><a href="/wiki/China_International_Capital_Corporation/">CICC</a></li>
      </ul>

      <h4>Education</h4>
      <ul>
        <li><a href="/wiki/University_of_Pennsylvania/">U. of Pennsylvania</a></li>
        <li><a href="/wiki/University_of_Nottingham/">U. of Nottingham</a></li>
      </ul>

      <h4>Concepts</h4>
      <ul>
        <li><a href="/wiki/First-principles_thinking/">First-principles thinking</a></li>
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

      <h4>Tools</h4>
      <ul>
        <li><a href="javascript:window.print()">Print / PDF</a></li>
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

// Inline [edit] link for section headings — kept exported for backward compat.
export function EditLink({ section }) {
  const href = `https://github.com/wangxuzhou666-arch/colar-wiki/edit/main/wiki`;
  return (
    <span className="edit-link">
      <a href={href} target="_blank" rel="noreferrer">
        edit
      </a>
    </span>
  );
}
