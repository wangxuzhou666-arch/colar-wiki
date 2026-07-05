---
title: AgentConfig
subtitle: Web-based AI agent configuration advisor (2026)
description: AgentConfig is a web-based advisory tool for configuring AI agents for Chinese-speaking knowledge workers, built by Colar Wang.
infobox:
  title: AgentConfig
  rows:
    - label: Live site
      html: '<a href="https://agentconfig-theta.vercel.app/">Open application →</a>'
    - label: Developer
      html: '<a href="/wiki/Colar_Wang/">Colar Wang</a>'
    - label: Type
      value: Web application, AI advisory tool
    - label: Target audience
      value: Chinese-speaking knowledge workers (non-technical)
    - label: First released
      value: Early 2026
    - label: Stack
      value: Next.js, Supabase, Vercel
    - label: Models
      value: Anthropic Claude (primary), DeepSeek (fallback)
    - label: Status
      value: Public MVP (no longer in active development)
    - section: Links
    - label: Live site
      html: '<a href="https://agentconfig-theta.vercel.app/">agentconfig-theta.vercel.app</a>'
---

**AgentConfig** is a web-based advisory tool for configuring AI agents,
aimed at Chinese-speaking knowledge workers who do not write code.[^1]
[[Colar Wang]] built it in early 2026 as an independent project
alongside his graduate studies at the [[University of Pennsylvania]],
and deployed it as a serverless application on Vercel.[^1]

Its positioning — *"不卖课、不推广告,就是给个老实建议"* ("no
courses, no ads — just honest advice") — deliberately distances it
from the crowded market of Chinese AI-course and AI-tooling vendors,
framing AgentConfig as an independent advisor rather than a
marketplace or a lead-generation funnel.

## Concept

Wang's premise is that most non-technical users do not need to write
agent code; they need help *articulating what they want an agent to
do*, which he has called the real bottleneck in agent adoption. The
product runs as a structured interview — conducted entirely in
non-technical language, covering the user's profession, daily tools,
operating system, pain points, and self-assessed technical level —
and turns those answers into a concrete, buildable agent stack with
starter code and install steps. When the initial answers are
ambiguous, a short chat clarifier ("配置顾问") asks a few targeted
follow-up questions rather than guessing.

## Recommendation and hallucination control

Each run returns three ranked agent stacks, each annotated with a
match score, a setup-time estimate, and an estimated weekly time
saved under the user's declared workflow. The defining design
decision sits underneath that output: the recommender does **not**
let the language model invent repository names, packages, or install
commands. It may only select from a hand-curated catalog of vetted
open-source projects spanning the five layers of an agent stack —
context, memory, tools, routing, and model — with each entry tagged
by the professions it best suits.

Wang has described this catalog constraint as the product's primary
hallucination-control mechanism, and as a deliberate trade-off: the
product accepts that some niche use cases go unserved in exchange for
a hard guarantee that every recommendation is buildable and its
install steps are literally runnable.

## Design philosophy

Wang frames AgentConfig's minimalism as a positioning bet rather than
an aesthetic one. He has argued that **"simplicity is the feature"**
for Chinese knowledge workers unfamiliar with the prompt-engineering
vocabulary of English-language AI communities, and that presenting
the tool as one more developer IDE would defeat its purpose. The
technical complexity is concentrated server-side and hidden from the
user, and the default path is short and opinionated — one good
recommendation quickly, rather than an exhaustive catalogue of
possibilities. This stance is the project's principal bet, and is
deliberately opposed to the developer-first orientation of most
English-language agent frameworks.

## Technology

The application runs on Next.js and React with a Supabase backend,
deployed on Vercel. Two choices are notable at the product level.
Authentication uses a custom email one-time-password flow rather than
third-party OAuth, on the reasoning that Chinese users frequently lack
the Google, GitHub, or Microsoft accounts that most Western OAuth
flows assume. Reasoning is routed primarily through Anthropic's Claude
models, with DeepSeek as a cost-and-latency fallback for the
Chinese-speaking user base. A built-in A/B testing harness lets Wang
run structured experiments on onboarding copy, recommendation
ranking, and clarifier behavior against live traffic — an unusually
analytics-forward choice for a solo product.

## Subsequent development

Wang has framed AgentConfig as an early experiment in the thesis that
agent configuration should be legible to non-technical users, and has
since pursued that thesis at the infrastructure level through an
open-source collection of over one hundred specialized agent
definitions. AgentConfig itself is no longer in active development,
but its public instance remains available, and Wang cites it as a
conceptual predecessor to that later work.

## See also

- [[Colar Wang]]
- [[KitchenSurvivor]]

## References

[^1]: "AgentConfig". [agentconfig-theta.vercel.app](https://agentconfig-theta.vercel.app/). Retrieved 7 April 2026.
