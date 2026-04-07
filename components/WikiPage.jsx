// WikiPage — renders a single wiki article from parsed markdown.
// Handles: title block, frontmatter-driven infobox, body markdown,
// auto-generated [edit] link on h2, and the GitHub edit URL.

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";

import Infobox from "@/components/Infobox";
import { preprocessWikiLinks } from "@/lib/wiki";

const GITHUB_EDIT_BASE =
  "https://github.com/wangxuzhou666-arch/colar-wiki/edit/main/wiki";

export default function WikiPage({ slug, frontmatter, body, slugsSet }) {
  const processed = preprocessWikiLinks(body, slugsSet);

  const {
    title = slug.replace(/_/g, " "),
    subtitle,
    infobox,
  } = frontmatter || {};

  const editHref = `${GITHUB_EDIT_BASE}/${slug}.md`;

  return (
    <main className="wiki-main" id="main-content">
      <h1 className="wiki-title">
        {title}
        <span className="edit-link" style={{ fontSize: "12px" }}>
          <a href={editHref} target="_blank" rel="noreferrer">
            edit
          </a>
        </span>
      </h1>
      {subtitle && <p className="wiki-title-sub">{subtitle}</p>}
      <p className="wiki-tagline">From Colarpedia, the free résumé</p>

      {infobox && <Infobox data={infobox} />}

      <div className="wiki-body">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw, rehypeSlug]}
          components={{
            h2: ({ node, children, ...props }) => (
              <h2 {...props}>
                {children}
                <span className="edit-link">
                  <a href={editHref} target="_blank" rel="noreferrer">
                    edit
                  </a>
                </span>
              </h2>
            ),
            a: ({ node, href, className, children, ...props }) => {
              const isExternal =
                href && (href.startsWith("http://") || href.startsWith("https://") || href.startsWith("mailto:"));
              const isRedlink = className && className.includes("redlink");
              const classes = [];
              if (isExternal) classes.push("external");
              if (isRedlink) classes.push("redlink");
              return (
                <a
                  href={href}
                  className={classes.join(" ") || undefined}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noreferrer" : undefined}
                  {...props}
                >
                  {children}
                </a>
              );
            },
            blockquote: ({ node, ...props }) => <blockquote {...props} />,
          }}
        >
          {processed}
        </ReactMarkdown>
      </div>
    </main>
  );
}
