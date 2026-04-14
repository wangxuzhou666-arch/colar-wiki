---
title: AgentConfig
subtitle: 基于 Web 的 AI 智能体配置顾问 (2026)
description: AgentConfig 是一款由王旭洲开发的、面向 AI 智能体配置的 Web 顾问工具。
infobox:
  title: AgentConfig
  rows:
    - label: 在线访问
      html: '<a href="https://agentconfig-theta.vercel.app/">打开应用 →</a>'
    - label: 开发者
      html: '<a href="/zh/wiki/Colar_Wang/">王旭洲 (Colar Wang)</a>'
    - label: 类型
      value: Web 应用、AI 顾问工具
    - label: 目标用户
      value: 中文知识工作者
    - label: 首次发布
      value: 2026 年初
    - label: 技术栈
      value: Next.js、React、Vercel
    - label: 模型
      value: Claude (Anthropic)、DeepSeek
    - label: 状态
      value: 公开 MVP (不再活跃开发)
    - label: 许可证
      value: 专有
---

> *请勿与 Anthropic 的 [Claude Agent SDK](https://docs.anthropic.com/) 混淆。*

**AgentConfig** 是一款基于 Web 的 AI 智能体配置顾问工具,主要面向
中文知识工作者。[^1] 它由[[Colar Wang|王旭洲]]于 2026 年初构思并
实现,是其在[[University of Pennsylvania|宾夕法尼亚大学]]研究生
学业之外的独立项目,以静态与无服务器架构部署在 Vercel 平台上。[^1]

## 概念

AgentConfig 的核心前提是:大多数非技术用户并不需要"读"或"写"
智能体代码,但他们*确实*需要帮助来表达"我到底想让一个智能体替我
做什么"——王旭洲将这种困难称为**"智能体落地的真正瓶颈"**。因此
该产品的工作方式是一段结构化访谈:把用户对自己工作的非正式描述,
翻译成一份具体的智能体配置规格说明,用户可以将其导出到自己使用的
工具中。

王旭洲将其定位为[[First-principles_thinking|第一性原理思维]]的应用:
在他看来,智能体配置的第一性原理是*用户意图的清晰表达*,而不是
prompt 语法。

## 设计哲学

王旭洲明确表示,AgentConfig 的界面是刻意极简的,产品的技术复杂度
全部集中在服务器端,对用户隐藏。他主张对于不熟悉英文 AI 社区中
prompt-engineering 词汇的中文知识工作者而言,**"简单本身就是功能"**;
如果把一个智能体配置工具呈现成"又一个开发者 IDE",就会违背这个
工具存在的初衷。

这一设计立场与大多数英文智能体框架的"开发者优先"取向截然相反,
王旭洲将其确认为该项目最主要的产品赌注。

## 技术

应用使用 **Next.js** (App Router) 实现,部署在 **Vercel** 平台上,
API 路由运行于 edge runtime。推理通过 **Anthropic Claude** 与
**DeepSeek** 的组合进行路由,选择依据是面向中文用户的成本与延迟
考虑。公开实例可访问。[^1]

## 后续发展

王旭洲将 AgentConfig 描述为在"智能体配置应对非技术用户可读"这一
命题上的早期实验。此后他在基础设施层面继续推进这一方向,构建了一套
包含一百多个专项智能体定义的开源集合,旨在使智能体能力在不同开发
工具间可移植。虽然 AgentConfig 本身不再处于活跃开发状态,但其公开
实例仍可访问,该产品被王旭洲视为其后续基础设施工作的重要概念
前身。

## 参见

- [[Colar Wang|王旭洲]]
- [[KitchenSurvivor]]
- [[First-principles_thinking|第一性原理思维]]

## 参考资料

[^1]: "AgentConfig". [agentconfig-theta.vercel.app](https://agentconfig-theta.vercel.app/). 检索于 2026 年 4 月 7 日.
