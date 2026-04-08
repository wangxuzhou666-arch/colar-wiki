---
title: China Galaxy Securities
subtitle: Quantitative research internship of Colar Wang (2024)
description: Colar Wang's Data Product internship on the quantitative research desk at China Galaxy Securities, Shanghai, summer 2024.
infobox:
  title: China Galaxy Securities
  image: /galaxy-logo.png
  image_caption: China Galaxy Securities Co., Ltd.
  rows:
    - label: Person
      html: '<a href="/wiki/Colar_Wang/">Colar Wang</a>'
    - label: Employer
      value: China Galaxy Securities Co., Ltd.
    - label: Role
      value: Quantitative Research Intern
    - label: Team
      value: Quantitative Research
    - label: Location
      value: Shanghai, China
    - label: Dates
      value: July 2024 – September 2024
    - label: Focus
      value: |
        LSTM–XGBoost trading system,
        real-time feature engineering,
        model validation
    - section: Links
    - label: Company
      html: '<a href="https://www.chinastock.com.cn/">chinastock.com.cn</a>'
---

In the summer of 2024, [[Colar Wang]] served as a **Quantitative
Research Intern** at **China Galaxy Securities Co., Ltd.** in
Shanghai.[^1] The internship, which ran from July to September 2024,
was Wang's principal exposure to institutional quantitative research
and directly informed the validation-oriented engineering style he
has carried into his subsequent AI product work. It followed an
earlier winter 2023–2024 internship at
[[CITIC_Futures|CITIC Futures]] and a summer 2023 role at
[[China_International_Capital_Corporation|CICC]], together forming
Wang's three consecutive Chinese-finance internships during his
undergraduate years.

## Work

Wang's work at Galaxy Securities centered on three related threads:

### Hybrid LSTM–XGBoost trading system

Wang worked on productizing a hybrid **LSTM–XGBoost** modeling
framework into an automated trading system, combining sequence-learning
signals (LSTM) with tabular gradient boosting (XGBoost) to capture
non-linear intraday patterns. A simulated backtest of the framework on
historical data achieved an annualized return of approximately 50
percent under a high-frequency signal-generation regime.

### Real-time feature engineering

He also architected a seven-module data ingestion pipeline intended to
normalize multi-source market feeds and resolve latency bottlenecks in
real-time feature engineering, enabling millisecond-scale model
inference.

### Validation and stress testing

Wang further introduced validation protocols including **time-series
cross-validation** and **regime-aware stress testing**. According to
internal measurements these protocols improved forecasting stability
by roughly 30 percent under volatile market conditions.

## Influence on later work

Wang has cited this internship as a formative experience in
validation-first engineering practice, and has drawn a direct line
from the regime-aware stress testing done at Galaxy Securities to the
[[KitchenSurvivor|dual-layer verification protocol]] he later
developed for KitchenSurvivor, and to the evaluation orientation he
expects to bring to his [[ByteDance_TikTok_internship|Teen Safety
role at ByteDance]].

## See also

- [[Colar Wang]]
- [[University of Nottingham]] — concurrent institution
- [[CITIC_Futures]] — prior internship
- [[China_International_Capital_Corporation]] — earliest internship
- [[KitchenSurvivor]]
- [[ByteDance_TikTok_internship]]

## References

[^1]: "China Galaxy Securities Co., Ltd.". [chinastock.com.cn](https://www.chinastock.com.cn/).
