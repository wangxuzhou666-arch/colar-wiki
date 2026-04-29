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
    - label: Client
      value: Next.js 16 App Router, React 19, TypeScript, Tailwind CSS
    - label: Backend
      value: Next.js API routes (edge), Supabase
    - label: Authentication
      value: Email one-time password (OTP)
    - label: Models
      value: Anthropic Claude (primary), DeepSeek (fallback)
    - label: Languages
      value: Chinese (primary), English
    - label: Experimentation
      value: Built-in A/B testing infrastructure
    - label: Status
      value: Public MVP (no longer in active development)
    - label: License
      value: Proprietary
    - section: Links
    - label: Live site
      html: '<a href="https://agentconfig-theta.vercel.app/">agentconfig-theta.vercel.app</a>'
---

**AgentConfig** is a web-based advisory tool for configuring AI agents,
targeted primarily at Chinese-speaking knowledge workers who do not
write code.[^1] It was conceived and built by [[Colar Wang]] in early
2026 as an independent project parallel to his graduate studies at
the [[University of Pennsylvania]], and is deployed as a serverless
Next.js application on Vercel with a Supabase backend.[^1]

The product positions itself with the tagline *"不卖课、不推广告,就是
给个老实建议"* ("no courses, no ads — just honest advice"), distancing
itself from the large market of Chinese AI-education and
AI-coursework vendors, and framing AgentConfig as an independent
advisor rather than a marketplace or lead-generation product.

## Concept

The premise of AgentConfig is that most non-technical users do not
need to write or read agent code, but do need help *articulating what
they actually want an agent to do* — what Wang has called **"the real
bottleneck in agent adoption."** The product therefore functions as a
structured interview that translates a user's informal description of
their daily work into a concrete, buildable agent stack, together
with the starter code and install steps needed to run it.

## User flow

AgentConfig presents to the user as a linear, five-step interview
followed by a results page and optional drill-down, organized
around the principle that every answer must be expressible in
non-technical language.

1. **Profession and role.** The user selects or types their job
   title, drawing on a default list oriented around Chinese office
   work (marketing and operations, sales, product management,
   finance, HR, content creation, data analysis).
2. **Tools and platforms.** The user declares the software stack
   they use daily — typically a combination of spreadsheets,
   Chinese collaboration suites (Feishu, DingTalk, WeChat for
   Work), and cloud drives.
3. **Operating system.** The user picks Windows, Mac, or both,
   which constrains downstream install instructions.
4. **Pain points.** The user describes, in their own words, the
   repetitive tasks they would most like an agent to take off
   their plate. A brief free-text field is offered rather than a
   pick-list, on the basis that the user's phrasing is itself a
   useful signal for the recommender.
5. **Technical level.** The user self-identifies on a three-tier
   scale — `beginner` ("I don't really code, I want to assemble
   existing tools"), `intermediate` ("I can read a Python tutorial
   and run scripts"), or `advanced` ("I have deployed applications
   and used APIs before") — which gates the complexity of the
   recommended stacks.

Optionally, the user can upload a representative Excel or CSV
template from their actual workflow, or engage a **chat clarifier**
("配置顾问") that asks a small number of targeted follow-up
questions when the initial interview is ambiguous.

## Recommendation output

The result screen returns a ranked set of **three** candidate agent
stacks, each annotated with a match score (typically in the 65–95
range), a setup-time estimate, an estimated weekly time saved under
the user's declared workflow, and a five-component architecture
drawn from AgentConfig's curated repository catalog (see below).
Each recommendation can be expanded into a dedicated **workflow
page** (`/workflow/[id]`) that contains starter code, install
instructions, and the stepwise setup walkthrough needed to run the
stack locally.

## Curated repository catalog

A defining architectural decision in AgentConfig is that its
recommender does **not** generate repository names, package names,
or install commands from the language model directly. Instead, an
internal constant — `APPROVED_REPOS` — enumerates a hand-curated
list of vetted open-source projects from which the model is
permitted to select, organized into five architectural layers:

| Layer | Example projects |
|---|---|
| **Context** | LangChain, LlamaIndex |
| **Memory** | Mem0, Letta, LangChain Memory |
| **Tools** | LangChain Tools, PydanticAI, OpenAI Function Calling |
| **Routing** | LangGraph, CrewAI, AutoGen |
| **LLM** | Ollama, LiteLLM, Anthropic Claude API, DeepSeek API |

Each catalog entry additionally carries a `best_for` field listing
the specific professions it is most suitable for (for example,
LlamaIndex is tagged for researchers, legal and finance analysts,
and consultants; Mem0 is tagged for customer-success, sales, and
operations roles requiring cross-session memory). The model is
instructed to prefer catalog entries whose `best_for` tags match
the user's stated profession, and is prohibited from returning any
repository, package, or install command outside the catalog.

Wang has described this mechanism as AgentConfig's primary
hallucination-control strategy, and as a deliberate trade-off
against comprehensiveness: the product accepts that some niche
use cases will be un-served in exchange for a hard guarantee that
every recommendation is buildable and its install instructions are
literally runnable.

## Design philosophy

Wang has stated that AgentConfig's interface is deliberately
minimal, with the product's technical complexity concentrated on
the server side and hidden from the user. He has argued that
**"simplicity is the feature"** for Chinese knowledge workers who
are unfamiliar with the prompt-engineering vocabulary common in
English-language AI communities, and that presenting an agent
configuration tool as yet another developer IDE would defeat its
purpose.

This design stance is deliberately opposed to the developer-first
orientation of most English-language agent frameworks, and is the
feature Wang has identified as the project's principal bet. A
corollary of the same stance is a short, opinionated default path
through the product: the user is assumed to want one good
recommendation quickly, rather than a comprehensive catalogue of
possibilities.

## Technology

The application is implemented in **Next.js 16** (App Router) with
**React 19**, **TypeScript**, and **Tailwind CSS**, and is deployed
on **Vercel** with the API routes running on the edge runtime.
Persistent state — user accounts, saved workflows, and
recommendation history — is stored in **Supabase**, with
authentication handled through a custom **email one-time-password
(OTP)** flow rather than a third-party OAuth provider, on the
reasoning that Chinese users frequently lack the
Google/GitHub/Microsoft accounts that most Western OAuth flows
assume.

Reasoning is routed through a combination of **Anthropic's Claude**
models and **DeepSeek**, with the primary path preferring Claude
for reasoning quality and the fallback path preferring DeepSeek on
cost and latency grounds for the Chinese-speaking user base. A
public instance is continuously available.[^1]

An **A/B testing infrastructure** is built into the product itself
(exposed through `/app/abtest` and a corresponding API route),
allowing Wang to run structured experiments on onboarding copy,
recommendation ranking, and default chat-clarifier behavior against
live traffic. The product is available in Chinese (primary) and
English through a lightweight in-app language switcher backed by a
translations module.

## Subsequent development

Wang has described AgentConfig as an early experiment in the thesis
that agent configuration should be legible to non-technical users. He
has since pursued this direction at the infrastructure level through
an open-source collection of over one hundred specialized agent
definitions, designed to make agent capabilities portable across
development tools. While AgentConfig itself is no longer in active
development, its public instance remains available and the product is
cited by Wang as an important conceptual predecessor to his later
infrastructure work.

## See also

- [[Colar Wang]]
- [[KitchenSurvivor]]

## References

[^1]: "AgentConfig". [agentconfig-theta.vercel.app](https://agentconfig-theta.vercel.app/). Retrieved 7 April 2026.
