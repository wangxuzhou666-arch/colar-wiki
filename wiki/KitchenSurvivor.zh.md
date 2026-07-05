---
title: KitchenSurvivor (云端小灶)
subtitle: 多模态生成式 AI 消费级应用 (2025)
description: KitchenSurvivor (云端小灶) 是一款由Colar开发的多模态生成式 AI iOS 应用。
infobox:
  title: KitchenSurvivor (云端小灶)
  image: /kitchensurvivor-icon.jpg
  image_caption: KitchenSurvivor 应用图标
  rows:
    - label: 中文名
      value: 云端小灶
    - label: 开发者
      html: '<a href="/zh/wiki/Colar_Wang/">Colar (Colar Wang)</a>'
    - label: 类型
      value: 多模态生成式 AI 消费应用
    - label: 平台
      value: iOS (iPhone、iPad)
    - label: 首次发布
      value: 2025 年 11 月
    - label: 状态
      value: 持续开发中
    - label: 用户评分
      value: 100+ 条 (Apple App Store)
    - label: 架构
      value: 边-云混合
    - label: 模型
      value: DeepSeek、OpenAI (双 provider)
    - section: 链接
    - label: App Store
      html: '<a href="https://apps.apple.com/app/id6757759255">apps.apple.com</a>'
---

**KitchenSurvivor**(中文:**云端小灶**,字面意思为"位于云端的
小灶台")是一款由[[Colar Wang|Colar]]开发的多模态生成式 AI iOS
应用,2025 年 11 月在 Apple App Store 上线,截至 2026 年 4 月已
获得超过 100 条评分。[^1] 该应用定位为面向海外学生的"AI 厨房
OS",将冰箱、AI 菜谱生成、多模态采集与地理感知社交 feed 四个通常
分立的产品面整合在"今晚我能吃什么?"这一日常决策周围。

## 背景

Colar在 2025 年秋季构思了 KitchenSurvivor,当时他刚从英国搬到费城
开始在[[University of Pennsylvania|宾夕法尼亚大学]]的研究生学业。
他将这一灵感的触发场景描述为"在一个漫长的工作日结束之后,在一个
陌生的国家打开一个陌生的冰箱"——现有菜谱与备餐应用在此场景下无能
为力,因为瓶颈是把模糊的视觉输入翻译成决定,而不是菜谱检索。

## 架构

KitchenSurvivor 建立在一套边-云混合管道之上,将设备端的食材识别
与云端的大语言模型推理解耦。云端一个 FastAPI 服务位于 **DeepSeek**
与 **OpenAI** 两个模型提供方之前,可在不改动客户端的情况下切换模型
或在两者间故障切换;原始照片输入出于隐私考虑在设备端处理,不上传
云端。

iOS 客户端使用 **Swift** 与 **SwiftUI** 编写,生命周期管理器自动
清理孤立后台任务,Colar认为这一设计消除了早期内测用户报告的
后台耗电问题。

<figure class="figure-portrait">
  <img src="/kitchensurvivor/app-home-feed.jpg" alt="云灶台主页与菜谱卡片" />
  <figcaption>KitchenSurvivor 主页(云灶台)。菜谱卡片按学校、心情与制作时间筛选,下方是用户上传菜品的社区 feed。Tagline "做饭是最便宜的解压方式" 出现在搜索栏下方。</figcaption>
</figure>

<figure class="figure-portrait">
  <img src="/kitchensurvivor/share-card-lobster.jpg" alt="用户分享菜谱卡片(柠檬黄油芝士焗龙虾)" />
  <figcaption>用户分享的菜谱卡片(柠檬黄油芝士焗龙虾),通过 AI 菜谱流水线生成,并导出为带二维码深链的微信友好分享格式。</figcaption>
</figure>

## 信任与安全

系统结合基于概率的 prompt-engineering 约束与基于规则的设备端检查,
强制执行硬性的安全边界——例如禁止给出不安全的食物搭配建议、
规范过敏原披露等。设备端层同样负责执行产品的核心质量指标
**菜谱可执行性**——即生成的菜谱是否能用用户已声明的食材实际
烹饪——团队在内部审查中报告该指标约为 95%。Colar将这种"先生成、
再确定性校验"的结构描述为 AI 信任与安全核心问题的小规模预演——把
概率性的模型输出转化为用户可审计的保证——并将其直接延伸到他在
[[ByteDance_TikTok_internship|字节跳动 TikTok 的青少年安全工作]]。

## 参见

- [[Colar Wang|Colar]]
- [[AgentConfig]]
- [[ByteDance_TikTok_internship|字节跳动 / TikTok]]

## 参考资料

[^1]: "KitchenSurvivor (云端小灶)". [Apple App Store](https://apps.apple.com/app/id6757759255). 检索于 2026 年 4 月 7 日.
