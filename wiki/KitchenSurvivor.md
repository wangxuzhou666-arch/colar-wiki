---
title: KitchenSurvivor
subtitle: Multimodal social AI cooking platform (2025)
description: KitchenSurvivor (云端小灶) is a multimodal generative-AI iOS application and social cooking platform developed by Colar Wang for international students and overseas residents.
infobox:
  title: KitchenSurvivor
  image: /kitchensurvivor-icon.jpg
  image_caption: KitchenSurvivor application icon
  rows:
    - label: Chinese name
      value: 云端小灶
    - label: Translation
      value: "\"Cloud-side little stove\""
    - label: Developer
      html: '<a href="/wiki/Colar_Wang/">Colar Wang</a>'
    - label: Type
      value: Multimodal AI kitchen OS and social cooking platform
    - label: Genre
      value: Consumer GenAI / lifestyle / community
    - label: Platform
      value: iOS (iPhone, iPad)
    - label: First released
      value: November 2025
    - label: Status
      value: Active development
    - label: Target audience
      value: International students, overseas residents
    - label: Client
      value: Swift / SwiftUI (structured concurrency)
    - label: Backend
      value: FastAPI (Python) + Firebase / Firestore
    - label: Models
      value: DeepSeek LLM, OpenAI (dual provider)
    - label: Streaming protocol
      value: Server-Sent Events (SSE) / NDJSON
    - label: Real-time
      value: WebSocket (FastAPI)
    - label: License
      value: Proprietary
    - section: Links
    - label: App Store
      html: '<a href="https://apps.apple.com/app/id6757759255">apps.apple.com</a>'
---

**KitchenSurvivor** (Chinese: 云端小灶, lit. *"cloud-side little stove"*)
is a multimodal generative-AI iOS application and social cooking
platform developed by [[Colar Wang]], released on the Apple App Store
in November 2025 and reaching over 100 ratings by April 2026.[^1]
Positioned as an "AI Kitchen OS" for international students, it
combines four surfaces typically shipped separately — a smart fridge,
an AI recipe generator, multimodal capture, and a geo-aware social
feed — around the daily decision *"what can I eat tonight?"*.

## Background

Wang conceived KitchenSurvivor during the autumn of 2025, shortly
after relocating from the United Kingdom to Philadelphia to begin his
graduate studies at the [[University of Pennsylvania]]. He has
described the trigger as "opening an unfamiliar fridge in an
unfamiliar country at the end of a long day," a case where existing
recipe and meal-planning apps fail because the bottleneck is
translating ambiguous visual input into a decision rather than
retrieval.

## Features

KitchenSurvivor ships as a single iOS application covering the
following product surfaces.

### Smart Fridge

The **Smart Fridge** module is a structured inventory layer in which
users track ingredients by **category** (twelve categories including
vegetables, fruits, meat, seafood, dairy, grains, condiments,
beverages, and frozen goods), **storage location**
(`fridge` / `freezer` / `pantry`), and **expiry window** relative to
purchase date. Items can be added manually, via vision capture, or
automatically from scanned supermarket receipts.

### Multimodal capture

Ingredient and receipt capture is handled by two in-app scanners
built on on-device vision pipelines, supplemented by a native
speech-recognition search sheet for hands-free ingredient entry.
Together these three modalities — vision, voice, and typed text —
allow the user to populate and query the Smart Fridge without
committing to a single input channel.

### AI recipe generation

The recipe engine accepts the user's current fridge contents, stated
dietary constraints, and a *Kitchen Mood* and returns a ranked set of
recipes, each expressed as an ordered ingredient list, a step-by-step
cooking procedure, and a difficulty tier. The engine supports both a
**JSON-response** mode for deterministic UI rendering and a
**streaming Server-Sent Events (SSE)** mode that emits partial recipe
tokens as they are produced by the underlying model.

The Kitchen Mood selector biases both the recipe engine and the
persona recommendation service, with five canonical moods written in
the idiomatic register of the Chinese overseas-student internet:

| Mood | Chinese label | Rough English gloss |
|---|---|---|
| **Survival** | 💀 生存模式 | "just keep me alive tonight" |
| **Indulgence** | 😋 深夜放毒 | "late-night poison" |
| **Ascetic diet** | 🥗 减脂苦行 | "cutting calories like a monk" |
| **Performative elegance** | 👑 伪装精致 | "faking the lifestyle" |
| **Homesick** | 🏠 想家了 | "I miss the food from home" |

A secondary **content-polish** endpoint refines user-contributed
ingredient lists and cooking steps before they are posted to the
social feed.

### Social feed and community

The **social feed** is modeled on the lifestyle-sharing format
popularized by Xiaohongshu and provides posts, likes, favorites, and
threaded comments, with filters along three axes: `userId`, `school`,
and `city`. A separate **monthly leaderboard** ranks community
contributors for each calendar month. A **conversation and chat**
subsystem supports one-to-one and system messages over a FastAPI
WebSocket channel, intended to let users coordinate around shared
kitchens, grocery runs, and meal exchanges within the same school
or city.

<figure class="figure-portrait">
  <img src="/kitchensurvivor/share-card-lobster.jpg" alt="A user-shared recipe card for lemon-butter cheese baked lobster with QR-code deep link" />
  <figcaption>A user-shared recipe card for 柠檬黄油芝士焗龙虾 (lemon-butter cheese baked lobster), generated through the AI recipe pipeline and exported as a WeChat-friendly share format with a QR-code deep link back to the in-app recipe.</figcaption>
</figure>

### Personalization

A **recommendation engine** and a **user-persona analysis** service
produce a per-user feed of recipes and posts, drawing on
interaction history, declared dietary preferences, and the user's
stated *Kitchen Mood* profile. The persona service runs as a
server-side endpoint and is used both for feed ranking and for
biasing recipe generation toward the user's historical taste.

### Location and privacy controls

The application offers three **location-sharing** tiers, reflecting
Wang's stated concern that lifestyle products for international
students often mishandle the trade-off between community discovery
and personal safety:

- `🔒 隐身 (incognito)` — no location signal shared;
- `🏙️ 同城 (same city)` — city-level sharing only;
- `🏫 校友 (alumni)` — school-level sharing enabled.

The default setting is configured on first launch and can be
revised at any time.

<figure class="figure-portrait">
  <img src="/kitchensurvivor/app-home-feed.jpg" alt="KitchenSurvivor home feed showing recipe cards filtered by school and mood" />
  <figcaption>The KitchenSurvivor home feed (云灶台). Recipe cards filter by school, mood, and prep time, with a community feed of user-posted dishes underneath. The tagline reads "做饭是最便宜的解压方式" — "cooking is the cheapest way to decompress".</figcaption>
</figure>

## Architecture

The iOS client uses a lifecycle manager that auto-prunes orphaned
background tasks, which Wang has credited with eliminating the
background battery drain reported by early beta testers.

The Firebase / Firestore backend handles user accounts, posts, fridge
state, and messaging persistence. A separate FastAPI service handles
AI proxying, streaming inference, content polish, recommendation
scoring, user-persona analysis, image upload, and real-time chat over
a WebSocket endpoint. The FastAPI service fronts two AI providers —
DeepSeek and OpenAI — allowing runtime model selection and provider
failover without client-side changes.

Inference results are streamed back to the client over Server-Sent
Events and rendered progressively, with a custom streaming delegate
on `URLSession` handling partial-response parsing. Raw photographic
input is processed locally and not transmitted to the cloud, on
privacy grounds.

## Trust and safety

The system combines probabilistic prompt-engineering constraints with
deterministic on-device checks to enforce hard safety boundaries — for
example, the prohibition of unsafe food-pairing advice and the
handling of allergen disclosures. The deterministic layer also
enforces the product's central quality metric, **recipe executability**
— a measure of whether a generated recipe is physically cookable by
the user with the ingredients they have declared — which the team
reports as approximately 95 percent based on internal review.

## See also

- [[Colar Wang]]
- [[AgentConfig]]

## References

[^1]: "KitchenSurvivor (云端小灶)". [Apple App Store](https://apps.apple.com/app/id6757759255). Retrieved 7 April 2026.
