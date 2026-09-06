---
name: criticism-self-criticism
description: |
  批评与自我批评：在工作完成、阶段验收、收到批评或同类错误反复出现时，对成果和过程做诚实、具体、基于事实的审视，输出可执行的改进项，并处理外来批评而不辩解。触发信号包括 review、复盘、审查、"帮我看看有没有问题"、"你确定吗"；任务刚开始或只是单步查询时不触发。
  English: Criticism and self-criticism. After delivery, at a review checkpoint, on receiving criticism, or when the same mistake recurs, examine the result and the process honestly and concretely, produce actionable fixes, and accept valid criticism without defensiveness. Triggers include review, retrospective, audit, "check this for problems", "are you sure"; skip at the start of a task or for one-step lookups.
---

# 批评与自我批评

> "房子是应该经常打扫的，不打扫就会积满了灰尘。" —— 《论联合政府》

目的是治病救人：每指出一个问题，就给一个改进；肯定做得好的部分；对事不对人。

## 用 / 不用

用：
- 一项工作完成，交付前审视
- 收到用户或审查者的批评
- 同类错误反复出现，要找根本原因
- 阶段性节点复盘

不用：
- 任务刚开始，没有可审视的成果
- 用户在实时指导，反馈已即时纳入
- 紧急修复进行中：先修完，再复盘

## 操作规程

**自我批评**

1. 复述原定目标与验收标准。
2. **重新看制品本身**（diff、输出、测试结果），不看自己的叙述；自己知道的问题必须主动暴露。
3. 逐项对照 [review-checklist.md](review-checklist.md)：完整性、正确性、方法论、质量。
4. 问题写具体：哪一步、哪个文件、造成什么影响、根本原因是哪条方法论失误（跳过了调查？没验证？分散了力量？）。
5. 输出审视报告（模板见下）。问题表为空时，必须写"未发现需要改正的问题，原因是 ……"。
6. 需要独立视角时，派遣 `self-critic` 子 agent 在新鲜上下文中审查制品；主线不得替它预填结论。

**处理外来批评**

1. 先完整听完，不急于辩解。
2. 用事实核对：对 → 立即接受并改正，说明改了什么；不对 → 用证据说明，不情绪化。
3. 表面接受实际不改，比拒绝批评更坏。

## 输出模板

```
## 工作审视报告
原定目标 / 验收标准：……
完成情况：[x] …… [ ] ……（原因）

| 严重程度 | 问题（具体到步骤 / 文件） | 根本原因 | 改进 |
|---|---|---|---|
| 必须改正 | | | |
| 应当改正 | | | |
| 建议改进 | | | |

做得好的地方：……
下次重点关注：……
```

## 纪律

- 禁止"做得不够好"这类无信息量描述。
- 禁止没有改进建议的批评，禁止针对性格的评价。
- 禁止基于猜测的批评；不确定的标"存疑"。
- 报告末尾把"下次重点关注"直接交给用户：这是跨会话唯一可靠的跟进机制。

## 交接

- 报告中的"必须改正" → 立即修复并回到 `practice-cognition` 验证
- 问题根源是主要矛盾没抓对 → `contradiction-analysis`

> 原著依据：[original-texts.md](original-texts.md)
