---
name: practice-cognition
description: |
  Trigger when an idea, hypothesis, or plan must be tested in practice and improved through iteration. Use this skill to move from action to understanding and back to action in a spiral learning loop.
---

# Practice–Cognition Theory

> "Practice, knowledge, again practice, and again knowledge — this form repeats itself in endless cycles, and with each cycle the content of practice and knowledge rises to a higher level. Such is the whole of the dialectical-materialist theory of knowledge, and such is the dialectical-materialist theory of the unity of knowing and doing."
> — Mao Zedong, "On Practice"《实践论》(1937)

## Core Principle

**All genuine knowledge originates in practice. Understanding comes from practice and must return to practice for verification and development. This cycle never ends, and each iteration brings us closer to the truth.**

Within this project's methodological system, `practice-cognition` is responsible for advancing `Seek Truth from Facts` from the investigation phase into the verification phase. Judgments obtained through investigation must be tested in practice; deviations exposed by practice must, in turn, correct the original understanding.

> For detailed textual references, see original-texts.md

## When NOT to Use

**This skill is not needed in the following situations:**
- The task is a one-off output that requires no iteration (e.g., "write me an email")
- The user already has a well-confirmed conclusion and only needs execution
- You are still in the investigation phase and have not yet formed a hypothesis — invoke `investigation-first` first
- The correct answer can be looked up directly (documentation, API reference) — no "practical test" is needed

## When to Use

You should invoke this skill when:

- You have proposed a plan or hypothesis that needs to be validated
- You are learning a new domain and need to build understanding from shallow to deep
- A previous attempt has failed and you need to summarize lessons before entering the next iteration
- You notice yourself purely "thinking" without "doing" (a dogmatist tendency)
- You notice yourself purely "doing" without "thinking" (an empiricist tendency)
- You need to determine whether a plan is correct but lack practical verification

## Method Workflow

### Step 1: Engage in Practice — Acquire Perceptual Knowledge

> "If you want to know the taste of a pear, you must change the pear by eating it yourself." — "On Practice"《实践论》

Make direct contact with the problem itself. Do not merely read documentation or study theory — get hands-on, experience it firsthand, investigate directly.

**Key point:** At this stage, do not rush to conclusions. Observe patiently and accumulate impressions and data.

### Step 2: Leap from Perceptual Knowledge to Rational Knowledge

> "What is perceived cannot be immediately understood; only what is understood can be more deeply perceived." — "On Practice"《实践论》

Organize, analyze, and synthesize the scattered impressions accumulated in Step 1:
- Extract patterns from phenomena
- Generalize from particulars to universals
- Form hypotheses, models, or plans

**Guard against dogmatism:** Do not mechanically apply ready-made theoretical templates. Your rational knowledge must grow out of your own concrete practice.

**Guard against empiricism:** Do not remain at the level of scattered experiences. You must elevate experience into systematic theory.

### Step 3: Return to Practice for Verification

> "The active role of knowledge manifests itself not only in the active leap from perceptual to rational knowledge, but — and this is more important — in the leap from rational knowledge to revolutionary practice." — "On Practice"《实践论》

Take the theory, plan, or hypothesis formed in Step 2 back into practice for testing:
- Formulate a concrete verification plan
- Execute the verification
- Observe whether results match expectations

**This step is more important than Step 2.** No matter how elegant a theory is, it has no meaning without the test of practice.
**The demand for seeking truth from facts is strictest here:** Do not explain away failure as accidental just because you favor a particular plan; nor should you reject all prior experience because of a single setback.

### Step 4: Evaluate — Practice Is the Sole Criterion

> "The criterion of truth can only be social practice." — "On Practice"《实践论》

Evaluate whether your understanding is correct based on practical results:
- Success → Understanding is essentially correct; proceed to the next cycle for deeper insight
- Failure → Understanding is flawed; return to Step 1 to re-engage in practice and rebuild understanding
- Partial success → Understanding is partially correct; revise and supplement

**Do not substitute "I feel it's right" for practical verification.** Subjective feelings are not the criterion of truth.
**Do not substitute "It should be right in theory" for practical results.** If the facts do not support the conclusion, the conclusion must be retracted or revised.

### Step 5: Spiral Upward — Enter the Next Cycle

> "Practice, knowledge, again practice, and again knowledge — this form repeats itself in endless cycles." — "On Practice"《实践论》

The end of one cycle is not the finish line — it is the starting point of the next, higher-level cycle:
- Summarize the lessons learned in this round
- Undertake new practice on the basis of the new understanding
- Each round goes deeper and comes closer to the truth

**Never consider understanding to be "complete."**

## Two Erroneous Tendencies

### Dogmatism (Theory Divorced from Practice)

> "Reeds on the wall — top-heavy, thin-stemmed, and shallow-rooted" — "Reform Our Study"《改造我们的学习》

Manifestations:
- Citing only theories, documentation, or best practices without verifying whether they apply to the current concrete situation
- Copying others' solutions without considering your own specific conditions
- Using "it should be so in theory" to avoid practical verification

Correction: Immediately engage in practice and test the theory against the facts.

### Empiricism (Practice Divorced from Theory)

> "Bamboo shoots in the hills — sharp-tongued, thick-skinned, and hollow inside" — "Reform Our Study"《改造我们的学习》

Manifestations:
- Acting on feelings and experience without summarizing underlying patterns
- Having done much but unable to articulate why it was done that way
- Treating local experience as universal truth

Correction: Pause and organize your experience; elevate it into systematic theoretical understanding.

## Common Mistakes

| Mistake | Mao's Critique | Correct Approach |
|---|---|---|
| Claiming a plan is correct without verification | "The criterion of truth can only be social practice" | Verify first, conclude second |
| Giving up after a single failure | "A correct understanding often requires... many repetitions" | Failure is part of the learning process — summarize and try again |
| Copying others' approaches | "Make a concrete analysis of concrete conditions" | Study your own specific circumstances |
| Doing without thinking | Empiricism — "mistaking partial experience for universal truth" | Elevate experience into theory |
| Thinking without doing | Dogmatism — "top-heavy, thin-stemmed, and shallow-rooted" | Theory must return to practice for verification |

## Operating Procedure

When this skill is triggered, explicitly declare which stage of the cognition cycle you are currently in, and execute the corresponding actions:

**Stage identification (must be done every time — choose one):**
- "I am currently in: **the perceptual knowledge stage** (accumulating firsthand material)"
- "I am currently in: **the rational knowledge formation stage** (extracting patterns from phenomena)"
- "I am currently in: **the practical verification stage** (testing a hypothesis or plan)"
- "I am currently in: **the summary and elevation stage** (distilling verification results into new understanding)"

**Required actions per stage:**

| Stage | Must Do | Must Not Do |
|---|---|---|
| Perceptual knowledge | Read code / documentation / output; record concrete facts | Jump to conclusions prematurely |
| Rational knowledge | Write out "My hypothesis is: …" | Implement an unverified hypothesis directly |
| Practical verification | Run / execute; compare results vs. expectations | Treat "feels right" as verification passed |
| Summary and elevation | Write out "What I learned this round: …; next round I will: …" | Start the next round without summarizing |

**Cycle termination condition (must be stated explicitly before starting the cycle):**
"When [specific condition], I consider this practice–cognition cycle complete."

## Relationship to Other Skills

- **Contradiction Analysis**: Contradictions identified during practice need to be analyzed in depth with contradiction analysis
- **Investigation First**: The first step of practice is often investigation; investigation is responsible for gathering material, while practice is responsible for testing conclusions
- **Criticism and Self-Criticism**: Reflection at the end of each cycle is a form of self-criticism
- **Protracted Strategy**: The spiral ascent of practice–cognition theory and the stage-by-stage advance of protracted strategy complement each other
