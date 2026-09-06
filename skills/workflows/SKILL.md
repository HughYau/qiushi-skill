---
name: workflows
description: |
  工作流组合：当一个任务明显需要多件思想武器接力时，提供四种标准组合模式（新项目启动、复杂问题攻坚、方案迭代优化、阶段复盘），定义调用顺序、每步交接物和终止条件。触发信号包括从零启动、疑难攻坚、迭代优化、阶段复盘；单一 skill 就够用时不触发。
  English: Workflow patterns. When a task clearly needs several skills in sequence, pick one of four standard patterns (project kickoff, hard-problem assault, iterative improvement, stage retrospective) that fix the order, the handoff artifact between steps, and the stop condition. Skip when a single skill suffices.
---

# 工作流组合

> "政策和策略是党的生命，各级领导同志务必充分注意，万万不可粗心大意。"

方法论的威力在于以正确顺序组合。下面四条是**模式，不是流水线**：不需要的步骤可以跳过，但每一步的交接物必须写出来，下一步必须引用它。

## 选择

| 情况 | 模式 |
|---|---|
| 全新项目或领域，目标已知路径未知 | 1 启动 |
| 已知的疑难问题，根因或路径不清 | 2 攻坚 |
| 已有方案，效果不理想 | 3 迭代 |
| 阶段性节点，要复盘并重定方向 | 4 复盘 |
| 都不符 | 回到 `arming-thought` 路由表单独调用 |

## 模式 1：新项目启动

`investigation-first` → `contradiction-analysis` → `spark-prairie-fire` → `protracted-strategy`

| 步 | 交接物 | 终止条件 |
|---|---|---|
| 调查 | 调查结论：现状 / 约束 / 未知 / 可依托基础 | 能回答"现在是什么情况" |
| 矛盾 | 主要矛盾 + 最值得突破的切入点 | 有一个明确切入点 |
| 星火 | 根据地 + 三步路线图 | 路线从当前能力出发 |
| 持久 | 当前阶段 + 转换条件 | 有阶段定位 |

## 模式 2：复杂问题攻坚

`investigation-first` → `contradiction-analysis` → `concentrate-forces` → `practice-cognition`（循环）→ `criticism-self-criticism`

| 步 | 交接物 | 终止条件 |
|---|---|---|
| 调查 | 现象 / 出现条件 / 已排除原因 / 未查方向 | 能精确描述问题，而非"好像是 X" |
| 矛盾 | 主要矛盾 + 可证伪假说 + 验证方式 | 有可验证假说 |
| 集中 | 🎯 主攻 = 验证该假说；暂缓其他 | 假说被证实或证伪 |
| 实践 | 判定 + 本轮学到；证伪则回到矛盾 | 问题彻底解决，能说清原因与解法 |
| 批评 | 工作审视报告 | 报告完成 |

## 模式 3：方案迭代优化

`mass-line` → `contradiction-analysis` → `practice-cognition` → `criticism-self-criticism` → `mass-line`（下一轮）

| 步 | 交接物 | 终止条件 |
|---|---|---|
| 群众 | ≥ 2 个来源的反馈、分歧、共同指向 | 至少两个独立来源 |
| 矛盾 | 本轮主要矛盾 + 改进假说 | 假说可验证 |
| 实践 | 改进结果 vs 指标 | 开始前写明的指标达到 |
| 批评 | 审视报告 | 报告完成 |

整体终止：反馈显示无新的重要问题，或用户确认。

## 模式 4：阶段复盘

`criticism-self-criticism` → `contradiction-analysis` → `protracted-strategy`（或 `overall-planning`）

| 步 | 交接物 | 终止条件 |
|---|---|---|
| 批评 | 审视报告：完成情况 / 问题 / 根因 | 报告完成 |
| 矛盾 | 下一阶段的主要矛盾 | 主要矛盾唯一 |
| 持久 / 统筹 | 新阶段定位与核心任务，或重新平衡的方案 | 有下一阶段核心任务 |

## 中断处理

- 信息不足 → 插入一次 `investigation-first`
- 假说被证伪 → 回到 `contradiction-analysis`
- 冒出更重要的矛盾 → `overall-planning` 评估是否调整整个模式
- 循环超出开始前声明的轮数 → 停下，向用户汇报现状
