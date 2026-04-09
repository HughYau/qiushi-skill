---
name: workflows
description: |
  Trigger when a task clearly requires multiple skills in sequence. Use this skill to select a standard workflow that chains skills together, defines data handoff between steps, and specifies termination conditions.
---

# Workflow Combinations

> "Policy and tactics are the life of the Party. Leading comrades at all levels must give them full attention and must never on any account be negligent."
> — Mao Zedong

The power of methodology lies not in using any single intellectual weapon alone, but in **combining them in the correct sequence at the correct time**. This skill provides three standardized workflows that define skill invocation order, data handoff formats between steps, and termination conditions.

---

## Workflow 1: New Project Launch

**Applicable scenario:** Starting from zero on a new task, project, or domain. The goal is known but the path is unknown. Resources are limited.

**Trigger signals:** New project, new domain, MVP, starting from scratch, no idea where to begin

### Workflow

```
investigation-first → contradiction-analysis → spark-prairie-fire → protracted-strategy
   Investigation    →  Contradiction Analysis →  Spark Prairie Fire → Protracted Strategy
```

### Step-by-Step Details

**Step 1: investigation-first (Investigation First)**
- Objective: Understand the current situation; obtain first-hand information
- Output format (passed to Step 2):
  ```
  Investigation conclusions:
  - Current situation: ...
  - Key constraints: ...
  - Major unknowns: ...
  - Known foundations to build upon: ...
  ```
- Termination condition: Able to answer the question "What is the current situation?"

**Step 2: contradiction-analysis (Contradiction Analysis)**
- Input: Investigation conclusions from Step 1
- Objective: From the investigation materials, identify the principal contradiction and find the most worthwhile breakthrough point
- Output format (passed to Step 3):
  ```
  Principal contradiction: [A] vs [B]
  Nature of contradiction: [Antagonistic / Non-antagonistic]
  Most worthwhile breakthrough point: ...
  Reason: Resolving it will alleviate problems [X] and [Y]
  ```
- Termination condition: A clear principal contradiction and breakthrough point have been identified

**Step 3: spark-prairie-fire (A Single Spark Can Start a Prairie Fire)**
- Input: Breakthrough point identified in Step 2
- Objective: Using the breakthrough point as a base area, formulate a development roadmap from small to large
- Output format (passed to Step 4):
  ```
  Base area: [Specific entry point]
  Development roadmap:
    Step 1: [Specific action] → Success signal: ...
    Step 2: [Specific action] → Success signal: ...
    Step 3: [Specific action] → Success signal: ...
  ```
- Termination condition: A clear development roadmap exists, starting from current capabilities

**Step 4: protracted-strategy (Protracted Strategy)**
- Input: Development roadmap from Step 3
- Objective: Incorporate the development roadmap into a phased strategic framework; determine the current phase and set phase-transition conditions
- Output format:
  ```
  Current phase: Strategic Defense Period
  Core task for this phase: [Step 3, Step 1]
  Condition to enter the Stalemate Period: When [specific milestone] is achieved
  ```
- Termination condition: Clear phase positioning and transition conditions exist

---

## Workflow 2: Complex Problem Assault

**Applicable scenario:** Facing a known but hard-to-solve specific problem. Problem boundaries are clear, but the root cause is unknown or the solution path is unclear.

**Trigger signals:** Difficult bug, architectural bottleneck, repeatedly failed attempts, problem with unknown root cause

### Workflow

```
investigation-first → contradiction-analysis → concentrate-forces → practice-cognition → criticism-self-criticism
   Investigation    →  Contradiction Analysis → Concentrate Forces → Practice-Cognition →  Criticism & Self-Criticism
```

### Step-by-Step Details

**Step 1: investigation-first (Investigation First)**
- Objective: Understand the true nature of the problem (not just its symptoms)
- Output (passed to Step 2):
  ```
  Investigation conclusions:
  - Observed symptoms: ...
  - Conditions under which the problem occurs: ...
  - Causes already ruled out: ...
  - Directions not yet investigated: ...
  ```
- Termination condition: Able to precisely describe the problem (rather than "it seems like X went wrong")

**Step 2: contradiction-analysis (Contradiction Analysis)**
- Input: Investigation conclusions from Step 1
- Objective: Find the principal contradiction (fundamental conflict point) within the problem
- Output (passed to Step 3):
  ```
  Principal contradiction: [Fundamental conflict point]
  My hypothesis: This conflict caused ..., because ...
  Verification method: If the hypothesis is correct, we should observe ...
  ```
- Termination condition: A verifiable hypothesis exists

**Step 3: concentrate-forces (Concentrate Forces)**
- Input: Hypothesis and verification method from Step 2
- Objective: Concentrate all forces on verifying this hypothesis; refuse distractions
- Output (passed to Step 4):
  ```
  🎯 Main attack objective: Verify hypothesis "[hypothesis content]"
  Verification method: [Specific verification steps]
  Completion signal: [Hypothesis confirmed or refuted]
  Deferred directions: ...
  ```
- Termination condition: Hypothesis has been verified (confirmation or refutation both count)

**Step 4: practice-cognition (Practice-Cognition)**
- Input: Verification results from Step 3
- Objective: Based on verification results, update understanding and enter the next cycle (if hypothesis was refuted, return to Step 2)
- Cycle termination condition: Problem is thoroughly resolved (cause and solution can be clearly described)

**Step 5: criticism-self-criticism (Criticism and Self-Criticism)**
- Input: The entire assault process
- Objective: Review methodological errors during the assault to prevent the same types of mistakes in the future
- Required output: Structured work review report

---

## Workflow 3: Iterative Solution Optimization

**Applicable scenario:** A baseline solution already exists and needs quality improvement through collecting feedback, analyzing problems, and iterating.

**Trigger signals:** Iterative optimization, user feedback, post-code-review improvement, solution performance below expectations

### Workflow

```
mass-line → contradiction-analysis → practice-cognition → criticism-self-criticism → mass-line (cycle)
Mass Line →  Contradiction Analysis → Practice-Cognition →  Criticism & Self-Criticism → Mass Line (next round)
```

### Step-by-Step Details

**Step 1: mass-line (Mass Line)**
- Objective: Collect feedback on the existing solution from multiple information sources
- Information source checklist (select based on the specific situation):
  - Explicit user feedback
  - Test results / runtime results
  - Code review comments
  - Performance data / metrics
  - Insights from related patterns in the codebase
- Output (passed to Step 2):
  ```
  Multi-source feedback collected:
  - [Source 1]: ...
  - [Source 2]: ...
  Contradictions among sources: ...
  Issues commonly pointed to: ...
  ```
- Termination condition: Feedback from at least 2 information sources has been collected

**Step 2: contradiction-analysis (Contradiction Analysis)**
- Input: Multi-source feedback from Step 1
- Objective: From the feedback, identify the principal contradiction that needs to be resolved first
- Output (passed to Step 3):
  ```
  Principal contradiction for this iteration: [Core problem of the current solution]
  Improvement hypothesis: If ..., then ...
  Verification method: ...
  ```

**Step 3: practice-cognition (Practice-Cognition)**
- Input: Improvement hypothesis from Step 2
- Objective: Implement the improvement and verify the effect
- Cycle termination condition (state explicitly before beginning): When [specific metric] reaches [specific value/state], this iteration is complete

**Step 4: criticism-self-criticism (Criticism and Self-Criticism)**
- Objective: Review the process quality of this iteration
- Required output: Work review report

**Step 5: mass-line (Next Round)**
- Based on this round's improvement results, re-collect feedback and begin a new iteration cycle

**Overall cycle termination condition:** When the mass-line multi-source feedback indicates "no significant new problems" or the user confirms satisfaction, exit the cycle.

---

## Workflow Selection Guide

| Your Situation | Recommended Workflow |
|---------------|---------------------|
| Facing a brand-new project or task with no idea where to start | Workflow 1: New Project Launch |
| A specific difficult problem exists; need to find root cause and resolve | Workflow 2: Complex Problem Assault |
| A solution exists but performance is unsatisfactory; iteration needed | Workflow 3: Iterative Solution Optimization |
| None of the above fully applies | Return to the `arming-thought` dispatch table and invoke the most matching skill individually |

## Data Handoff Rules

In a workflow, **the output of each step must be explicitly passed to the next step**. Specifically:

1. At the end of each step, write out the formatted "information to pass to the next step"
2. At the beginning of the next step, confirm receipt and reference the previous step's output
3. Steps must not be skipped (e.g., do not skip `contradiction-analysis` and go directly to `concentrate-forces`)

## Workflow Interruption Handling

If a blockage is encountered during workflow execution:
- **Insufficient information** → Insert a round of `investigation-first` to supplement information, then continue
- **Hypothesis refuted** → Return to `contradiction-analysis` and re-analyze
- **A new, more important contradiction is discovered** → Use `overall-planning` to assess whether the workflow needs adjustment
