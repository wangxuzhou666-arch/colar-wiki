---
title: AgentConfig
subtitle: 基于 Web 的 AI 智能体配置顾问 (2026)
description: AgentConfig 是一款由Colar开发的、面向 AI 智能体配置的 Web 顾问工具。
infobox:
  title: AgentConfig
  image: /agentconfig/hero.jpg
  image_caption: 'AgentConfig 首页,标语为"不是你找它,是它帮你想"。'
  rows:
    - label: 在线访问
      html: '<a href="https://agentconfig-theta.vercel.app/">打开应用 →</a>'
    - label: 开发者
      html: '<a href="/zh/wiki/Colar_Wang/">Colar (Colar Wang)</a>'
    - label: 类型
      value: Web 应用、AI 顾问工具
    - label: 首次发布
      value: 2026 年初
    - label: 技术栈
      value: Next.js、React、Vercel
    - label: 模型
      value: Claude (Anthropic)、DeepSeek
    - label: 状态
      value: 公开 MVP (不再活跃开发)
---

**AgentConfig** 是一款基于 Web 的 AI 智能体配置顾问工具,主要面向
中文知识工作者。[^1] 它由[[Colar Wang|Colar]]于 2026 年初构思并
实现,是其在[[University of Pennsylvania|宾夕法尼亚大学]]研究生
学业之外的独立项目,以静态与无服务器架构部署在 Vercel 平台上。[^1]

## 概念

AgentConfig 的核心前提是:大多数非技术用户并不需要"读"或"写"
智能体代码,但他们*确实*需要帮助来表达"我到底想让一个智能体替我
做什么"——Colar将这种困难称为**"智能体落地的真正瓶颈"**。因此
该产品的工作方式是一段结构化访谈:把用户对自己工作的非正式描述,
翻译成一份具体的智能体配置规格说明,用户可以将其导出到自己使用的
工具中。

<figure class="figure-portrait">
  <img src="/agentconfig/interview.jpg" alt="AgentConfig 结构化访谈界面:顶部步骤进度条,配置顾问用非技术语言追问具体任务" />
  <figcaption>结构化访谈界面。顶部步骤条依次走过职业、常用工具、工作系统与工作场景,"配置顾问"用非技术语言追问具体任务——此处正针对一位电商运营反复处理的数据汇总活儿发问——并支持上传工作文件(Excel、图片、周报等)作为推荐依据。</figcaption>
</figure>

一个关键的设计决策是:推荐器不允许语言模型自行编造仓库名、软件包或
安装命令,只能从一份人工筛选的开源项目清单中挑选。Colar将这一约束
描述为产品主要的幻觉控制机制,也是一个有意的取舍——放弃对小众场景的
覆盖,换取"每条推荐都可落地、安装步骤可直接运行"的硬保证。

<figure class="figure-portrait">
  <img src="/agentconfig/recommendation.jpg" alt="AgentConfig 推荐结果卡片:'Excel 自动工坊'方案,标注搭建难度、启动时间与每周节省" />
  <figcaption>一张推荐结果卡片。最推荐方案(此处为"Excel 自动工坊")标注了搭建难度("新手友好")、启动时间(约 30 分钟)与预计每周可节省的时间,下方"为什么推荐"援引用户自己描述的工作流,并给出一份可选的分步搭建大纲。</figcaption>
</figure>

被选中的方案还可以打开为一张可编辑的节点式工作流——由数据处理、模型
与动作三类节点连接而成,可直接运行或调整。

<figure>
  <img src="/agentconfig/workflow-editor.jpg" alt="AgentConfig 节点式工作流编辑器:数据处理节点接入 DeepSeek 模型节点,再扇出到消息与日志动作,右侧为节点配置面板" />
  <figcaption>"Excel 自动工坊"方案的节点式工作流编辑器。两个数据处理节点(提取字段、文本替换)接入一个 DeepSeek 模型节点(deepseek-reasoner),再扇出到多个动作节点——企业微信、打印日志、飞书。右侧面板展示所选节点的配置:模型、系统提示词、编排框架、最大 Token 数与 temperature。左侧面板列出可用积木,包括 HTTP 请求、钉钉与邮件动作,以及导出 Excel、生成 PPT、导出 Word。</figcaption>
</figure>

## 设计哲学

Colar明确表示,AgentConfig 的界面是刻意极简的,产品的技术复杂度
全部集中在服务器端,对用户隐藏。他主张对于不熟悉英文 AI 社区中
prompt-engineering 词汇的中文知识工作者而言,**"简单本身就是功能"**;
如果把一个智能体配置工具呈现成"又一个开发者 IDE",就会违背这个
工具存在的初衷。

这一设计立场与大多数英文智能体框架的"开发者优先"取向截然相反,
Colar将其确认为该项目最主要的产品赌注。

## 技术

应用使用 **Next.js** (App Router) 实现,部署在 **Vercel** 平台上,
API 路由运行于 edge runtime。推理通过 **Anthropic Claude** 与
**DeepSeek** 的组合进行路由,选择依据是面向中文用户的成本与延迟
考虑。公开实例可访问。[^1]

## 后续发展

Colar将 AgentConfig 描述为在"智能体配置应对非技术用户可读"这一
命题上的早期实验。此后他在基础设施层面继续推进这一方向,构建了一套
包含一百多个专项智能体定义的开源集合,旨在使智能体能力在不同开发
工具间可移植。虽然 AgentConfig 本身不再处于活跃开发状态,但其公开
实例仍可访问,该产品被Colar视为其后续基础设施工作的重要概念
前身。

## 参见

- [[Colar Wang|Colar]]
- [[KitchenSurvivor]]

## 参考资料

[^1]: "AgentConfig". [agentconfig-theta.vercel.app](https://agentconfig-theta.vercel.app/). 检索于 2026 年 4 月 7 日.
