---
name: review-checklist
description: Structured self-review checklist — systematically audit completed work across four dimensions: completeness, correctness, methodology, and quality
---

# Work Review Checklist

Use in conjunction with the `criticism-self-criticism` skill and the `self-critic` agent. Go through each item after completing a phase of work.

## I. Completeness Check

- [ ] Have all originally planned objectives been achieved?
- [ ] Are there any missed requirements or subtasks?
- [ ] Have edge cases and exception paths been handled?
- [ ] Have related documentation/comments been updated accordingly?
- [ ] Is there anything that was "skipped for now, to be addressed later" but never actually addressed?

## II. Correctness Check

- [ ] Has the core logic been verified (via tests/execution/manual inspection)?
- [ ] Do the changes introduce any new issues? (Regression risk)
- [ ] Are the assumptions and preconditions still valid?
- [ ] Are data flows and state transitions correct?
- [ ] Have concurrency/race conditions been considered? (If applicable)

## III. Methodology Check

- [ ] Was thorough investigation conducted before taking action? (`investigation-first`)
- [ ] Was the principal contradiction identified? (`contradiction-analysis`)
- [ ] Was the solution validated through practice? (`practice-cognition`)
- [ ] Were opinions from relevant stakeholders gathered? (`mass-line`)
- [ ] Were resources concentrated on the most important issue? (`concentrate-forces`)
- [ ] Were multiple objectives properly balanced? (`overall-planning`)

## IV. Quality Check

- [ ] Is the code/solution clear and readable?
- [ ] Is there any unnecessary complexity?
- [ ] Are there any areas handled in a "good enough" or perfunctory manner?
- [ ] Are there any known issues that were consciously ignored?
- [ ] If you could start over, where would you make different choices?

## How to Use

1. After completing a piece of work, go through each item
2. For items that do not pass, assess severity:
   - **Must fix** (Antagonistic contradiction): Blocks goal achievement or introduces significant risk
   - **Should fix** (Non-antagonistic contradiction): Affects quality but is not fatal
   - **Suggested improvement** (Development suggestion): Could be done better
3. For "Must fix" items, correct them immediately
4. For "Should fix" items, create a remediation plan
5. Record patterns discovered during this review as focus areas for the next round of work
