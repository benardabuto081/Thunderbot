# Thunderbot code review instructions

Thunderbot is a PLP Group 90 team project. Pull requests must be reviewed against the task's Definition of Done, not only for style.

## Review priorities

1. Correctness: identify bugs, broken behavior, incorrect assumptions, and missing error handling.
2. Definition of Done: verify that the implementation actually satisfies the assigned task.
3. Integration safety: flag changes that overwrite, delete, or unexpectedly alter another teammate's work.
4. Tests: check that important behavior has executable evidence, including valid, invalid, missing, and boundary cases where relevant.
5. Security: flag committed secrets, unsafe input handling, insecure defaults, and dependency risks.
6. Maintainability: prefer simple, understandable code appropriate for a beginner team; avoid unnecessary architecture.

## Review rules

- Treat a passing test as evidence, not proof that the whole task is complete.
- Do not approve or imply merge approval. The human Integration/QA gate is the final authority.
- Distinguish blocking defects from non-blocking suggestions.
- When a requirement is missing, explain the exact evidence needed to satisfy it.
- Do not request unrelated refactors.
- Pay attention to the task number and Definition of Done supplied in the pull request description.

## Thunderbot architecture

Customer -> Frontend -> Chatbot -> Backend -> Database

Current major responsibilities:
- Frontend/UX: chat UI and user interaction.
- AI/Chatbot: intent recognition and chatbot/backend integration.
- Backend/DB: server, database schema, and order status API.
- Returns/Business Logic: return/refund eligibility and workflow.
- Integration/QA/DevOps: testing, CI, integration, setup documentation, and final human verification.

## Final review format

Use this structure when practical:

- **Blocking:** defects that must be fixed before human approval.
- **Non-blocking:** improvements that are useful but do not prevent completion.
- **Definition of Done:** satisfied / not satisfied, with evidence.
- **Tests:** what was verified and what remains unverified.
