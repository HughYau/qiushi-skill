---
name: investigation-first
description: |
  调查研究：在下判断、做决策、给建议之前，先用第一手材料弄清现状，产出「事实 / 推断 / 未知」三栏调查结论。当上下文不完整、证据薄弱、领域陌生、用户说"先别动手"、或你发现自己在凭印象作答时触发；已充分调查后的执行阶段不要重复触发。
  English: Investigate before judging. Gather firsthand facts and produce a fact / inference / unknown ledger before any recommendation. Trigger when context is incomplete, evidence is thin, the domain is unfamiliar, the user says "look first", or you notice yourself answering from impression; skip when investigation is already done and the task is pure execution.
---

# 调查研究

> "没有调查，没有发言权。" —— 《反对本本主义》

调查研究是落实「实事求是」的入口：不是为既定结论找材料，而是让事实规定判断。

## 用 / 不用

用：
- 要做决策，但对实际情况了解不够
- 面对陌生的代码库、系统或领域
- 别人的方案听起来合理，但你不清楚其适用条件
- 发现自己在用"应该是""一般来说"作答

不用：
- 已经调查过，现在是执行阶段
- 用户已提供完整上下文和决策依据
- 答案可以直接跑一下验证，跑比查快

## 操作规程

1. **一句话写出调查目的**：「我要弄清楚的是：……」。没有目的的调查是漫游。
2. **列调查提纲**（checkbox），覆盖四个面：
   - 现状：现在是什么样（读源码、配置、数据，不只看文档）
   - 历史：为什么变成这样（git log、blame、变更记录）
   - 关联：牵涉哪些约束（接口、依赖、调用方、部署环境）
   - 多方：有哪些不同说法（文档 vs 代码 vs 运行结果 vs 用户描述）
3. **亲自接触第一手材料**：直接读、直接跑、直接看日志。二手总结只能作线索，不能作证据。
4. **边查边记，分三栏**：每条发现标注来源；把"看到的"和"推出来的"分开。
5. **输出调查结论**（模板见下）。结论必须先于任何行动方案；不得边查边给方案。
6. 事实与预期不符时，改判断，不改事实。查不清的，诚实写"未知"。

## 输出模板

```
调查目的：……
调查范围：读了 …… / 跑了 …… / 问了 ……

已核实的事实（附来源）：
- ……（来源：文件:行 / 命令输出 / 日志）
合理推断（说明推理链）：
- ……（因为 …… 所以 ……）
未知 / 存疑：
- ……（需要 …… 才能确认）

调查结论：
- 现状是：……
- 关键约束是：……
- 我原来不知道、现在知道的是：……
- 基于以上，我的判断是：……（置信度：高 / 中 / 低）
```

## 纪律

- 禁止在"未知"栏非空且关系到结论时下定论：要么补查，要么把不确定性写进结论。
- 禁止走马观花：只看目录结构和 README 就总结的，不算调查。
- 调查有预算：先写提纲，按提纲查完即止；发现新的大问题时另开一轮，而不是无限扩张。

## 交接

- 调查揭示多头矛盾、抓不住重点 → `contradiction-analysis`
- 结论已形成、需要验证 → `practice-cognition`
- 范围大、可分头查 → 派遣 `investigator` 子 agent 并行调查，主线只汇总三栏

> 原著依据：[original-texts.md](original-texts.md)
