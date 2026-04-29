---
title: 中国银河证券
subtitle: 王旭洲的量化研究实习 (2024)
description: 王旭洲在 2024 年夏季于中国银河证券股份有限公司上海总部从事量化研究的实习经历。
infobox:
  title: 中国银河证券
  image: /galaxy-logo.png
  image_caption: 中国银河证券股份有限公司
  rows:
    - label: 实习生
      html: '<a href="/zh/wiki/Colar_Wang/">王旭洲 (Colar Wang)</a>'
    - label: 雇主
      value: 中国银河证券股份有限公司
    - label: 角色
      value: 量化研究实习生
    - label: 团队
      value: 量化研究
    - label: 地点
      value: 中国上海
    - label: 时间
      value: 2024 年 7 月 – 2024 年 9 月
    - label: 研究方向
      value: |
        LSTM-XGBoost 交易系统、
        实时特征工程、
        模型验证
    - section: 链接
    - label: 源代码
      html: '<a href="https://github.com/wangxuzhou666-arch/china-galaxy-securities-quant">github.com/.../china-galaxy-securities-quant</a>'
    - label: 公司主页
      html: '<a href="https://www.chinastock.com.cn/">chinastock.com.cn</a>'
---

2024 年夏,[[Colar Wang|王旭洲]]在**中国银河证券股份有限公司**上海
总部担任**量化研究实习生**。[^1] 该实习时间为 2024 年 7 月至 9 月,
是王旭洲首次正式接触机构化量化研究的经历,直接塑造了他后来在 AI
产品工作中所贯彻的"以验证为先"的工程风格。

## 工作内容

王旭洲在银河证券的工作集中在三条相关线索上:

### 混合 LSTM-XGBoost 交易系统

王旭洲参与将一套**混合 LSTM-XGBoost** 建模框架产品化为自动化交易
系统,该系统将 LSTM 的序列学习信号与 XGBoost 的表格类梯度提升结合
起来,捕捉日内的非线性模式。在历史数据上的模拟回测显示,该框架在
高频信号生成机制下取得约 **50% 的年化收益**。

<figure>
  <img src="/galaxy/eda-returns.png" alt="对数收益分布的箱线图与正态参考叠加" />
  <figcaption>对 AAPL 与 MSFT、TSLA、AMZN、SPY 四只对照股的对数收益分布进行的探索性分析,用以在特征工程之前刻画输入序列的厚尾结构与市场状态分布。</figcaption>
</figure>

完成该工作的 Jupyter notebook 与全部渲染好的 PDF 报告——涵盖 EDA、
四种 rolling window 尺度下的 K 线特征工程、XGBoost / LSTM / 混合
建模与线性回归基线的对比——已作为开放归档发布于
[github.com/wangxuzhou666-arch/china-galaxy-securities-quant](https://github.com/wangxuzhou666-arch/china-galaxy-securities-quant)。[^2]

<figure>
  <img src="/galaxy/final-prediction.png" alt="测试集上 AAPL 收盘价预测与验证序列对比" />
  <figcaption>测试集上对 AAPL 收盘价的预测(红线,终值 $157.57)与验证序列(蓝线)的对比,带有一倍标准差区间;模型在 28 个交易日窗口上的平均绝对误差为 4.51。</figcaption>
</figure>

### 实时特征工程

王旭洲还构建了一套七模块的数据摄取管道,旨在归一化多源市场数据
并解决实时特征工程中的延迟瓶颈,使得模型推理可以在毫秒级完成。

<figure>
  <img src="/galaxy/feature-importance.png" alt="XGBoost 特征重要性 F-score 排序" />
  <figcaption>XGBoost 在工程化的 K 线与时间特征集上的特征重要性排序(F-score)。排名靠前的特征集中在滚动窗口的 K 线特征区块(f55、f40、f39),验证了 K 线特征设计的有效性。</figcaption>
</figure>

### 验证与压力测试

王旭洲进一步引入了一套验证协议,包括**时间序列交叉验证**与
**状态感知压力测试**。根据内部的测量结果,这些协议在波动剧烈的
市场条件下将预测稳定性提升了约 **30%**。

## 对后续工作的影响

王旭洲将这次实习视作"以验证为先"的工程实践的奠基性经历,并明确
将银河证券的状态感知压力测试与他后来为 KitchenSurvivor 设计的
[[KitchenSurvivor|双层验证协议]]之间画上了直接的连线;同时,他也将
这一段经历视为他即将在
[[ByteDance_TikTok_internship|字节跳动青少年安全团队]]承担的评估
方向的重要前序。

## 参见

- [[Colar Wang|王旭洲]]
- [[University of Nottingham|诺丁汉大学]] — 同期就读机构
- [[KitchenSurvivor]]
- [[ByteDance_TikTok_internship|字节跳动 / TikTok 实习]]

## 参考资料

[^1]: "中国银河证券股份有限公司". [chinastock.com.cn](https://www.chinastock.com.cn/).

[^2]: 王旭洲 (2024). "Hybrid LSTM-XGBoost Quantitative Research". [github.com/wangxuzhou666-arch/china-galaxy-securities-quant](https://github.com/wangxuzhou666-arch/china-galaxy-securities-quant).
