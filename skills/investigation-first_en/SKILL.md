---
name: investigation-first
description: |
  Trigger before making claims or decisions when context is incomplete, evidence is weak, or the domain is unfamiliar. Use this skill to investigate first, gather firsthand facts, and let reality shape the conclusion.
---

# Investigation First

> "No investigation, no right to speak."
> — Mao Zedong, "Oppose Book Worship"《反对本本主义》(1930)

## Core Principle

**All correct decisions originate from the investigation and study of actual conditions. Without investigation there is no right to speak, and without proper investigation there is equally no right to speak.**

Within this project's methodological system, `investigation-first` is the primary entry point for putting `Seek Truth from Facts` into action. Investigation is not about gathering material for a predetermined conclusion — it is about letting the facts dictate the judgment and letting reality correct the theory.

> For detailed textual references, see original-texts.md

## When NOT to Use

**This skill is not needed in the following situations:**
- The current task is in the execution phase after thorough investigation has already been done — do not re-investigate
- The user has already provided complete context and a decision basis
- The issue is a technical implementation detail whose answer can be directly verified (run the code and see the result)
- An urgent fix is needed and the problem symptoms are already clear — locate and fix directly; investigating would waste time

## When to Use

You should invoke this skill when:

- You need to make a decision but do not know enough about the actual situation
- You are entering an unfamiliar domain or facing a new problem
- You find yourself making judgments based on "intuition" or "experience" without factual evidence
- Someone else's solution or advice sounds reasonable but you do not understand its applicable conditions
- You need a comprehensive understanding of the current state of a system, project, or problem
- You sense that you are engaging in "book worship" — applying theory without understanding the reality

## Method Workflow

### Step 1: Define the Investigation Objective

> "Investigation is like 'ten months of pregnancy,' and solving a problem is like 'the day of delivery.'" — "Oppose Book Worship"《反对本本主义》

Investigation is not aimless information gathering. Before starting, clarify:
- What problem am I trying to solve?
- What aspects of the situation do I need to understand?
- How will the investigation results guide my actions?

### Step 2: Prepare an Investigation Outline

> Mao Zedong emphasized that investigation must have "preparation" — a detailed outline

List the specific questions to be investigated:
- What is the current state of affairs? (Status investigation)
- What was it like historically? (Historical investigation)
- What related factors are involved? (Relational investigation)
- What different viewpoints exist? (Multi-perspective investigation)

### Step 3: Go to the Front Lines for Firsthand Material

> "If you have had no investigation of a particular problem, you forfeit your right to speak on it." — "Oppose Book Worship"《反对本本主义》

You must personally access firsthand material — do not rely solely on secondhand summaries:
- Read the source code directly, not just the documentation
- Run and test directly, not just read reports
- Communicate directly with relevant people, not just read paraphrases
- Understand the details thoroughly; do not settle for "a rough idea"

**Warning:**
> Do not conduct a "looking at flowers from horseback" investigation — "like standing on a mountaintop gazing at a bustling city from afar," skimming the surface.

### Step 4: Record in Detail, Organize Systematically

> "You must keep your own notes." — "Oppose Book Worship"《反对本本主义》

During the investigation:
- Record discovered facts in detail
- Distinguish facts from opinions
- Organize and categorize; find patterns
- Mark points of uncertainty

### Step 5: Seek Truth from Facts — Draw Conclusions

> "'Facts' refers to all things that objectively exist; 'truth' refers to their internal connections, that is, their laws; and 'to seek' means that we study them." — "Reform Our Study"《改造我们的学习》

Starting from the facts obtained through investigation, analyze their internal connections and draw conclusions:
- Facts before judgments; material before viewpoints
- Every conclusion must be supported by facts
- Do not form a conclusion first and then look for evidence
- If the facts contradict expectations, revise the conclusion — not the facts
- Admitting "I don't know" is also an honest investigative conclusion

### Step 6: Make Decisions Only After Investigation Is Complete

After the investigation is finished, make decisions or propose plans based on the findings. At this point you may combine them with theoretical principles — **but theory must serve the facts, not the other way around**. If you subsequently enter verification and iteration, continue by invoking `practice-cognition`, so that `Seek Truth from Facts` runs through the entire process from investigation to practical testing.

## Seven Rules of Investigation

Based on the investigation methods Mao Zedong outlined in "Oppose Book Worship"《反对本本主义》, summarized as seven rules:

1. **Have a purpose** — investigate with specific questions in mind
2. **Have an outline** — investigate with a plan and structure
3. **Do it yourself** — do not rely solely on others' reports
4. **Go deep** — do not be superficial
5. **Keep notes** — systematically organize investigation results
6. **Cover multiple angles** — listen to perspectives from different sides
7. **Seek truth from facts** — start from reality; do not presuppose conclusions

## Common Mistakes

| Mistake | Mao's Critique | Correct Approach |
|---|---|---|
| Giving answers without investigation | "No investigation, no right to speak" | Investigate first, speak second |
| Reading only documentation, not reality | "Paying no attention to studying current conditions" | Go to the front lines for firsthand material |
| Superficial investigation | Cannot "stand on a mountaintop gazing from afar" | Go deep and be thorough; do not skim the surface |
| Forming conclusions first, then seeking evidence | "Not starting from objectively existing actual things" | Draw conclusions from the facts |
| Investigating only the present, not the history | "Paying no attention to studying history" | Give equal weight to history and current conditions |
| Looking at only one side | A multi-angle, multi-faceted investigation is needed | Listen to all sides for a clear picture |

## Operating Procedure

When this skill is triggered, **output an investigation outline** before beginning any substantive work:

1. **State the investigation objective**: In one sentence, write "What I need to find out is: [specific question]"
2. **List the investigation checklist**: Use checkboxes to enumerate the specific items to investigate, for example:
   - `- [ ]` Read [specific file/module] to understand the current state
   - `- [ ]` Check [specific interface/configuration] to understand constraints
   - `- [ ]` Confirm the actual status of [specific data/state]
3. **Execute the investigation**: Complete each item and mark it `- [x]`
4. **Output the investigation conclusion**, using this fixed format:
   ```
   Investigation Conclusion:
   - Current state: …
   - Key constraints: …
   - What I did not know before but now know: …
   - Based on the above, my judgment is: …
   ```

**The investigation conclusion must appear before any action plan. Do not propose solutions while still investigating.**

## Relationship to Other Skills

- **Contradiction Analysis**: Investigation provides the factual foundation for contradiction analysis
- **Practice–Cognition Theory**: Investigation is an important form of "practice"; the understanding derived from investigation must still be tested in practice
- **Mass Line**: A key method of investigation is "from the masses"
- **Criticism and Self-Criticism**: Investigating your own work is also a form of self-criticism
