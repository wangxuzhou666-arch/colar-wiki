---
title: First-principles thinking
subtitle: Product-design methodology associated with Colar Wang
description: First-principles thinking, as applied to product design by Colar Wang — the decomposition of product problems to their most elementary constraints before accepting existing solutions.
infobox:
  title: First-principles thinking
  image_caption: Conceptual page
  rows:
    - label: Type
      value: Product-design methodology
    - label: Associated with
      html: '<a href="/wiki/Colar_Wang/">Colar Wang</a>'
    - label: First cited
      value: 2026
    - label: Applied in
      html: '<a href="/wiki/KitchenSurvivor/">KitchenSurvivor</a>, <a href="/wiki/AgentConfig/">AgentConfig</a>'
---

**First-principles thinking**, as used in this wiki, refers to the
methodology [[Colar Wang]] has publicly identified as central to his
product-design practice: the decomposition of a product problem to its
most elementary constraints before accepting any existing solution as
a template.

The methodology is not original to Wang — the phrase traces to
Aristotle's concept of *arche* and has been popularized in technology
contexts by figures such as Elon Musk. What distinguishes Wang's usage
is its consistent application to *product design* rather than to
engineering or physics: in each of his shipped products, the first
principle is identified not as a technical constraint but as a latent
user behavior that existing product categories fail to address.

## Applied contexts

Wang has applied this framing in at least three distinct contexts on
record, each demonstrating the same pattern: reject the inherited
product taxonomy, identify the actual binding constraint from the
user's perspective, and let the product architecture follow from that
constraint rather than from existing category conventions.

### KitchenSurvivor

In [[KitchenSurvivor]], the "first principle" is identified as a
user's latent question (*"what can I eat tonight?"*) rather than any
intermediate abstraction such as recipes, inventories, or meal plans.
Wang has argued that the conventional "recipe app" category accepts
the recipe as an atomic unit and optimizes retrieval, when the actual
binding constraint for the target audience — international students
with irregular schedules, unfamiliar ingredients, and limited energy
— is the translation of ambiguous visual input (an unfamiliar fridge)
into a concrete, single-step decision. The product architecture,
including its edge–cloud split, its multimodal capture layer, and its
dual-layer verification protocol, is presented by Wang as downstream
of this framing: each architectural decision is justified by its
contribution to closing the gap between the fridge and the decision,
rather than by technical merit alone.

### AgentConfig

In [[AgentConfig]], Wang has argued that the first principle of agent
configuration is *user intent articulation*, not prompt syntax. The
inherited taxonomy — prompt engineering, system prompts, fine-tuning
— assumes that the user can already describe what they want in
technical terms. For the target audience (Chinese-speaking knowledge
workers who do not write code), the actual bottleneck is the step
before prompting: articulating what they want an agent to do in the
first place. The product's minimalist interface and structured-
interview model are described as a direct consequence of this
reframing.

### Agent infrastructure

Wang has extended the same methodology to his open-source agent-
definition collection, where the first principle is identified as
*portability*: an agent definition should not be locked to a single
tool or vendor, but should be expressible as a portable specification
that can be converted across development environments. This framing
led to the "harness engineering" architecture in which agent
definitions are maintained as standalone documents and converted to
tool-specific formats through automated pipelines.

## Relationship to user-auditable guarantees

Wang has described first-principles thinking and his concept of
"user-auditable guarantees" as complementary: the first-principles
decomposition identifies the correct quality metric for a product
(for example, recipe executability in KitchenSurvivor), and the
user-auditable-guarantee framework provides the engineering pattern
for enforcing that metric — typically a deterministic validation
layer wrapping probabilistic model output. Together, these two
frameworks form the methodological core described in the
[[Colar Wang|main biography]].

## History in the biography

Wang has traced the explicit adoption of this methodology to his
quantitative research period at
[[China Galaxy Securities]] in 2024, where validation-first
engineering practice forced a habit of decomposing every model claim
to its measurable foundations before accepting it as actionable. He
has described this as the moment he stopped trusting "received
product taxonomies" in favor of going back to latent user behavior.

## See also

- [[Colar Wang]]
- [[KitchenSurvivor]]
- [[AgentConfig]]
- [[China Galaxy Securities]]
