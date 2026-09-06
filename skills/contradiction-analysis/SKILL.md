---
name: contradiction-analysis
description: |
  矛盾分析法：把复杂问题拆成若干对立面，找出规定其他矛盾的主要矛盾及其主要方面，判定对抗性 / 非对抗性，并据此选择处理方式。当问题头绪多、多个因素互相牵制、优先级不清、根因不明、反复修不好、trade-off 说不清时触发；直接执行类任务或用户已定方案时不触发。
  English: Contradiction analysis. Decompose a tangled problem into opposing forces, isolate the principal contradiction and its dominant side, classify it as antagonistic or non-antagonistic, and choose the response accordingly. Trigger on unclear priorities, unknown root causes, recurring failures, or trade-offs that resist explanation; skip for direct execution or when the user has already chosen the solution.
---

# 矛盾分析法

> "研究任何过程，如果是存在着两个以上矛盾的复杂过程的话，就要用全力找出它的主要矛盾。捉住了这个主要矛盾，一切问题就迎刃而解了。" —— 《矛盾论》

## 用 / 不用

用：
- 问题复杂，不知从哪下手
- 多个问题互相牵制，解决一个牵动另一个
- 反复出现的故障、反复失败的尝试，怀疑没打中根源
- 需要在多个"都重要"的事里判断哪个最重要

不用：
- 任务是单维度的直接执行
- 用户已经指定方案，只需实现
- 问题属于已知模式，直接套用已验证方案更快

## 操作规程

先保证事实基础：矛盾清单里的每一项都要能指向调查得到的现象，不能凭印象。事实不够先做 `investigation-first`。

1. **列矛盾清单**：`[A] vs [B]` 格式，写清两个对立面各自要什么。透过现象看内在张力，不只列表面症状。
2. **判定主要矛盾**：标 ⭐ 并给理由。三个检验：
   - 因果：解决了它，别的矛盾是否随之缓解？
   - 根源：它是不是别的矛盾的来源？
   - 阶段：它是否处于当前阶段的中心？
3. **找主要方面**：主要矛盾内部，哪一方当前占支配地位？这决定问题现在的性质。
4. **定性质**：
   - 对抗性（根本利益冲突，不能兼得）→ 明确取舍，果断二选一
   - 非对抗性（共同目标下的分歧）→ 团结—批评—团结：先找共同点，再通过讨论解决分歧
5. **选处理方向**，写出「接下来我将……」：
   - 技术性矛盾 → 形成假说，交 `practice-cognition` 验证
   - 资源性矛盾 → `concentrate-forces` 集中解决主要矛盾
   - 多目标平衡 → `overall-planning`
6. **设监控提示**：哪个次要矛盾可能上升为主要矛盾？哪个非对抗性矛盾可能因处理不当激化？

## 输出模板

```
矛盾清单：
- [A] vs [B]：……
- ⭐ [C] vs [D]：主要矛盾。理由：解决了它，[X]、[Y] 随之缓解
  - 主要方面：当前 [C / D] 占支配地位，因为 ……
  - 性质：对抗性 / 非对抗性
接下来我将：……
⚠️ 需监控：[次要矛盾] 是否上升为主要矛盾；[矛盾] 是否激化
```

## 纪律

- 禁止只输出分析文字不给结论；六项缺一不可。
- 禁止一刀切：对具体的事物作具体的分析，不套模板。
- 主要矛盾只能有一个。列出两个"都是主要"的，说明分析还没做完。
- 矛盾会转化：解决过程中主次可能对调，随时更新。

## 交接

- 主要矛盾确定 → `concentrate-forces` 集中解决，或 `practice-cognition` 验证假说
- 处理对抗性矛盾前需要更多事实 → `investigation-first`

> 原著依据：[original-texts.md](original-texts.md)；场景速查：[contradiction-types-reference.md](contradiction-types-reference.md)
