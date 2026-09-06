---
name: practice-cognition
description: |
  实践认识论：把方案、假说或判断放回实践中检验，按「实践 → 认识 → 再实践」螺旋迭代，并在开始前写明循环终止条件。当你提出了假说要验证、一次尝试失败要复盘再来、发现自己只想不做或只做不想时触发；一次性输出、答案可直接查阅、还没形成假说（先调查）时不触发。
  English: Practice-cognition loop. Test a hypothesis or plan in practice, learn from the result, and iterate in a rising spiral with an explicit stop condition. Trigger when a plan needs validation, an attempt failed and must be retried, or you notice thinking without doing (or doing without thinking); skip for one-shot outputs, lookup questions, or before any hypothesis exists.
---

# 实践认识论

> "实践、认识、再实践、再认识，这种形式，循环往复以至无穷，而实践和认识之每一循环的内容，都比较地进到了高一级的程度。这就是辩证唯物论的全部认识论，这就是辩证唯物论的知行统一观。" —— 《实践论》

## 用 / 不用

用：
- 提出了方案或假说，需要验证其正确性
- 上一轮尝试失败，需要总结后进入下一轮
- 只在"想"没有在"做"（教条主义），或只在"做"没有在"想"（经验主义）
- 需要判定方案是否可行，却没有实践证据

不用：
- 一次性输出（写封邮件），无需迭代
- 答案可以直接查阅（文档、API 参考）
- 还没有假说 → 先 `investigation-first`

## 操作规程

进入时先声明所处阶段，并写出终止条件；每轮按四步走。

**0. 终止条件（开始前必须写）**：「当 [具体可观测条件] 时，本轮循环完成；最多 [N] 轮，超过则停下向用户汇报。」

1. **感性认识**：直接接触对象。读代码、跑程序、看输出，记录具体事实，不急于下结论。
2. **理性认识**：从材料中提炼规律，写成可证伪的假说：「我的假说是：……。如果成立，应能观察到 ……；如果不成立，会看到 ……。」
3. **实践验证**：执行验证动作（运行、测试、对比），如实记录观察结果 vs 预期。
4. **评估与升华**：
   - 成立 → 写「本轮学到：……」，进入更高一轮或终止
   - 不成立 → 认识有误，修正假说回到第 1 步；不解释成偶然
   - 部分成立 → 说清哪部分成立、哪部分要修

## 输出模板

```
我目前处于：感性认识 / 理性认识 / 实践验证 / 总结升华
终止条件：当 …… 时完成；最多 N 轮

假说：……
预期：成立则 ……；不成立则 ……
验证动作：……
观察结果：……
判定：成立 / 不成立 / 部分成立
本轮学到：……；下一轮将：……
```

## 纪律

- 禁止把"感觉对""理论上应该对"当作验证通过。
- 禁止未验证就实现假说的下游内容。
- 禁止因喜欢某方案把失败解释成偶然，也禁止因一次碰壁否定全部经验。
- 不写终止条件不得开始循环。

## 交接

- 每轮结束的总结就是自我批评；整体完成后 → `criticism-self-criticism`
- 验证中暴露出多头矛盾 → `contradiction-analysis`
- 需要从真实使用者获取反馈 → `mass-line`

> 原著依据：[original-texts.md](original-texts.md)
