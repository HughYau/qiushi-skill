---
name: contradiction-analysis
description: |
  Trigger when a problem contains competing forces, unclear priorities, or no obvious entry point. Use this skill to identify contradictions, isolate the principal contradiction, classify its nature, and choose the right response.
---

# Contradiction Analysis

> "In studying any complex process in which there are two or more contradictions, we must devote every effort to finding its principal contradiction. Once this principal contradiction is grasped, all problems can be readily solved."
> — Mao Zedong, "On Contradiction"《矛盾论》(1937)

## Core Principle

**Everything contains contradictions. The method of analyzing any problem is to identify the contradictions within it, distinguish the principal contradiction from secondary ones, and then concentrate your efforts on resolving the principal contradiction.**

> For detailed textual references, see original-texts.md

## When NOT to Use

**This skill is not needed in the following situations:**
- The task is a straightforward execution (e.g., "format this code for me") — there is no contradiction to analyze
- The user has already specified a solution and only needs implementation — the contradiction has been resolved by the user
- The problem has only one dimension with no opposing sides (e.g., "what does this function do?")
- Time is urgent and the problem matches a known pattern — apply the proven solution directly

## When to Use

You should invoke this skill when:

- Facing a complex problem and unsure where to start
- The problem contains multiple opposing or conflicting forces
- You need to determine which among several problems is the most important and urgent
- You are trying to solve one problem but keep being disrupted by others
- Analyzing the essence and direction of development of something
- Dealing with internal or external conflicts within a team or system

## Method Workflow

### Step 1: Identify All Contradictions

> "The fundamental cause of the development of a thing is not external but internal; it lies in the contradictory nature of the thing itself." — "On Contradiction"《矛盾论》

List all opposing, mutually constraining factors in the current situation. A contradiction is the unity and struggle of opposites within a thing.

**Notes:**
- Do not look only at surface phenomena — analyze the underlying tensions
- For each pair of contradictions, clearly identify what the two opposing sides are
- Contradictions are not necessarily "bad" — they are the driving force of development

### Step 2: Determine the Principal Contradiction

> "Once this principal contradiction is grasped, all problems can be readily solved." — "On Contradiction"《矛盾论》

Among all identified contradictions, find the one that **governs or influences the others** — the principal contradiction. Criteria:
- If resolved, would the other contradictions ease as a result?
- Is it the root cause that gives rise to the other contradictions?
- Does it occupy the central position at the current stage?

### Step 3: Analyze the Principal Aspect of the Contradiction

> "Of the two aspects of a contradiction, one must be principal and the other secondary. The principal aspect is the one playing the leading role. The nature of a thing is determined mainly by the principal aspect of the dominant contradiction." — "On Contradiction"《矛盾论》

Within the principal contradiction, determine which side holds the dominant position — this determines the current nature and direction of development.

### Step 4: Classify the Nature of the Contradiction

> "Contradictions of different natures can only be resolved by different methods." — "On Contradiction"《矛盾论》

Determine whether the contradiction is antagonistic or non-antagonistic:

**Antagonistic contradictions** (fundamental conflicts of interest):
- Require a clear stance and decisive action
- Cannot be reconciled — one side must be chosen

**Non-antagonistic contradictions** (disagreements within shared interests):
- Use the method of "unity — criticism — unity"
- Start from a desire for unity, resolve disagreements through discussion and criticism, and arrive at a new unity

### Step 5: Choose the Resolution Method

Based on the nature of the contradiction, select the corresponding approach:

- Antagonistic contradiction → Decisive action, clear trade-offs
- Non-antagonistic contradiction → Democratic discussion, persuasion, seeking common ground while reserving differences
- Technical contradiction → Investigation and research (invoke `investigation-first`), practical verification (invoke `practice-cognition`)
- Resource contradiction → Concentrate forces on the principal contradiction (invoke `concentrate-forces`)
- Multi-dimensional balancing contradiction → Overall planning (invoke `overall-planning`)

### Step 6: Monitor Contradiction Transformation

> "The principal and non-principal aspects of a contradiction transform into each other and the nature of the thing changes accordingly. At a certain stage of development or in a certain process, the principal aspect is on one side; at another stage or in another process, the roles are reversed." — "On Contradiction"《矛盾论》

Throughout the problem-solving process, continuously monitor:
- Has the principal contradiction shifted? Has a formerly secondary contradiction risen to become the principal one?
- Has the principal aspect of the contradiction changed?
- Has a non-antagonistic contradiction transformed into an antagonistic one due to mishandling?

## Common Mistakes

| Mistake | Mao's Critique | Correct Approach |
|---|---|---|
| Acting without contradiction analysis | "The metaphysical worldview... sees things in isolation, statically, and one-sidedly" | Analyze first, act second |
| Applying a one-size-fits-all approach | "Make a concrete analysis of concrete conditions" | Every contradiction has its particularity — do not apply templates |
| Failing to grasp the principal contradiction | "If one does not attend to the interconnections of the whole and of the various aspects of a contradiction... one cannot find the method for resolving it" | See the big picture, seize the key link |
| Ignoring contradiction transformation | "Under certain conditions, each transforms into its opposite" | Monitor continuously, adjust dynamically |
| Treating non-antagonistic contradictions as antagonistic | Inappropriate methods will intensify the contradiction | Classify the nature first, then choose the method |

## Operating Procedure

When this skill is triggered, execute the following steps and **output a structured contradiction analysis table**:

1. **List all contradictions**: Use a bullet list to enumerate all identifiable oppositions in the current situation, in the format `[A] vs [B]`
2. **Determine the principal contradiction**: Mark one contradiction as `⭐ Principal Contradiction` and state the rationale in one sentence ("Resolving this will ease contradictions [X] and [Y]")
3. **Classify the nature**: Label the principal contradiction as: `Antagonistic` (fundamental conflict of interest, must choose) or `Non-antagonistic` (disagreement within shared interests, negotiable)
4. **Choose the response method**: Based on the classification, select the corresponding method from Step 5 of the workflow above, and explicitly state "Next I will…"
5. **Set a monitoring alert**: Add a line at the end of the analysis: "⚠️ Monitor: whether [secondary contradiction X] rises to become the principal contradiction"

**The output must include all 5 items above. Do not output only analytical prose without conclusions.**

## Relationship to Other Skills

- **Practice–Cognition Theory**: Conclusions derived from contradiction analysis must be verified in practice
- **Investigation First**: Thorough investigation is the prerequisite for identifying contradictions
- **Concentrate Forces**: After grasping the principal contradiction, concentrate your efforts to resolve it
- **Overall Planning**: When multiple contradictions all require attention, overall planning is needed
- **Criticism and Self-Criticism**: Contradiction analysis also applies to reviewing your own work
