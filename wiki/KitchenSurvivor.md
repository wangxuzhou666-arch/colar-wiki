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
      value: Multimodal AI kitchen assistant and social cooking platform
    - label: Platform
      value: iOS (iPhone, iPad)
    - label: First released
      value: November 2025
    - label: Status
      value: Active development
    - label: Target audience
      value: International students, overseas residents
    - label: Stack
      value: Swift / SwiftUI, FastAPI, Firebase
    - label: Models
      value: DeepSeek, OpenAI (dual provider)
    - section: Links
    - label: App Store
      html: '<a href="https://apps.apple.com/app/id6757759255">apps.apple.com</a>'
---

**KitchenSurvivor** (Chinese: 云端小灶, lit. *"cloud-side little stove"*)
is a multimodal generative-AI iOS application and social cooking
platform developed by [[Colar Wang]], released on the Apple App Store
in November 2025 and reaching over 100 ratings by April 2026.[^1]
Positioned as an "AI Kitchen OS" for international students, it
collapses four surfaces usually shipped separately — a smart fridge,
an AI recipe generator, multimodal capture, and a geo-aware social
feed — around a single daily decision, *"what can I eat tonight?"*.

## Background

Wang conceived KitchenSurvivor in the autumn of 2025, shortly after
relocating from the United Kingdom to Philadelphia to begin his
graduate studies at the [[University of Pennsylvania]]. He has
described the trigger as "opening an unfamiliar fridge in an
unfamiliar country at the end of a long day" — a case where existing
recipe apps fail because the bottleneck is translating ambiguous
visual input into a decision, not retrieving a recipe.

## Product

KitchenSurvivor bundles into one iOS app several surfaces usually
built separately: a structured fridge inventory that users populate by
photo, receipt scan, or voice; a recipe engine that turns the current
fridge contents and a chosen *Kitchen Mood* into ranked, step-by-step
recipes; and a Xiaohongshu-style social feed scoped by school and
city. Wang has framed the organizing decision as collapsing the whole
chain — capture, decide, cook, share — around one question rather than
shipping another recipe-search app.

Several of the product's choices are cost- and latency-driven
engineering decisions rather than features. Photographic input is
processed on-device and never sent to the cloud, both on privacy
grounds and to cut inference cost — Wang has reported roughly a 40
percent reduction by running OCR locally and sending only the
extracted text to the model. Recipe responses stream token-by-token
over Server-Sent Events, which he credits with turning an initial
twenty-second wait into a roughly three-second first answer. A
preference-based recommender replaced manual filters, which he reports
lifted task completion by about 25 percent, and an early
TestFlight-driven interface redesign roughly doubled active users.

<figure class="figure-portrait">
  <img src="/kitchensurvivor/app-home-feed.jpg" alt="KitchenSurvivor home feed showing recipe cards filtered by school and mood" />
  <figcaption>The KitchenSurvivor home feed (云灶台). Recipe cards filter by school, mood, and prep time, with a community feed of user-posted dishes underneath. The tagline reads "做饭是最便宜的解压方式" — "cooking is the cheapest way to decompress".</figcaption>
</figure>

## Architecture

The iOS client is written in Swift and SwiftUI. A Firebase backend
handles accounts, posts, fridge state, and messaging, while a separate
FastAPI service fronts the AI layer — streaming inference, content
polish, and recommendation scoring. That service sits in front of two
model providers, DeepSeek and OpenAI, so the app can switch models or
fail over between them without any client-side change.

<figure class="figure-portrait">
  <img src="/kitchensurvivor/share-card-lobster.jpg" alt="A user-shared recipe card for lemon-butter cheese baked lobster with QR-code deep link" />
  <figcaption>A user-shared recipe card for 柠檬黄油芝士焗龙虾 (lemon-butter cheese baked lobster), generated through the AI recipe pipeline and exported as a WeChat-friendly share format with a QR-code deep link back to the in-app recipe.</figcaption>
</figure>

## Trust and safety

KitchenSurvivor pairs probabilistic prompt constraints with a
deterministic on-device check layer that enforces hard safety
boundaries — unsafe food-pairing advice, allergen disclosure — that a
generative model cannot be trusted to hold on its own. The same
deterministic layer enforces the product's north-star metric,
**recipe executability**: whether a generated recipe can actually be
cooked with the ingredients the user declared, which the team reports
at roughly 95 percent. Wang has described this generate-then-verify
split as a small-scale rehearsal of the central problem in AI trust
and safety — turning probabilistic model output into a user-auditable
guarantee — and has drawn a direct line from it to his
[[ByteDance_TikTok_internship|Teen Safety work at ByteDance]].

## See also

- [[Colar Wang]]
- [[AgentConfig]]
- [[ByteDance_TikTok_internship]]

## References

[^1]: "KitchenSurvivor (云端小灶)". [Apple App Store](https://apps.apple.com/app/id6757759255). Retrieved 7 April 2026.
