# specs/[your-feature-name].md — Nokta Feature Spec

<!-- COPY THIS FILE: cp specs/TEMPLATE.md specs/your-feature-name.md -->
<!-- BRANCH: git checkout -b spec/your-feature-name -->
<!-- RULE: Delete all > TODO lines before opening a PR. Any remaining > TODO keeps your score low. -->
<!-- SCOPE: This spec is for Nokta mobile app features only. -->

---

## 1. IDENTITY

<!-- What feature or subsystem is this spec about?
     Who is the target user of this feature?
     What does it do — and what does it NOT do? (max ~100 words)
     Use the Nokta metaphor where relevant: dot → line → paragraph → page -->

> TODO: One-paragraph identity statement. Name the feature, its user, and its boundary.

---

## 2. NON-GOALS

<!-- List at least 5 things this feature will NOT do in v0.1.
     Each item must have a one-line reason.
     Format: - **Thing** — Reason why it is out of scope. -->

> TODO: At least 5 explicit non-goals with reasons.

---

## 3. DATA CONTRACTS

<!-- Define the data structures this feature introduces or modifies.
     Use TypeScript interfaces / enums. Put all types inside ```typescript blocks.
     Reference the main type source: src/features/idea/types.ts -->

> TODO: TypeScript interfaces, enums, and AsyncStorage key schema (if applicable).

---

## 4. OBJECTIVE FUNCTION

<!-- How will CI decide if this feature is working correctly?
     Define:
       - Hard gates (binary pass/fail checks, e.g. tsc, eslint)
       - One scalar metric (e.g. golden flow pass rate, acceptance test pass %)
     Formula must be a single number 0–100. -->

> TODO: Hard gates list + single scalar metric formula + merge rule in one sentence.

---

## 5. RATCHET RULE

<!-- Complete this sentence exactly:
     "This spec's PR merges if: [hard gates] AND [metric(PR)] ≥ [metric(main)]."
     No exceptions. No human review. The metric decides. -->

> TODO: One sentence ratchet rule.

---

<!-- SCORING: CI reads checklists/spec_generic.yml and scores this file 0–100.
     First merge → establishes baseline score on main.
     Next PRs for this file → must match or beat that score.
     Score never drops. -->
