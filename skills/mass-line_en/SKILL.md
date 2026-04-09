---
name: mass-line
description: |
  Trigger when input must be gathered from many people, synthesized into a clearer plan, and returned to the affected users or executors for validation. Use this skill for a collect-synthesize-validate loop.
---

# The Mass Line

> "In all the practical work of our Party, all correct leadership is necessarily 'from the masses, to the masses.' This means: take the ideas of the masses (scattered and unsystematic ideas) and concentrate them (through study, turning them into concentrated and systematic ideas), then go to the masses and propagate and explain these ideas until the masses embrace them as their own, hold fast to them and translate them into action, and test the correctness of these ideas in such action. Then once again concentrate ideas from the masses and once again go to the masses so that the ideas are persevered in and carried through. And so on, over and over again in an endless spiral, with the ideas becoming more correct, more vital and richer each time."
> — Mao Zedong, "Some Questions Concerning Methods of Leadership"《关于领导方法的若干问题》(1943)

## Core Principle

**Correct understanding and decision-making come from a two-way flow of knowledge: collect scattered opinions from practitioners, systematize them, then return them to the practitioners for validation and execution. This cycle repeats, becoming more correct with each iteration.**

> For detailed source references, see original-texts.md

## Who Are the "Masses" in an AI Context?

In an AI agent's working context, the "masses" are not limited to "the user you are conversing with," but rather **all information sources that hold ground truth**:

| Original Meaning | AI Context Mapping |
|---------|-----------|
| Practical experience of the people | Existing patterns, conventions, and comments in the codebase ("wisdom of predecessors") |
| First-hand information from the grassroots | Git history, test cases, error logs ("records of reality") |
| Feedback from the masses on a plan | Execution results, compilation errors, test failures ("the test of practice") |
| Synthesis of opinions from many sides | Cross-validation across multiple sources (documentation + code + runtime results) |

**The core spirit remains unchanged:** Do not listen to only one voice (only what the user says). Gather information from multiple sources, systematize it, then form your judgment. Avoid commandism (following only user instructions without examining actual code) and also avoid tailism (doing whatever the code does without applying your own professional judgment).

## When NOT to Use

**This skill is not needed when:**
- The task has a single, complete information source (the user has provided all necessary context)
- Thorough multi-source information gathering has already been completed, and you are in the execution phase
- An urgent fix is needed and the problem source is clear — no need for multi-source gathering
- The user is the sole information source and their input is already sufficiently precise (e.g., "rename the variable on line 3 for me")

## When to Use

You should invoke this skill when:

- You need to collect opinions and requirements from users/stakeholders/relevant parties
- After drafting a plan, you need to solicit feedback from multiple parties
- You sense you are "building behind closed doors," disconnected from actual user needs
- You need to translate expert knowledge into a plan that non-specialists can understand
- A plan's execution results are poor, and you need to go back to users to re-collect opinions
- You need to integrate opinions from multiple perspectives into a unified plan

## Method Workflow

### Step 1: Collect — From the Masses

> "Take the ideas of the masses (scattered and unsystematic ideas) and concentrate them" — "Some Questions Concerning Methods of Leadership"《关于领导方法的若干问题》

Go deep among the practitioners/users and collect their:
- Actual needs and pain points
- Views and suggestions on the current situation
- Successful experiences and lessons from failures
- Scattered ideas and intuitions

**Note:**
- The collected opinions are typically scattered, unsystematic, and even contradictory — this is normal
- Do not rush to judge or filter; first collect comprehensively
- Be proactive in asking; do not passively wait for feedback
- "The masses are the real heroes" — respect the experience of practitioners

### Step 2: Concentrate — Systematic Study

> "Through study, turning them into concentrated and systematic ideas" — "Some Questions Concerning Methods of Leadership"《关于领导方法的若干问题》

Process the scattered opinions by:
- Categorizing and organizing — identify commonalities and differences
- Analyzing and studying — use contradiction analysis (invoke `contradiction-analysis`) to identify core issues
- Distilling and synthesizing — systematize scattered opinions into a coherent plan or strategy
- Separating the essential from the trivial — retain valuable insights, remove biases and misunderstandings

**Key point:** Systematization is not a simple majority vote. Apply analytical capability to distill the scattered wisdom of the masses into organized understanding.

### Step 3: Return — To the Masses

> "Then go to the masses and propagate and explain these ideas until the masses embrace them as their own" — "Some Questions Concerning Methods of Leadership"《关于领导方法的若干问题》

Return the systematized plan to the practitioners/users:
- Explain the plan in terms they can understand
- Show how the plan was distilled from their opinions
- Solicit their feedback on the systematized plan
- Make them feel that "their own opinions have been organized," not that "a plan has been imposed on them"

### Step 4: Test — Validate in Practice

> "Hold fast to them and translate them into action, and test the correctness of these ideas in such action." — "Some Questions Concerning Methods of Leadership"《关于领导方法的若干问题》

After the plan is executed in practice, observe the results:
- Did the plan solve the original problem?
- Do the users find the plan reasonable and feasible?
- What unexpected issues arose?
- Which parts worked well, and which parts need adjustment?

### Step 5: Re-collect — Begin a New Cycle

> "And so on, over and over again in an endless spiral, with the ideas becoming more correct, more vital and richer each time." — "Some Questions Concerning Methods of Leadership"《关于领导方法的若干问题》

Based on the results of practical testing, re-collect opinions and begin a new cycle. Each cycle should be:
- More accurate in grasping needs
- More effective in solving problems
- Deeper in understanding the situation

### Supplement: Combining General Calls with Specific Guidance

> "If the leading personnel confine themselves to a general call — if they do not personally, concretely, and directly carry out the work of the general call to completion at selected units, gaining experience and using that experience to guide other units — then they have no way of testing whether their general call is correct." — "Some Questions Concerning Methods of Leadership"《关于领导方法的若干问题》

When executing a plan:
- First implement deeply at one specific point to gain experience
- Use the experience from that point to validate and enrich the general plan
- Then extend to a broader scope

## Two Erroneous Tendencies

### Commandism (Ignoring Mass Opinions)

Manifestations:
- Formulating plans without soliciting user opinions
- Thinking "I know better than they do"
- Not collecting feedback after plan implementation

This violates the principle of "from the masses." No matter how strong your professional capability, divorced from the needs of actual users, it is a castle in the air.

### Tailism (Only Following, Not Organizing)

Manifestations:
- Doing whatever the user says without analysis
- Not synthesizing contradictory opinions; just following whoever speaks loudest
- Not daring to offer your own professional judgment

This violates the principle of "concentrating." The mass line is not simply obeying the majority, but rather **systematizing and elevating** scattered opinions before returning them for validation.

## Common Mistakes

| Mistake | Mao's Critique | Correct Approach |
|------|------------|---------|
| Building behind closed doors without consulting users | "Divorcing from the masses" is the most dangerous tendency | Proactively collect user/stakeholder opinions |
| Doing whatever the user says | Tailism — trailing behind the masses | Collect opinions, then organize, analyze, and distill |
| Only collecting without validating | Plans must be "tested in action" | Collect feedback after plan execution |
| Finalizing in one pass without iteration | "Over and over again in an endless spiral, more correct each time" | Continuously iterate and improve |
| Listening to only one side | Must comprehensively understand all aspects of the situation | Collect from multiple angles, analyze synthetically |

## Operating Procedure

When this skill is triggered, **perform multi-source information gathering before proposing any plan**:

1. **Identify the "Masses" (Information Source Inventory)**:
   - The user's explicit requirements (what the user has said)
   - The current state of the codebase (what the actual situation is)
   - Execution results/logs (what real-world feedback shows)
   - Related documentation/comments/git history (what historical experience tells us)

2. **Collect facts from each source** (facts, not interpretations): For each valid information source, extract the key facts

3. **Systematize**: Identify across information sources:
   - Points of agreement (can serve as reliable facts)
   - Points of contradiction (invoke `contradiction-analysis` to process)
   - Information gaps (mark as "[X] Requires further investigation")

4. **Form and present your judgment** using the following format:
   ```
   After synthesizing information from all sources, my judgment is: ...
   This judgment is based on: [Source 1] + [Source 2] jointly point to ...
   Discrepancies with the user's original description: ... (if any)
   ```

5. **Verification closure**: After plan implementation, check whether results are consistent with the judgment in Step 4; if inconsistent, identify which information source provided misleading information.

## Relationships with Other Skills

- **Investigation First**: The "collect" phase of the mass line is itself a form of investigation
- **Contradiction Analysis**: The "concentrate" phase requires contradiction analysis to organize conflicting opinions
- **Practice-Cognition**: The mass line itself is the organizational application of the practice-cognition cycle
- **Criticism and Self-Criticism**: Receiving criticism from the masses is an essential component of the mass line
