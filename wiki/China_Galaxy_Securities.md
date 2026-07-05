---
title: China Galaxy Securities
subtitle: Quantitative research internship of Colar Wang (2024)
description: Colar Wang's Data Product internship on the quantitative research desk at China Galaxy Securities, Shanghai, summer 2024.
infobox:
  title: China Galaxy Securities
  image: /galaxy-logo.png
  image_caption: China Galaxy Securities Co., Ltd.
  rows:
    - label: Employer
      value: China Galaxy Securities Co., Ltd.
    - label: Role
      value: Quantitative Research Intern
    - label: Location
      value: Shanghai, China
    - label: Dates
      value: July 2024 – September 2024
    - label: Focus
      value: |
        LSTM–XGBoost trading system,
        real-time feature engineering,
        model validation
---

In the summer of 2024, [[Colar Wang]] served as a **Quantitative
Research Intern** at **China Galaxy Securities Co., Ltd.** in
Shanghai. The internship, which ran from July to September 2024,
was Wang's principal exposure to institutional quantitative research
and directly informed the validation-oriented engineering style he
has carried into his subsequent AI product work.

## Work

Wang's work at Galaxy Securities centered on three related threads:

### Hybrid LSTM–XGBoost trading system

Wang worked on productizing a hybrid **LSTM–XGBoost** modeling
framework into an automated trading system, combining sequence-learning
signals (LSTM) with tabular gradient boosting (XGBoost) to capture
non-linear intraday patterns. A simulated backtest of the framework on
historical data returned approximately 33 percent over the
Q3 2024 backtest window.

<figure>
  <img src="/galaxy/eda-returns.png" alt="Boxplot of log returns and AAPL return distribution against a normal reference" />
  <figcaption>Exploratory analysis of log-return distributions across AAPL and four peer equities (MSFT, TSLA, AMZN, SPY), used to characterize the heavy-tailed regime structure of the input series before feature engineering.</figcaption>
</figure>

<figure>
  <img src="/galaxy/final-prediction.png" alt="Held-out test prediction of AAPL closing price against validation series" />
  <figcaption>Held-out test prediction of AAPL closing price (red, terminal value $157.57) against the validation series (blue) with a one-σ band, with the model's reported mean absolute error of 4.51 over a 28-trading-day window.</figcaption>
</figure>

### Real-time feature engineering

He also architected a seven-module data ingestion pipeline intended to
normalize multi-source market feeds and resolve latency bottlenecks in
real-time feature engineering, enabling millisecond-scale model
inference.

<figure>
  <img src="/galaxy/feature-importance.png" alt="XGBoost feature importance ranking by F-score" />
  <figcaption>XGBoost feature-importance ranking (F-score) across the engineered candlestick and time-of-day feature set. Top-ranked features are concentrated in the rolling-window candlestick block (f55, f40, f39), validating the candlestick feature design.</figcaption>
</figure>

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
- [[KitchenSurvivor]]
- [[ByteDance_TikTok_internship]]
