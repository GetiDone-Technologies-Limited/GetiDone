# GetiDone MVP — E2E Test Infrastructure & Strategy

This document outlines the design, methodology, structure, and execution framework for the End-to-End (E2E) testing of the GetiDone MVP skeleton.

## Core Features (Modules)
The E2E test suite validates the five core modules defined in the system architecture:
1. **User/Auth/Profile (User Module)**: Registration, login, profile retrieval, skill tags, KYC verification.
2. **Job Marketplace (Job Module)**: Creating job posts, listing jobs, applying to jobs, tracking milestones.
3. **Matching/DoneScore (Matching Module)**: AI matchmaking recommendation list with percentage score, Done Score calculations (Review, Completion, Timeliness, QA/QC, Trust, Engagement).
4. **Messaging (Messaging Module)**: Conversational retrieval, real-time message sending.
5. **Payment/Escrow (Payment Module)**: Escrow funding and release.

## Testing Methodology
To ensure high coverage, correctness, and adversarial resilience, we apply four distinct test design methodologies across four Tiers:

1. **Category-Partition Testing (Tier 1 - Feature Coverage)**
   - Partition inputs and states of each module into distinct categories.
   - Verify every REST endpoint and critical user pathway under standard, happy-path conditions.
   - **Target**: >= 30 test cases total (>= 5 per feature module).

2. **Boundary Value Analysis (BVA) (Tier 2 - Boundary & Corner Cases)**
   - Test extreme inputs, empty lists, duplicate keys, token expirations, and invalid payloads.
   - Assert error codes, correct handling of validation failures, and edge-case inputs.
   - **Target**: >= 30 test cases total (>= 5 per feature module).

3. **Pairwise Testing (Tier 3 - Cross-Feature Combinations)**
   - Test interactions between different modules (e.g., job application state and payment escrow release).
   - Use combinatorial logic to cover pairwise module transitions.
   - **Target**: >= 6 test cases total.

4. **Workload Testing (Tier 4 - Real-world Workloads)**
   - Simulate end-to-end user journeys (e.g., a Client registers, posts a job; a Freelancer registers, gets recommended, applies, gets hired; the Client funds escrow, messages the freelancer, releases payment, and writes a review).
   - Validate continuous state changes and database updates.
   - **Target**: >= 5 test cases total.

## Test Suite Targets
| Tier | Description | Target Test Cases |
|------|-------------|-------------------|
| **Tier 1** | Feature Coverage | >= 30 |
| **Tier 2** | Boundary & Corner Cases | >= 30 |
| **Tier 3** | Cross-Feature Combinations | >= 6 |
| **Tier 4** | Real-world Workloads | >= 5 |
| **Total** | | **>= 71** |

## Folder Structure
All E2E tests are organized under the `tests/e2e/` folder structure:
```
tests/e2e/
├── runner.js          # Lightweight E2E test runner
├── mock-server.js     # Mock HTTP REST endpoint server (NestJS-like)
├── tier1/             # Feature Coverage test cases (User, Job, Matching, Messaging, Payment)
├── tier2/             # Boundary & Corner cases
├── tier3/             # Cross-Feature Combinations
└── tier4/             # Real-world Workloads
```

## Infrastructure Execution
The E2E test harness operates by:
1. Launching the mock REST API server dynamically on a local port (e.g., 3001).
2. Discovering and executing E2E tests which send actual HTTP requests (using `fetch`) to the mock server.
3. Asserting actual HTTP status codes and response payloads.
4. Tearing down the mock server and returning exit code `0` on success, or non-zero on failure.
