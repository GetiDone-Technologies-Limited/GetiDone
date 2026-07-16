## 2026-07-16T00:28:19Z
Design and write the Prisma schema for the GetiDone MVP.
Configure PostgreSQL as the datasource provider.
Model the core entities:
- User (email, passwordHash, name, role [CLIENT, FREELANCER, ADMIN, QA], kycStatus [PENDING, APPROVED, REJECTED], kycDetails, doneScore, timestamps)
- Skill (dynamic skill tags linked to Users and/or Jobs)
- Job (title, description, client, budget, status [OPEN, IN_PROGRESS, COMPLETED, CANCELLED], and relation to skills/applications/projects)
- Application (jobId, freelancerId, proposal, bidAmount, status [PENDING, ACCEPTED, REJECTED])
- Project (jobId, clientId, freelancerId, status [IN_PROGRESS, COMPLETED, CANCELLED], escrowStatus [UNFUNDED, FUNDED, RELEASED, REFUNDED], budget, commissionAmount, payoutAmount)
- Message (senderId, receiverId, content, or Conversation/Message setup matching GET /messaging/conversations and POST /messaging/send)
- Deliverable (projectId, title, description, status [PENDING, SUBMITTED, APPROVED, REJECTED], submissionUrl)
- Payment (projectId, amount, type [ESCROW_FUND, ESCROW_RELEASE, COMMISSION, REWARD], status [PENDING, SUCCESSFUL, FAILED], reference)
- Review (projectId, reviewerId, revieweeId, rating, comment, category [CLIENT_TO_FREELANCER, FREELANCER_TO_CLIENT])

Validate the schema by running 'npx prisma validate' inside the backend folder and confirm it passes. Ensure you initialize package.json and install prisma in backend folder if needed.
Write a handoff report to handoff.md and send message back to caller.
