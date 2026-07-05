# Colarpedia — change log

Append-only record of ingests, updates, and lint passes.
Format: `## [YYYY-MM-DD] <type> | <short description>`

## [2026-07-05] update | Drop References site-wide + AgentConfig figure restructure + caption trim

Session of small layout/content passes on the two product pages plus a
site-wide citation removal. Root cause of the "empty References" the
author noticed: remark-gfm relocates footnote definitions into its own
`sr-only`-titled section at page end, so the hand-written `## References`
heading rendered with nothing under it. Author judged the
self-referential citations low-value and chose to delete the layer
outright rather than fix the rendering.

- updated: wiki/AgentConfig.md, .zh.md — hero figure moved from before
  the intro to below the Concept section (with `clear: both` to clear the
  infobox float and remove the whitespace gap); node-based workflow figure
  relocated from the Recommendation section to Technology (its content —
  model / orchestration / token / temperature config panel — matches that
  section); all three figure captions cut to one line
- replaced: public/agentconfig/hero.jpg — new landing-page screenshot,
  same filename; deleted public/agentconfig/interview.jpg
- updated: wiki/KitchenSurvivor.md, .zh.md — both figure captions cut to
  one line
- removed: `## References` / `## 参考资料` sections and every inline
  `[^n]` marker + `[^n]:` definition across all 18 en/zh content pages
  (Colar_Wang had 8 footnotes; every other page 1). Colar_Wang External
  links list (LinkedIn / App Store markdown links) kept — body prose, not
  footnotes
- shipped: committed e3d014e, pushed origin/main; build verified via
  static export with app/robots.js + app/sitemap.js moved aside

## [2026-07-05] update | Infobox trim (medium) + KitchenSurvivor Translation

Author direction: shrink every project/experience infobox ("缩减介绍框").
Chosen level: medium — trim experience/education infoboxes to ~6 core
rows, trim products to core facts. Main biography infobox left as-is.

- updated: experience pages — dropped the redundant "Person / 实习生 /
  学生" back-link row on every page; also dropped Team/Function/Status on
  ByteDance and Team on China Galaxy (Status was redundant with Dates)
- updated: product pages — dropped "Target audience / 目标用户" and the
  low-signal "License / 许可证" (专有) rows on AgentConfig and
  KitchenSurvivor
- updated: wiki/KitchenSurvivor.md — Translation row changed from
  "Cloud-side little stove" to "KitchenSurvivor" (per author). ZH
  KitchenSurvivor.zh.md — dropped the redundant literal-gloss row
  (字面释义)
- unchanged: Colar_Wang infobox (not a project)

## [2026-07-05] update | AgentConfig screenshots landed + Career reorder + lint

- added: public/agentconfig/{hero,interview,recommendation,workflow-editor}.jpg
  (four real screenshots supplied by author; captions written from the
  actual images — example build is "Excel 自动工坊", model DeepSeek
  deepseek-reasoner — not the earlier placeholder "零码速记员")
- updated: wiki/AgentConfig.md — infobox hero image (.jpg) + three inline
  figures: structured interview (Concept), recommendation card and
  node-based workflow editor (Recommendation). Portrait screenshots use
  figure-portrait.
- updated: wiki/AgentConfig.zh.md — mirrored
- updated: wiki/AgentConfig.md — removed duplicate top "Live site" infobox
  row (kept the one under Links, matching KitchenSurvivor house style)
- updated: wiki/Colar_Wang.md + .zh.md — Career section reordered to clean
  reverse-chronological: ByteDance/TikTok (2026) moved to the top, then
  KitchenSurvivor, China Galaxy Securities, earlier financial roles
- lint: full infobox/wikilink/image/EN-ZH audit — no empty rows, no
  duplicate labels, no broken image refs, all pages have zh; only stale
  refs are [[CICC]] / [[First-principles_thinking]] inside log.md (a
  non-rendered changelog, so no live red links)

## [2026-07-04] update | AgentConfig screenshots (hero + recommendation + workflow editor)

Author direction: add product screenshots to the AgentConfig page as
restrained Wikipedia-style figures (chose "克制的百科配图" over a
product-showcase gallery). The workflow-editor screen documents an
existing but previously-unwritten feature; body status text unchanged.

- created: public/agentconfig/ — awaiting three files: hero.png,
  recommendation.png, workflow-editor.png (not yet on disk)
- updated: wiki/AgentConfig.md — infobox hero image + two inline
  figures (recommendation results, node-based workflow editor) + one
  sentence documenting the workflow editor
- updated: wiki/AgentConfig.zh.md — mirrored (infobox 主图 + 两处
  figure + 工作流描述)

## [2026-07-04] update | Content streamlining — de-bloat, de-AI, AI-PM-forward

Author direction: streamline content, minimize "AI flavor", and better
showcase AI-product-management signal, with EN as the authoritative
outward-facing version and ZH aligned to it. Informed by a multi-expert
review panel.

- removed: components/WikiChrome.jsx — the Talk / View source / History tab
  bar and the now-unused file/issue URL helpers (author request; explicit
  render-layer change)
- rewrote: wiki/AgentConfig.md — cut the five-step User-flow list, the
  APPROVED_REPOS table, and prose framework version numbers; foregrounded
  the curated-catalog hallucination-control trade-off and the OTP /
  model-routing / built-in-A-B decisions (~207 → ~110 lines)
- rewrote: wiki/KitchenSurvivor.md — cut the ## Features catalog (twelve
  ingredient categories, five-mood table, location-tier bullets); reframed
  around product decisions and outcomes (on-device OCR cost cut, streaming
  latency, preference-rec task completion, TestFlight growth); kept the
  recipe-executability north-star (~95%)
- rewrote: wiki/ByteDance_TikTok_internship.md — Responsibilities converted
  from four résumé-style bullets to prose (fixes a body-bullet style
  violation); work description held at public-job-posting level
- privacy: wiki/ByteDance_TikTok_internship.zh.md — removed the public
  hourly-pay infobox row; replaced the internal offer-letter footnote with
  the public Life at TikTok job-posting citation (matches en)
- aligned: wiki/KitchenSurvivor.zh.md, wiki/AgentConfig.zh.md — fixed the
  en/zh model-provider contradiction (dual provider) and restored the
  hallucination-control decision + ByteDance hub-and-spoke back-reference

Not pushed pending author review.

## [2026-07-04] update | ByteDance internship status incoming → in progress

The internship began in May 2026 and is now under way, so the stale
"incoming / scheduled to join / offer accepted" framing was corrected to
"in progress" across all public surfaces. Per author direction the
work description is deliberately held at the public-job-posting level —
no internal metrics, methodology, model names, or policy detail — until
the internship concludes. The "will be updated with first-hand detail
after the internship concludes" note is retained as the confidentiality
hold.

- updated: wiki/ByteDance_TikTok_internship.md, .zh.md — subtitle, description, infobox Dates/Status, lead, Role paragraph
- updated: wiki/Colar_Wang.md, .zh.md — meta description, infobox row label (Upcoming role → Current role / 即将就任 → 现任), lead sentence, Career section heading + prose
- updated: wiki/index.md — Employment entry (incoming → current)

## [2026-07-03] update | Galaxy source-code links removed

The GitHub archive formerly linked from the Galaxy entity page has been
taken private; the Source code infobox row, the open-archive paragraph,
and footnote [^2] are removed from the en and zh mirrors accordingly.

- updated: wiki/China_Galaxy_Securities.md, wiki/China_Galaxy_Securities.zh.md

## [2026-07-03] update | Galaxy backtest figure standardized to 33% simulated (Q3 2024)

Author direction: the Galaxy backtest figure is standardized to **33%
simulated return over the Q3 2024 window** across all public surfaces
(this wiki and the GitHub source-code archive README), replacing the
earlier "approximately 50 percent annualized return under a
high-frequency signal-generation regime" phrasing. The high-frequency
framing is dropped at the same time — the published notebook operates
on rolling-window bar data, not tick data — and the `Colar_Wang`
descriptor "high-frequency trading system" reverts to "automated
trading system", matching the entity page.

- updated: wiki/China_Galaxy_Securities.md, wiki/China_Galaxy_Securities.zh.md — backtest sentence
- updated: wiki/Colar_Wang.md, wiki/Colar_Wang.zh.md — Galaxy section figure + system descriptor

## [2026-04-29] update | drop hatnotes + bump Galaxy figure DPI

Two small polish passes:
1. **Hatnotes removed** — both the KitchenSurvivor "This article is about the 2025 multimodal-AI consumer product. For the general phenomenon of overseas student cooking, see cooking abroad (page does not exist)" disambiguation and the AgentConfig "Not to be confused with Anthropic's Claude Agent SDK" disambiguation were italic blockquote hatnotes that consumed visual space at the top of each product page without serving real disambiguation needs (KS does not collide with another article in this wiki; the AgentConfig vs Claude Agent SDK confusion is a non-issue for the realistic readership). Removed from both en and zh mirrors.
2. **Galaxy figures re-rendered at 300 dpi** — the three quant-project figures (`eda-returns.png`, `feature-importance.png`, `final-prediction.png`) were originally rendered at 200 dpi (2339×1653). Bumped to 300 dpi (3509×2480) so the small axis tick labels on the prediction-vs-validation chart and the F-score numbers on the feature-importance chart stay legible when zoomed. File sizes 126 KB / 233 KB / 202 KB respectively.

- updated: wiki/KitchenSurvivor.md, wiki/KitchenSurvivor.zh.md — removed hatnote blockquote
- updated: wiki/AgentConfig.md, wiki/AgentConfig.zh.md — removed hatnote blockquote
- regenerated: public/galaxy/eda-returns.png, public/galaxy/feature-importance.png, public/galaxy/final-prediction.png — 200 dpi → 300 dpi

## [2026-04-29] update | restore Earlier financial roles in Career section + KS figure relocation

Two follow-ups after the entity-page restore:

1. **Career section restoration** — author requested the CICC and CITIC Futures finance internships be re-narrated in the main bio's Career section (not just the sidebar). Restored: lead paragraph wording back to "three consecutive research roles in the Chinese financial sector" with all three wikilinks; Career section gains the `### Earlier financial roles (2023–2024)` subsection between Galaxy and ByteDance, describing the IB Intern role at CICC (summer 2023, semiconductor-market / IPO prospectus work) and the Futures Department Intern at CITIC (winter 2023–2024, Python strategy prototyping and compliance); See also re-adds both wikilinks; References re-adds footnotes `[^9]` (CITIC) and `[^10]` (CICC).
2. **KS figure 1 (app-home-feed) relocation** — the figure was previously embedded immediately after the lead, which collided with the floating infobox and produced a large left-column whitespace block (the figure-portrait class capped width at 360 px and centered, but the parent column was constrained by the infobox float). Per author's hint, figure 1 was moved to the end of the Features section, right before `## Architecture`, where the left column has accumulated past the infobox height. CSS gained `clear: both` on `.figure-portrait` as a belt-and-braces fallback if a future short-section configuration ever re-introduces the same overlap.

- updated: wiki/Colar_Wang.md — lead paragraph restored to three-internship phrasing; Career section regains `### Earlier financial roles (2023–2024)` subsection; See also re-adds `[[CITIC_Futures]]` and `[[China_International_Capital_Corporation]]`; References re-adds footnotes `[^9]` and `[^10]`
- updated: wiki/Colar_Wang.zh.md — mirrored
- updated: wiki/KitchenSurvivor.md — figure 1 (`app-home-feed`) moved from immediately after the lead to the tail of the Features section, between `### Location and privacy controls` and `## Architecture`
- updated: wiki/KitchenSurvivor.zh.md — both figures (`app-home-feed` and `share-card-lobster`) moved from immediately after the lead to between `## 架构` and `## 信任与安全` (the zh version has no Features subsections, so the shorter article body forces both figures to share the same later location)
- updated: app/globals.css — `.wiki-main figure.figure-portrait` block gains `clear: both`

## [2026-04-29] update | partial Round 2 reversal + figure layout polish

Three follow-ups after the Round 3 KS embed pass:

1. **Restore CITIC + CICC entity pages** — author requested the sidebar Experience list to show all four roles, not the post-R2 two (ByteDance + Galaxy). The two entity pages were `git restore`-d from HEAD (which was the last commit before R2's deletes), and the sidebar `<li>` entries for `CITIC_Futures` and `China_International_Capital_Corporation` were re-added to `WikiChrome.jsx`. The `Colar_Wang.md` lead paragraph and Career section were left in their R2-condensed state (single Galaxy mention only); restoring the entity pages alone gives the sidebar what the author asked for without re-introducing the "three consecutive Chinese-finance internships" prose into the main bio.
2. **Drop sidebar `Contents` link** — the second `<li>` under nav, which pointed to `Colar_Wang#see-also`, was removed. Wikipedia's "Contents" convention refers to in-article TOC, not a cross-page jump to See also; the link had no real navigation function and was misleading.
3. **Swap mis-named KitchenSurvivor screenshot files** — initial copy from source paths placed each jpg under the wrong target name: `app-home-feed.jpg` actually held the lobster share-card image and vice-versa, causing every figure-caption pairing to render mismatched on the page. Source-to-target mapping was corrected (`微信图片_20260317083313.jpg` → `app-home-feed.jpg`; `微信图片_20260210223111.jpg` → `share-card-lobster.jpg`), so caption text and image content now agree.
4. **Figure CSS — portrait class** — vertical phone screenshots were rendering at 760 px wide (full content column), which forced ~1300 px tall figures and wasted layout space alongside the floating infobox. Added `.figure-portrait` to `globals.css` (max-width 360 px, centered) and applied it to the two KS figures (en + zh). Galaxy's three landscape figures were left without the class so they keep the default full-width treatment.

- updated: components/WikiChrome.jsx — removed `Contents` `<li>` from nav block; re-added `CITIC_Futures` and `China_International_Capital_Corporation` `<li>` entries to Experience block
- restored: wiki/CITIC_Futures.md, wiki/CITIC_Futures.zh.md, wiki/China_International_Capital_Corporation.md, wiki/China_International_Capital_Corporation.zh.md (via `git restore`, content unchanged from pre-R2 HEAD)
- updated: app/globals.css — added `.wiki-main figure.figure-portrait { max-width: 360px; margin-left: auto; margin-right: auto; }` block
- updated: wiki/KitchenSurvivor.md, wiki/KitchenSurvivor.zh.md — both `<figure>` tags upgraded to `<figure class="figure-portrait">`
- updated: public/kitchensurvivor/app-home-feed.jpg, public/kitchensurvivor/share-card-lobster.jpg — swapped to match filename semantics

## [2026-04-29] update | Round 3 brutal audit — KitchenSurvivor self-canonization layer, screenshots embedded

Multi-agent audit (Brand / UX / Reality / Editorial) on the KS entity page returned converging verdicts: the page was a product spec disguised as a Wikipedia article, with self-canonized terminology (`"dual-layer verification"` capitalized, `"north-star quality metric"`, `"input-to-content automation loop"`, `"high-availability lifecycle manager"`), self-quotes (`"meeting the user wherever their hands are"`, `"labels are not stylistic choices but product claims"`), and unsourced quantitative claims (`40% memory reduction`, `time-to-first-useful-content < 1s`) that would not survive a 30-second interview probe. Reality Checker flagged the ByteDance-prototype bridge as the highest-LARP-density passage (a side project framing itself as an internship preview).

R3 took the compromise path that Brand wanted (retain `recipe executability ~95%` as the brand anchor) plus what Reality wanted (drop term capitalization, drop `north-star`, drop ByteDance bridge, qualify the 95% with `based on internal review`). Cultural positioning section is collapsed: `Kitchen Mood` table inlined into AI recipe generation; `Difficulty tiers` section deleted (redundant with Mood on the same point). Reception section deleted entirely with `100+ ratings` moved into the lead. Two app screenshots are embedded for the first time on a product page: home feed under the lead, share-card under the social-feed subsection.

- updated: wiki/KitchenSurvivor.md — lead rewritten to two sentences with `100+ ratings by April 2026` inline; Background condensed from two paragraphs to one (dropped the abstract `cognitive tax that falls on someone…` framing); Multimodal capture: dropped `meeting the user wherever their hands are` self-quote; AI recipe generation: dropped `core generative surface` filler opener, dropped `(see below)` cross-reference, inlined `Kitchen Mood` table directly into the section; deleted entire `## Product language and cultural positioning` section including `### Difficulty tiers` table and the `labels are product claims` paragraph; Architecture cut ~50% (dropped `hybrid client–cloud architecture` opener, `high-availability lifecycle manager` self-quote, `40% memory reduction` claim, `input-to-content automation loop` self-quote, `time-to-first-useful-content below one second` double-metric framing); Trust and safety: removed `what Wang has termed "dual-layer verification"` term-coining language → `The system combines…`, removed `north-star quality metric and which`, qualified `~95%` with `based on internal review`, deleted ByteDance bridge sentence; Reception section deleted entirely
- updated: wiki/KitchenSurvivor.md — embedded `<figure>` block for `/kitchensurvivor/app-home-feed.jpg` (云灶台 home feed UI screenshot) immediately after the lead, and `<figure>` block for `/kitchensurvivor/share-card-lobster.jpg` (柠檬黄油芝士焗龙虾 share card with QR-code) at the end of the Social feed and community subsection
- updated: wiki/KitchenSurvivor.zh.md — mirrored: lead rewritten with 100+ ratings inline; Background condensed; Architecture compressed (dropped 输入到内容 automation loop / 40% / sub-second / 高可用生命周期管理器 self-quote); Trust section rewritten without 双层验证 capitalization, with 95% executability inline; Reception section deleted; both figures embedded in the lead block (zh page does not have a Social feed subsection in the current version)
- created: public/kitchensurvivor/app-home-feed.jpg (154 KB)
- created: public/kitchensurvivor/share-card-lobster.jpg (355 KB)
- carried forward (no change): infobox; technical-stack listing in infobox (Swift / SwiftUI / FastAPI / Firebase / SSE / WebSocket / DeepSeek / OpenAI); Smart Fridge / Multimodal capture / Personalization / Location and privacy controls feature subsections; Trust and safety still retains the 95% number per author direction (Round 2 numbers-retention rule extends here)

## [2026-04-29] update | Galaxy entity page — embed three visual figures from quant project archive

After Round 2 left the Galaxy entity page narratively complete but visually thin (only the corporate logo in the infobox, body text uninterrupted), three representative figures from the published `china-galaxy-securities-quant` GitHub archive are embedded inline. Selection is restrained per Wikipedia thumbnail convention: one figure per body subsection, captioned bilingually, with global figure styling added to the design system rather than hard-coded inline.

Figure selection covers the project narrative arc:
1. **EDA returns distribution** — exploratory log-return analysis across AAPL and four peer equities, anchoring the data-source assumption that motivated heavy-tailed regime modeling.
2. **Final hybrid prediction** — held-out AAPL test prediction with MAE 4.51 over 28 trading days, the highest-information-density figure in the archive.
3. **XGBoost feature importance** — F-score ranking validating the candlestick feature engineering decision.

A fourth candidate figure (`7.xgboost 模型对比linear regression和true return.pdf`) was deliberately excluded: the rendered chart legend reads `Linear Regression` / `Random Forest` / `True Returns`, which contradicts the PDF filename's "XGBoost vs Linear Regression" framing — including it would risk an interview-defensibility hit.

- created: public/galaxy/eda-returns.png (231 KB, 2339×1653 @ 200 dpi)
- created: public/galaxy/feature-importance.png (126 KB, same size)
- created: public/galaxy/final-prediction.png (135 KB, same size)
- updated: app/globals.css — added `.wiki-main figure` / `figcaption` block (Wikipedia thumbborder convention: 1px light-grey border, alt-bg fill, sans-serif 12 px caption)
- updated: wiki/China_Galaxy_Securities.md — three `<figure>` blocks inserted: EDA after Hybrid LSTM-XGBoost lead paragraph, final-prediction after the GitHub archive callout, feature-importance after the Real-time feature engineering paragraph
- updated: wiki/China_Galaxy_Securities.zh.md — mirrored, with translated `figcaption` text
- carried forward (no change): all numeric claims; raw `7.xgb.png` standalone figure not used because of redundant axis vs final-prediction.png; Img2GPS and Crypto Optimizer figures deferred (already linked as PDFs)

## [2026-04-28] update | Round 2 brutal audit — drop CICC + CITIC entity pages, consolidate Career

Multi-agent audit Round 2: CICC and CITIC Futures internships were each given their own entity page in earlier ingests, mirroring Wang's three-internship Chinese-finance background. Brand / Recruiter / Trend Researcher converged on this being structural over-reach for an AI-product-leaning bio (per Trend benchmark: Karpathy doesn't give Stanford its own wiki page; Alexandr Wang Wikipedia entry mentions internships inline). The two pages are removed; their inline mention in `Colar_Wang` lead is collapsed to "a quantitative research internship at Galaxy in 2024", and the "Earlier financial roles" subsection is deleted. Galaxy entity page is kept (it has a published GitHub source-code archive that anchors a substantive narrative). All quantitative claims (50% backtest return at Galaxy, 30% stability improvement, 29.7% / 96% / 2.5× academic-project metrics, 90% forecasting-error reduction, Sharpe 1.3) are explicitly retained per author direction — Round 2 is structural pruning only, not data downgrade.

- deleted: wiki/CITIC_Futures.md and wiki/CITIC_Futures.zh.md
- deleted: wiki/China_International_Capital_Corporation.md and wiki/China_International_Capital_Corporation.zh.md
- updated: wiki/Colar_Wang.md — lead paragraph: removed `[[CICC]]` and `[[CITIC_Futures]]` wikilinks (which would now be redlinks), collapsed "three consecutive research roles in the Chinese financial sector" → "a quantitative research internship at China Galaxy Securities in 2024"; Career section: removed `### Earlier financial roles (2023–2024)` subsection wholesale; See also: removed `[[CITIC_Futures]]` and `[[China_International_Capital_Corporation]]`; References: removed footnotes `[^9]` (CITIC) and `[^10]` (CICC) — orphaned after page deletion
- updated: wiki/Colar_Wang.zh.md — mirrored
- updated: wiki/China_Galaxy_Securities.md — lead paragraph: removed sentence chaining Galaxy to CITIC Futures and CICC ("three consecutive Chinese-finance internships"); See also: removed CITIC + CICC entries; numeric claims (50% annualized return, 30% stability improvement) are retained
- updated: wiki/China_Galaxy_Securities.zh.md — mirrored
- updated: wiki/index.md — removed CITIC + CICC entries from Employment list
- updated: components/WikiChrome.jsx — removed CITIC + CICC links from sidebar Experience block
- carried forward (no change, retained per author direction): all quantitative claims across `Colar_Wang.md` Academic projects (Img2GPS 29.7% / 96% / 2.5×; Crypto Optimizer 90% / Sharpe 1.3) and Galaxy entity page (50% / 30%)

## [2026-04-28] update | Round 1 brutal audit — drop self-canonization layer (Approach + First-principles page)

Multi-agent audit (Brand / UX / Reality / Recruiter / Trend / Editorial) converged: largest LARP signal in the wiki was the explicit Approach methodology section paired with a standalone First-principles_thinking concept page — i.e. a 23-year-old with two products self-canonizing a working philosophy via a "tradition page" his bio links to. Karpathy (5,000-word personal page) and Alexandr Wang (Wikipedia, 2,800 words) carry no equivalent. Round 1 removes that layer wholesale; data-defensibility (project metrics, footnote LARP) and bio-density (single-product subtitle, double-language strategy) are deferred to Round 2.

- deleted: wiki/First-principles_thinking.md and wiki/First-principles_thinking.zh.md (entire concept page removed)
- updated: wiki/Colar_Wang.md — removed `## Approach` section (three named principles); removed `## Technical skills` section (résumé-style toolkit list, redundant with product-page infoboxes); removed `## Personal life` section (badminton / hip-hop / languages — zero decision value for any reader segment); removed `[[First-principles_thinking]]` from See also; cut footnote `[^6]` (ByteDance "Internal correspondence" — try-hard, role is publicly verifiable via LinkedIn) at both inline marks and definition; cut footnote `[^11]` (self-citation to own agency-agents GitHub — orphan after Approach removal)
- updated: wiki/Colar_Wang.zh.md — mirrored all of the above (工作方法 / 技术能力 / 个人生活 sections; 参见 link; 脚注 [^6] [^11])
- updated: wiki/KitchenSurvivor.md — Trust-and-safety section: removed sentence linking the dual-layer protocol to the (now-deleted) first-principles methodology; kept ByteDance prototype framing; removed `[[First-principles_thinking]]` from See also
- updated: wiki/KitchenSurvivor.zh.md — mirrored
- updated: wiki/AgentConfig.md — removed paragraph framing AgentConfig as "an application of first-principles thinking" in the Concept section; removed `[[First-principles_thinking]]` from See also
- updated: wiki/AgentConfig.zh.md — mirrored
- updated: wiki/index.md — removed `## Concepts` section (now empty after First-principles deletion)
- updated: components/WikiChrome.jsx — removed sidebar `## Concepts` block (the only entry was the deleted First-principles_thinking page)

## [2026-04-28] update | brutal audit pass — strip LARP framing from bio and Views section

- updated: wiki/Colar_Wang.md — subtitle and lead rewritten without "systems engineer / founder / AI product researcher" triple title; infobox: removed "Years active" and "Known for" rows, simplified Occupation to "Graduate student / Independent product builder", relabeled Employer → Upcoming role; "Views and methodology" condensed and renamed to "Approach", removed self-citation footnote [^8] (Personal correspondence) and its inline references, removed "over one hundred specialized" claim; Academic projects: "Project Lead / directed development" → "coursework project / led a small team"
- updated: wiki/Colar_Wang.zh.md — mirrored all English changes
- updated: wiki/index.md — bio one-liner aligned to new voice; AgentConfig description corrected from "no longer in active development" → "live" (site is still serving)

## [2026-04-13] update | content refresh — views, agency-agents, AgentConfig status, first-principles expansion

- updated: wiki/Colar_Wang.md — lead paragraph now references agency-agents open-source collection and harness engineering infrastructure; Views and methodology section restructured into three named subsections (First-principles decomposition, User-auditable guarantees, Agents as end-user–configurable software) with strengthened narrative threading from KitchenSurvivor to ByteDance; Technical skills updated with React Native (Expo) and Supabase; footnotes [^11] added for agency-agents
- updated: wiki/Colar_Wang.zh.md — mirrored all English changes: lead paragraph, Views section with three subsections, technical skills, footnotes
- updated: wiki/AgentConfig.md — infobox status changed to "Public MVP (no longer in active development)"; new "Subsequent development" section documenting transition to agent infrastructure work
- updated: wiki/AgentConfig.zh.md — mirrored: status updated, new "后续发展" section added
- updated: wiki/First-principles_thinking.md — expanded from stub to full article: added methodology context (Aristotle → Musk → Wang's product-design application), three applied contexts (KitchenSurvivor, AgentConfig, agent infrastructure), relationship to user-auditable guarantees, removed stub notice
- updated: wiki/First-principles_thinking.zh.md — mirrored full expansion from English version
- updated: wiki/index.md — AgentConfig status clarified, First-principles description expanded

## [2026-04-08] feature | bilingual English / Chinese with top-left toggle

- lib/wiki.js: getPage / getAllPagesForSearch / preprocessWikiLinks now accept a `lang` parameter. Chinese mode reads <slug>.zh.md and falls back to <slug>.md if missing; wikilink prefixes become /zh/wiki/
- components/WikiPage.jsx: lang-aware [edit] link (points to .zh.md in Chinese mode), tagline translated
- components/WikiChrome.jsx: STRINGS table for en/zh; top-left language toggle button next to the Colarpedia logo; every tab, sidebar heading, footer line, and search placeholder translated
- components/SearchBox.jsx: lang-aware placeholder and result URLs
- app/zh/wiki/[slug]/page.jsx: new Chinese route mirror (generateStaticParams produces identical slug set)
- app/globals.css: .lang-toggle button style
- created 10 Chinese translations: Colar_Wang.zh.md, KitchenSurvivor.zh.md, AgentConfig.zh.md, University_of_Pennsylvania.zh.md, University_of_Nottingham.zh.md, ByteDance_TikTok_internship.zh.md, China_Galaxy_Securities.zh.md, CITIC_Futures.zh.md, China_International_Capital_Corporation.zh.md, First-principles_thinking.zh.md
- build now produces 20 static pages (10 en + 10 zh), all at /wiki/<slug>/ and /zh/wiki/<slug>/

## [2026-04-07] update | publish Galaxy quant project to GitHub, link from wiki

- created GitHub repo: github.com/wangxuzhou666-arch/china-galaxy-securities-quant
  contents: Hybrid_Approach.ipynb (104 cells, EDA → XGBoost windows 2/5/10/20 → feature importance → LSTM → hybrid) + 13 rendered PDF reports + 1 PNG, sourced from C:\Users\Colar\Desktop\简历\材料\quant 文件
- updated: wiki/China_Galaxy_Securities.md infobox now has "Source code" link in Links section, body paragraph references the published archive, footnote [^2] added

## [2026-04-07] update | logos for schools and companies, removed Kyraton

Removed:
- deleted: wiki/Amazon_retailer_venture.md (Kyraton Home page) — per user request, the venture is no longer represented in the wiki
- deleted: components/TOC.jsx (orphaned from old hardcoded version)
- updated: wiki/Colar_Wang.md — removed Kyraton from lead, Career section, See also, Technical skills (Amazon Ads API)
- updated: wiki/University_of_Nottingham.md, wiki/CITIC_Futures.md, wiki/China_International_Capital_Corporation.md, wiki/First-principles_thinking.md, wiki/index.md — all backlinks to Kyraton removed
- updated: components/WikiChrome.jsx sidebar — Kyraton link removed

Added (school crests and company logos):
- public/upenn-shield.png — University of Pennsylvania coat of arms (Wikimedia Commons)
- public/nottingham-shield.png — University of Nottingham coat of arms (Wikimedia Commons)
- public/galaxy-logo.png — China Galaxy Securities corporate logo
- public/citic-logo.png — CITIC Group logo (parent of CITIC Futures)
- public/cicc-logo.png — China International Capital Corporation logo
- public/bytedance-logo.png — ByteDance logo
- updated: all six experience and education pages — infobox now displays the corresponding logo at the top, in the LinkedIn / Wikipedia infobox style

## [2026-04-07] update | KitchenSurvivor icon, AgentConfig link-only infobox, sidebar nav, raw archive

- added: public/kitchensurvivor-icon.jpg (1024x1024 app icon)
- updated: wiki/KitchenSurvivor.md infobox now displays the app icon
- updated: wiki/AgentConfig.md infobox no longer displays an image placeholder; added "Live site" row at top with prominent link to the Vercel deployment
- updated: components/WikiChrome.jsx sidebar Experience list now includes Kyraton Home, CITIC Futures, and CICC alongside Galaxy Securities and ByteDance
- archived: raw/Colar Wang Resume (1).pdf, Colar Wang 2.pdf, Colar Wang 3.pdf, Colar Wang Rseume 4.pdf, Colar Wang Rseume5.pdf, Colar Wang Rseume 6.pdf — six original CV versions, source for the wiki narrative
- created: raw/README.md — explains the immutability and contents of raw/

## [2026-04-07] ingest | resume consolidation (v2–v6)

Sources: raw/Colar Wang 2.pdf, Colar Wang 3.pdf, Colar Wang Rseume 4.pdf, Colar Wang Rseume5.pdf, Colar Wang Rseume 6.pdf (5 additional resume versions beyond the initial Resume (1).pdf)

New pages:
- created: wiki/CITIC_Futures.md — winter 2023–2024 internship, Shanghai
- created: wiki/China_International_Capital_Corporation.md — summer 2023 investment banking internship, Shanghai

Updates:
- updated: wiki/Colar_Wang.md — birth month corrected to October 2002; lead paragraph now lists all four finance roles; Career section adds CITIC Futures and CICC entries; Academic projects section added covering Campus-Scale Img2GPS Localization and AI-Driven Crypto Portfolio Optimizer; Technical skills expanded with SQL window functions / PyTorch / AWS / Firebase / Wind Terminal; Personal life section added (badminton, hip-hop dance, languages); references [^9] CITIC, [^10] CICC; See also extended
- updated: wiki/Amazon_retailer_venture.md — formal legal entity name Kyraton Home (UK) Ltd. added throughout; role title corrected to Head of Analytics; kitchenware / home-goods sector specified
- updated: wiki/University_of_Nottingham.md — Project leadership section added with Crypto Optimizer; parallel-activities updated to reference all three finance internships
- updated: wiki/University_of_Pennsylvania.md — Project leadership section added with Campus-Scale Img2GPS Localization
- updated: wiki/China_Galaxy_Securities.md — role title Data Product Intern → Quantitative Research Intern; return figure 33% → 50% (matches 5/6 resume versions); cross-references added for prior internships
- updated: wiki/KitchenSurvivor.md — 100+ App Store ratings recorded; DeepSeek LLM backend and NDJSON streaming specified; Swift structured concurrency / SwiftUI stack noted; Reception section expanded
- updated: wiki/index.md — Employment section now lists all five roles

## [2026-04-07] update | record canonical site URL

- updated: wiki/Colar_Wang.md — infobox Contact: added Website row pointing to https://colar-wiki.vercel.app/wiki/Colar_Wang/
- updated: wiki/Colar_Wang.md — External links: promoted Colarpedia site to top of list, added colar-wiki GitHub source repository
- updated: README.md — replaced "coming soon" placeholder with live URL

## [2026-04-07] update | portrait + product URLs

- added: public/portrait.jpg (Wang in the Swiss Alps, 2025)
- updated: wiki/Colar_Wang.md — infobox now shows portrait; GitHub added to Contact section; External links section added; inline product URLs added to Notable works
- updated: wiki/Colar_Wang.md — image_caption corrected from "Philadelphia" to "Swiss Alps" to match photo

## [2026-04-07] init | wiki created

- created: CLAUDE.md (schema)
- created: wiki/index.md
- created: wiki/Colar_Wang.md (main biography, 8 infobox sections, 8 references)
- created: wiki/KitchenSurvivor.md (product page, infobox, architecture, trust &amp; safety)
- created: wiki/AgentConfig.md (product page, infobox, design philosophy, tech)
- created: wiki/University_of_Pennsylvania.md (experience page)
- created: wiki/University_of_Nottingham.md (experience page)
- created: wiki/ByteDance_TikTok_internship.md (incoming experience)
- created: wiki/China_Galaxy_Securities.md (experience page)
- created: wiki/Amazon_retailer_venture.md (experience page)
- created: wiki/First-principles_thinking.md (concept stub)
- source: raw/Colar Wang Resume (1).pdf — principal source for career section
