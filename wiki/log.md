# Colarpedia — change log

Append-only record of ingests, updates, and lint passes.
Format: `## [YYYY-MM-DD] <type> | <short description>`

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
- archived: raw/Xuzhou Wang Resume (1).pdf, Xuzhou Wang 2.pdf, Xuzhou Wang 3.pdf, Xuzhou Wang Rseume 4.pdf, Xuzhou Wang Rseume5.pdf, Xuzhou Wang Rseume 6.pdf — six original CV versions, source for the wiki narrative
- created: raw/README.md — explains the immutability and contents of raw/

## [2026-04-07] ingest | resume consolidation (v2–v6)

Sources: raw/Xuzhou Wang 2.pdf, Xuzhou Wang 3.pdf, Xuzhou Wang Rseume 4.pdf, Xuzhou Wang Rseume5.pdf, Xuzhou Wang Rseume 6.pdf (5 additional resume versions beyond the initial Resume (1).pdf)

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
- source: raw/Xuzhou Wang Resume (1).pdf — principal source for career section
