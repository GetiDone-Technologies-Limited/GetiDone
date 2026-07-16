# Scope: E2E Testing Track

## Architecture
The E2E Testing Track validates the GetiDone MVP skeleton by running opaque-box integration tests. These tests interact with the NestJS Backend REST endpoints and the Next.js frontend pages.

The backend REST endpoints defined in PROJECT.md:
- **User Module**:
  - `POST /user/register` -> Returns registered user mock details
  - `POST /user/login` -> Returns JWT mock token
  - `GET /user/profile/:id` -> Returns mock profile data + skills + dynamic status
- **Job Module**:
  - `POST /job` -> Create job post mock
  - `GET /job` -> List job posts mock
  - `POST /job/:id/apply` -> Submit application mock
- **Matching Module**:
  - `GET /matching/recommend/:jobId` -> Returns list of recommended freelancers + match %
  - `GET /matching/donescore/:userId` -> Returns calculated Done Score (Review, Completion, etc.)
- **Messaging Module**:
  - `GET /messaging/conversations` -> List conversations
  - `POST /messaging/send` -> Send message mock
- **Payment Module**:
  - `POST /payment/escrow/fund` -> Initiate escrow holding mock
  - `POST /payment/escrow/release` -> Release payment mock

Since the Implementation Track builds these backend mock endpoints, our E2E test suite should be executable against these endpoints. If the backend is not yet fully running, the test suite should support running in a dry-run or mock mode, or start a mock server, to verify the test suite execution.

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | Test Infra & Harness | Create TEST_INFRA.md, design the test suite layout, and implement the test runner/harness script. | None | DONE |
| 2 | Tier 1 & Tier 2 Tests | Implement Feature Coverage (Tier 1, >=30 tests) and Boundary & Corner cases (Tier 2, >=30 tests) covering User, Job, Matching, Messaging, Payment. Also update mock server with state transitions, JSON error handling, and input validation boundaries. | M1 | DONE |
| 3 | Tier 3 & Tier 4 Tests | Implement Cross-Feature Combinations (Tier 3, >=6 tests) and Real-world Workloads (Tier 4, >=5 tests). | M2 | DONE |
| 4 | Integration & Publish | Verify test suite executes successfully, and publish TEST_READY.md at project root. | M3 | IN_PROGRESS |

## Interface Contracts
### E2E Test Suite Invocation
- Entrypoint: a test runner CLI script (e.g., `npm run test:e2e` or `node tests/run.js`)
- Parameters: `--mock` or env variables to point to target backend API.
- Output: exit code 0 on success, non-zero on failure, structured stdout listing each test case and its status.
