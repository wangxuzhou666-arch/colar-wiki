---
title: ByteDance / TikTok internship
subtitle: AI Product Operations role of Colar Wang (Summer 2026)
description: Colar Wang's internship with ByteDance / TikTok on the TikTok Platform Responsibility — Teen Experience team, Summer 2026.
infobox:
  title: ByteDance / TikTok
  image: /bytedance-logo.png
  image_caption: ByteDance Ltd., parent company of TikTok
  rows:
    - label: Employer
      value: ByteDance Ltd. (TikTok)
    - label: Role
      value: AI Product Operations Project Intern (BS / MS, 2026 Start)
    - label: Focus area
      value: TikTok Minor Safety (model strategy &amp; evaluation)
    - label: Location
      value: San Jose, California, U.S.
    - label: Dates
      value: Summer 2026 (in progress, 12-week commitment)
---

This article documents [[Colar Wang]]'s internship at
**ByteDance**, the parent company of **TikTok**, which began in the
summer of 2026. Wang has indicated that the article will be
updated with first-hand detail after the internship concludes; the
present version is based on the publicly listed role and on Wang's
own stated motivations for the role.

## Role

Wang joined TikTok as an **AI Product Operations
Project Intern** on the **Platform Responsibility — Teen Experience**
team, within the company's **Global Operations** function, based in
San Jose, California, for a twelve-week placement in the summer of
2026. The position is the internship track of TikTok's internal
**Minor Safety** program, which the company has publicly described
as "building the next generation of content safety and governance
systems at TikTok, with a strong focus on protecting minors and
teens at global scale."

### Responsibilities

As publicly listed, the role spans the end-to-end model process for
TikTok Minor Safety: working with cross-functional teams on model
design, optimization, training, and evaluation, identifying
performance gaps and vulnerabilities, and proposing actions to improve
model quality. It also covers the full data-production lifecycle —
from defining dataset standards through running model evaluations to
ensuring high-quality data delivery — and the adoption of current
large-language-model tooling to make those data workflows more
efficient and scalable. A research thread runs alongside the
operational work: surveying emerging training methodologies from
academia and industry, identifying weaknesses in existing training
data, and proposing ways to improve its generalization, efficiency,
and coverage.

### Qualifications cited

The publicly listed minimum qualifications include a twelve-week
availability in 2026, active enrollment in an undergraduate or
master's program in computer science, data science, product
management, or a related field, and a working or strongly
self-motivated understanding of large language models and basic
API usage. The listing names **Trust & Safety, content
moderation, or content safety compliance** experience as a strong
preferred qualification, alongside hands-on experience in data
analysis or model optimization.

## Context

The **Teen Experience** team is part of TikTok's **Platform
Responsibility** organization and is responsible for the policy,
detection, and intervention systems that apply specifically to
users under the age of 18. The **AI Product Operations** function
within this team connects product requirements, model evaluation
workflows, and operational review pipelines — translating safety
policy into production machine-learning behavior, rather than
authoring the models themselves.

Within the broader Trust & Safety field, the role sits at a
characteristic seam: it is the function that owns *whether* a
safety model is performing adequately against the product's stated
commitments, independent of whether the model has been formally
released, and it is typically the first function to detect a
real-world vulnerability that the offline evaluation pipeline has
missed.

## Background and relevance

Wang has publicly cited two prior bodies of work as the
preparation most directly relevant to this role.

The first is his founder-level work on the
[[KitchenSurvivor|dual-layer verification protocol in
KitchenSurvivor]], a product he has framed as a small-scale rehearsal
of the same central problem — the translation of probabilistic
large-language-model behavior into user-auditable guarantees. In
KitchenSurvivor, that translation takes the form of a deterministic
on-device verification layer around a generative recipe engine, and
a product-level quality KPI ("recipe executability") that the team
reports in the region of 95 percent.

The second is his summer-2024 work as a
[[China_Galaxy_Securities|Quantitative Research Intern at China
Galaxy Securities]], where he designed walk-forward validation and
regime-aware stress-testing protocols around a hybrid LSTM–XGBoost
trading model. Wang has argued that the evaluation discipline
required for safety-critical AI systems — where the cost of a
missed failure mode is borne entirely by the user rather than the
operator — is structurally closer to quantitative model risk
management than it is to standard product QA.

## See also

- [[Colar Wang]]
- [[KitchenSurvivor]] — Wang's prior work on AI trust and safety
- [[China Galaxy Securities]] — prior quantitative validation work
