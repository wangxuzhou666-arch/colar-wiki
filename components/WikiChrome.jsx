// Bilingual Wikipedia-style shell.
// Pass `lang` ("en" | "zh") to control all interface strings and the
// language toggle button (top-left, next to the logo).

import SearchBox from "./SearchBox";

const GH_OWNER = "wangxuzhou666-arch";
const GH_REPO = "colar-wiki";
const GH_BASE = `https://github.com/${GH_OWNER}/${GH_REPO}`;

const STRINGS = {
  en: {
    siteName: "Colarpedia",
    siteTagline: "The Free Résumé",
    article: "Article",
    talk: "Talk",
    viewSource: "View source",
    history: "History",
    nav: "Navigation",
    mainPage: "Main page",
    contents: "Contents",
    notable: "Notable works",
    experience: "Experience",
    education: "Education",
    concepts: "Concepts",
    contribute: "Contribute",
    emailAuthor: "Email the author",
    talkTitle: "Open a GitHub issue to discuss this page",
    sourceTitle: "Edit this page on GitHub",
    historyTitle: "View this page's commit history on GitHub",
    footerEdited: "This page was last edited on 7 April 2026, at 00:00 (UTC).",
    footerLicense:
      "Text is available under the personal responsibility of its author; additional terms may apply. Colarpedia is a stylistic tribute to Wikipedia and not affiliated with the Wikimedia Foundation.",
    contact: "Contact",
    langToggle: "中文",
    langToggleTitle: "切换到中文版本",
    upenn: "U. of Pennsylvania",
    nottingham: "U. of Nottingham",
    bytedance: "ByteDance / TikTok",
    galaxy: "China Galaxy Securities",
    citic: "CITIC Futures",
    cicc: "CICC",
    fpt: "First-principles thinking",
  },
  zh: {
    siteName: "Colarpedia",
    siteTagline: "自由的个人百科",
    article: "文章",
    talk: "讨论",
    viewSource: "查看源代码",
    history: "查看历史",
    nav: "导航",
    mainPage: "主页",
    contents: "目录",
    notable: "代表作品",
    experience: "工作经历",
    education: "教育背景",
    concepts: "理念",
    contribute: "参与贡献",
    emailAuthor: "联系作者",
    talkTitle: "在 GitHub 上打开 Issue 讨论本页",
    sourceTitle: "在 GitHub 上编辑本页",
    historyTitle: "在 GitHub 上查看本页提交历史",
    footerEdited: "本页面最后修订于 2026 年 4 月 7 日,UTC 00:00。",
    footerLicense:
      "本站文本由作者个人维护,版权归作者所有。Colarpedia 是对维基百科视觉风格的致敬作品,与维基媒体基金会无任何关联。",
    contact: "联系方式",
    langToggle: "EN",
    langToggleTitle: "Switch to English",
    upenn: "宾夕法尼亚大学",
    nottingham: "诺丁汉大学",
    bytedance: "字节跳动 / TikTok",
    galaxy: "中国银河证券",
    citic: "中信期货",
    cicc: "中金公司",
    fpt: "第一性原理思维",
  },
};

function wikiHref(slug, lang) {
  return lang === "zh" ? `/zh/wiki/${slug}/` : `/wiki/${slug}/`;
}

export function WikiTopBar({ slug, pages, lang = "en" }) {
  const t = STRINGS[lang] || STRINGS.en;

  const otherLang = lang === "zh" ? "en" : "zh";
  const otherSlug = slug || "Colar_Wang";
  const otherUrl = wikiHref(otherSlug, otherLang);

  const fileName = lang === "zh" ? `${slug}.zh.md` : `${slug}.md`;
  const fileEditUrl = slug
    ? `${GH_BASE}/edit/main/wiki/${fileName}`
    : `${GH_BASE}`;
  const fileHistoryUrl = slug
    ? `${GH_BASE}/commits/main/wiki/${fileName}`
    : `${GH_BASE}/commits/main`;
  const issuesUrl = slug
    ? `${GH_BASE}/issues/new?title=${encodeURIComponent(`Talk: ${slug}`)}`
    : `${GH_BASE}/issues`;

  return (
    <>
      <div className="wiki-topbar">
        <div className="wiki-topbar-inner">
          <a
            href={wikiHref("Colar_Wang", lang)}
            className="wiki-logo"
            style={{ textDecoration: "none" }}
          >
            {t.siteName}
          </a>
          <a
            href={otherUrl}
            title={t.langToggleTitle}
            className="lang-toggle"
          >
            {t.langToggle}
          </a>
          <SearchBox pages={pages || []} lang={lang} />
        </div>
      </div>
      <div className="wiki-tabs">
        <div className="wiki-tabs-inner">
          <a href="#" className="active">
            {t.article}
          </a>
          <a
            href={issuesUrl}
            className="external"
            target="_blank"
            rel="noreferrer"
            title={t.talkTitle}
          >
            {t.talk}
          </a>
          <a
            href={fileEditUrl}
            className="external"
            target="_blank"
            rel="noreferrer"
            title={t.sourceTitle}
          >
            {t.viewSource}
          </a>
          <a
            href={fileHistoryUrl}
            className="external"
            target="_blank"
            rel="noreferrer"
            title={t.historyTitle}
          >
            {t.history}
          </a>
        </div>
      </div>
    </>
  );
}

export function WikiSidebar({ lang = "en" }) {
  const t = STRINGS[lang] || STRINGS.en;
  return (
    <aside className="wiki-sidebar" aria-label={t.nav}>
      <h4>{t.nav}</h4>
      <ul>
        <li><a href={wikiHref("Colar_Wang", lang)}>{t.mainPage}</a></li>
      </ul>

      <h4>{t.notable}</h4>
      <ul>
        <li><a href={wikiHref("KitchenSurvivor", lang)}>KitchenSurvivor</a></li>
        <li><a href={wikiHref("AgentConfig", lang)}>AgentConfig</a></li>
      </ul>

      <h4>{t.experience}</h4>
      <ul>
        <li><a href={wikiHref("ByteDance_TikTok_internship", lang)}>{t.bytedance}</a></li>
        <li><a href={wikiHref("China_Galaxy_Securities", lang)}>{t.galaxy}</a></li>
        <li><a href={wikiHref("CITIC_Futures", lang)}>{t.citic}</a></li>
        <li><a href={wikiHref("China_International_Capital_Corporation", lang)}>{t.cicc}</a></li>
      </ul>

      <h4>{t.education}</h4>
      <ul>
        <li><a href={wikiHref("University_of_Pennsylvania", lang)}>{t.upenn}</a></li>
        <li><a href={wikiHref("University_of_Nottingham", lang)}>{t.nottingham}</a></li>
      </ul>

      <h4>{t.contribute}</h4>
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
          <a href="mailto:xuzhou.wang.upenn@gmail.com">{t.emailAuthor}</a>
        </li>
      </ul>
    </aside>
  );
}

export function WikiFooter({ lang = "en" }) {
  const t = STRINGS[lang] || STRINGS.en;
  return (
    <footer className="wiki-footer">
      <p>{t.footerEdited}</p>
      <p>{t.footerLicense}</p>
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
        <a href="mailto:xuzhou.wang.upenn@gmail.com">{t.contact}</a>
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

export function EditLink() {
  return (
    <span className="edit-link">
      <a href={`${GH_BASE}/edit/main/wiki`} target="_blank" rel="noreferrer">
        edit
      </a>
    </span>
  );
}
