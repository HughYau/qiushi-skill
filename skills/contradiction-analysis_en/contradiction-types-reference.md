---
name: contradiction-types-reference
description: Contradiction types quick reference — mapping abstract contradiction categories to concrete examples in software engineering and general scenarios
---

# Contradiction Types Quick Reference

Maps the abstract categories from "On Contradiction"《矛盾论》to real-world work scenarios, helping you quickly identify and characterize contradictions.

## Classification by Nature

### Antagonistic Contradictions (Fundamental conflicts, irreconcilable, requiring a clear choice)

| Scenario | Aspect A | Aspect B | Resolution Approach |
|----------|----------|----------|-------------------|
| Technology selection | Option A (mutually exclusive architecture) | Option B (mutually exclusive architecture) | Make a decisive choice; do not compromise |
| Security vulnerability | Fix the vulnerability | Maintain the status quo | Security first; no compromise allowed |
| Data consistency | Strong consistency | Eventual consistency | Choose one based on business requirements |
| Breaking changes | Push forward with refactoring | Maintain backward compatibility | Make explicit trade-offs; set a migration period |

### Non-Antagonistic Contradictions (Divergence under a shared goal, reconcilable)

| Scenario | Aspect A | Aspect B | Resolution Approach |
|----------|----------|----------|-------------------|
| Speed vs. Quality | Rapid delivery | Thorough testing | Rigorous testing on the critical path; fast iteration elsewhere |
| Tech debt vs. Features | Pay down tech debt | Develop new features | Allocate a proportion in each iteration |
| Performance vs. Readability | Extreme optimization | Clear code | Optimize hot paths; prioritize readability elsewhere |
| Build vs. Buy | Build in-house | Use third-party libraries | Build core capabilities in-house; adopt external solutions for supporting needs |

## Classification by Position

### Three Criteria for Identifying the Principal Contradiction

1. **Causation test**: If it is resolved, do other contradictions ease as a result?
2. **Root cause test**: Is it the root cause from which other contradictions originate?
3. **Stage test**: Does it occupy the central position in the current phase?

### Common Patterns for Identifying Principal vs. Secondary Contradictions

| Surface Problem (Secondary Contradiction) | Root Problem (Principal Contradiction) |
|------------------------------------------|---------------------------------------|
| Frequent production incidents | Lack of an automated testing framework |
| Low development efficiency | Excessively coupled architecture |
| Team collaboration conflicts | Unclear responsibility boundaries |
| Frequent requirement changes | Missing requirement confirmation process |
| High deployment failure rate | Incomplete CI/CD pipeline |

## Common Signals of Contradiction Transformation

| Signal | Possible Transformation |
|--------|------------------------|
| Shelved tech debt begins causing frequent incidents | Secondary → Principal |
| Non-antagonistic disagreement over approaches escalates into team opposition | Non-antagonistic → Antagonistic |
| A former performance bottleneck is temporarily resolved through scaling | Principal → Secondary (temporary) |
| An external dependency undergoes a major change | A new contradiction may rise to principal status |
