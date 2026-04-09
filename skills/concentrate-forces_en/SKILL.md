---
name: concentrate-forces
description: |
  Trigger when limited resources are being split across too many tasks and one main target must be chosen. Use this skill to concentrate effort, sequence work decisively, and finish a meaningful breakthrough before expanding.
---

# Concentrate Forces

> "For us, it is better to cut off one finger than to injure ten; for the enemy, it is better to annihilate one division than to rout ten."
> — Mao Zedong, "Problems of Strategy in China's Revolutionary War"《中国革命战争的战略问题》(1936)

## Core Principle

**When resources are limited, do not scatter your forces across multiple problems. Instead, concentrate overwhelming force on the principal contradiction, resolve it thoroughly, and only then move on to the next. Fight no battle unprepared; fight no battle you are not sure of winning.**

> See original-texts.md for detailed source references.

## When NOT to Use

**This skill is unnecessary in the following situations:**
- There is only one task at hand — no competition for resources exists
- The user explicitly requests parallel progress on multiple tasks (user directives take priority)
- Tasks are independently parallelizable with zero resource contention (e.g., independent edits to separate files)
- You are already executing the chosen main attack objective and no re-prioritization is needed

## When to Use

Invoke this skill when:

- Multiple tasks or problems demand attention simultaneously
- Resources (time, energy, attention) are limited and cannot cover everything at once
- You are pushing forward on many things at once but doing none of them well
- You need to decide what to do first and what to defer
- Facing a large problem, you must decide where to break through first

## Method Workflow

### Step 1: List All Outstanding Problems

> "First attack the dispersed and isolated enemy; later attack the concentrated and powerful enemy." — "Ten Major Military Principles"《十大军事原则》

Conduct a comprehensive inventory of all current tasks and problems:
- List the scale and difficulty of each problem
- Assess the urgency of each problem
- Determine whether dependencies exist among them

### Step 2: Identify the Principal Contradiction Through Contradiction Analysis

Invoke `contradiction-analysis`:
- Among all problems, find the principal contradiction — the key problem whose resolution will drive progress on the others
- Distinguish principal from secondary contradictions
- Determine priorities

### Step 3: Choose the Point of Breakthrough

> "First attack the dispersed and isolated enemy; later attack the concentrated and powerful enemy."
> "First take small and medium cities and the vast countryside; later take the big cities." — "Ten Major Military Principles"《十大军事原则》

Principles for choosing the breakthrough point:
1. **Easy before hard** — Solve problems you are confident about first; accumulate momentum and resources
2. **Isolated before strong** — Solve isolated problems that are not reinforced by other problems first
3. **Key before peripheral** — If one problem is the root cause of others, prioritize it
4. **Prepared before committed** — Ensure you have sufficient understanding and preparation for the selected problem

### Step 4: Concentrate All Forces and Resolve Thoroughly

> "In every battle, concentrate an absolutely superior force... strive to annihilate the enemy completely; do not let any escape the net." — "Ten Major Military Principles"《十大军事原则》

Concentrate forces on the selected problem:
- **No distractions** — While resolving the current problem, set aside all other problems temporarily
- **Pursue thoroughness** — "It is better to cut off one finger than to injure ten." Resolve it completely, not halfway
- **Pursue speed** — On local problems, seek swift resolution; do not drag things out
- **Verify completion** — Confirm the problem is truly and thoroughly resolved with no loose ends

### Step 5: Turn to the Next Objective

> "Make good use of the intervals between campaigns to rest and consolidate the troops." — "Ten Major Military Principles"《十大军事原则》

After one problem is thoroughly resolved:
- Briefly summarize lessons learned (invoke `criticism-self-criticism`)
- Assess whether remaining problems have changed as a result of the first problem's resolution
- Re-determine the next objective
- Concentrate forces to resolve the next problem

### Step 6: Fight No Battle Unprepared

> "Fight no battle unprepared; fight no battle you are not sure of winning." — Mao Zedong

Before starting to resolve each problem, check:
- Have you fully understood the problem? (`investigation-first`)
- Do you have sufficient resources and capability?
- Do you have a feasible solution?
- If preparation is insufficient — investigate and research first, rather than acting rashly

## The Ten Military Principles Applied to General Scenarios

| Military Principle | General Scenario Mapping |
|-------------------|------------------------|
| Attack the weak before the strong | Solve tasks you are confident about first; build momentum |
| Take small cities before big cities | Secure small wins first, then tackle major objectives |
| Aim to annihilate the enemy's effective strength | Pursue thorough resolution of problems, not temporary workarounds |
| Concentrate absolutely superior forces | Focus on only one core problem at a time |
| Fight no battle unprepared | Act only when fully prepared |
| Maintain a continuous fighting style | After finishing one, immediately turn to the next; maintain momentum |
| Rest and consolidate between campaigns | Conduct periodic reviews and adjustments |

## Common Mistakes

| Mistake | Mao Zedong's Critique | Correct Approach |
|---------|----------------------|-----------------|
| Working on many things simultaneously | Dispersed forces inevitably lose | Concentrate forces on one problem |
| Abandoning a half-solved problem | "It is better to annihilate one division than to rout ten" | Resolve thoroughly before moving on |
| Tackling the hardest problem first | "First attack the dispersed and isolated enemy" | Easy before hard; accumulate advantage |
| Starting without sufficient preparation | "Fight no battle unprepared" | Investigate and research before acting |
| Continuous operations without review | "Make use of intervals to rest and consolidate" | Briefly review after each battle |

## Operating Procedure

When this skill is triggered, **output a task priority matrix and declare the main attack objective**:

1. **List all pending tasks** (using the TodoWrite tool), tagging each with:
   - Impact scope: High (affects core functionality) / Medium / Low (affects only peripheral details)
   - Resolution difficulty: High / Medium / Low
   - Dependencies: Whether other tasks depend on it (Yes/No)

2. **Select the main attack objective** (only one at a time), priority criteria:
   - First choice: "High impact + depended upon by other tasks" (unblocks bottlenecks; highest value)
   - Second choice: "High impact + medium difficulty" (best cost-effectiveness)
   - Last choice: "Low difficulty" (builds momentum, but impact scope is not high)

3. **Declare and lock in**, format:
   ```
   🎯 Current Main Attack Objective: [Task Name]
   Reason: [One sentence explaining why this task is prioritized]
   Completion Signal: [Under what conditions this task is considered done]

   Deferred Tasks (to be handled after the main objective is complete):
   - [Task B]: [Why deferred]
   - [Task C]: [Why deferred]
   ```

4. **Rules during execution**:
   - When the user raises a new request mid-execution, first determine: "Does this fall within the scope of the current main attack objective?"
     - Yes → Incorporate it into the current task
     - No → Log it to Todo, stating "Currently focused on [X]; [new request] will be handled immediately after completion"
   - Only turn to the next objective after the main attack objective is completed and verified

## Relationships with Other Skills

- **Contradiction Analysis**: Identifying the principal contradiction is identifying the direction for concentrating forces
- **Investigation First**: The prerequisite for "fight no battle unprepared" is investigation and research
- **Protracted Strategy**: Within each phase of the protracted strategy, use the concentrate-forces principle to resolve specific problems
- **Spark Can Start a Prairie Fire**: Establishing a base area itself requires concentrating forces
- **Criticism and Self-Criticism**: The review between campaigns is self-criticism
