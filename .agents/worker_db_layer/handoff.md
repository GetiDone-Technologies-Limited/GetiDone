# Handoff Report — Database Schema Layer

## 1. Observation
- Created files:
  - `c:\Users\barns\OneDrive\Desktop\GetiDone\backend\package.json`
  - `c:\Users\barns\OneDrive\Desktop\GetiDone\backend\.env`
  - `c:\Users\barns\OneDrive\Desktop\GetiDone\backend\prisma\schema.prisma`
- Tool Commands and Results:
  - Run command: `npm install` inside `backend` folder.
    - Output: `added 7 packages, and audited 8 packages in 43s`
  - Run command: `npx prisma validate` inside `backend` folder.
    - Output:
      ```
      Environment variables loaded from .env
      Prisma schema loaded from prisma\schema.prisma
      The schema at prisma\schema.prisma is valid 🚀
      ```

## 2. Logic Chain
- Set up a clean `package.json` with the `prisma` and `@prisma/client` packages to enable local schema validation.
- Designed `schema.prisma` using PostgreSQL as the datasource provider.
- Created the following schema models matching the MVP specifications:
  - **User**: Includes `email`, `passwordHash`, `name`, `role` (CLIENT, FREELANCER, ADMIN, QA), `kycStatus` (PENDING, APPROVED, REJECTED), `kycDetails` (Json), `doneScore` (Float), and timestamps.
  - **Skill**: Includes `name` (unique) and many-to-many relationships to both `User` and `Job`.
  - **Job**: Includes `title`, `description`, `budget`, `status` (OPEN, IN_PROGRESS, COMPLETED, CANCELLED), client User relation, and links to skills, applications, and project.
  - **Application**: Includes `proposal`, `bidAmount`, `status` (PENDING, ACCEPTED, REJECTED), linked to `Job` and freelancer `User`.
  - **Project**: Represents execution of a job. Includes `status` (IN_PROGRESS, COMPLETED, CANCELLED), `escrowStatus` (UNFUNDED, FUNDED, RELEASED, REFUNDED), `budget`, `commissionAmount`, `payoutAmount`, and links to `Job` (one-to-one @unique relation), client, freelancer, deliverables, payments, and reviews.
  - **Conversation**: Grouping model for chat rooms. Links many-to-many with `User` (participants).
  - **Message**: Chat message content. Includes `senderId`, `receiverId`, `content`, and `conversationId` (linked to `Conversation`).
  - **Deliverable**: Project task deliverable tracking. Includes `title`, `description`, `status` (PENDING, SUBMITTED, APPROVED, REJECTED), `submissionUrl`, and links to `Project`.
  - **Payment**: Financial transaction record. Includes `amount`, `type` (ESCROW_FUND, ESCROW_RELEASE, COMMISSION, REWARD), `status` (PENDING, SUCCESSFUL, FAILED), `reference` (unique), and links to `Project`.
  - **Review**: Reputation feedback. Includes `rating`, `comment`, `category` (CLIENT_TO_FREELANCER, FREELANCER_TO_CLIENT), and links to `Project` and reviewer/reviewee `User` profiles.
- Resolved Prisma validation errors (e.g. missing `DATABASE_URL`) by generating a `.env` file with a mock connection string.
- Ran validation using `npx prisma validate`, confirming the schema is 100% syntactically correct and relationship-consistent.

## 3. Caveats
- The schema uses a mock local PostgreSQL connection string in `.env` to pass CLI validation. To apply migrations or push the schema to a live database, a valid `DATABASE_URL` must be set.
- All primary keys (`id`) are modeled as string UUIDs (`@id @default(uuid())`) for scalability and security.

## 4. Conclusion
- The database schema layer is complete and successfully validated. The backend skeleton can proceed with building domain modules that import and leverage this schema.

## 5. Verification Method
- **Verify schema file location and content**: View the file `c:\Users\barns\OneDrive\Desktop\GetiDone\backend\prisma\schema.prisma`.
- **Run validation command**: Run `npx prisma validate` in the directory `c:\Users\barns\OneDrive\Desktop\GetiDone\backend\`. It should output:
  ```
  The schema at prisma\schema.prisma is valid 🚀
  ```

---

### Verbatim Prisma Schema Code:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum Role {
  CLIENT
  FREELANCER
  ADMIN
  QA
}

enum KycStatus {
  PENDING
  APPROVED
  REJECTED
}

enum JobStatus {
  OPEN
  IN_PROGRESS
  COMPLETED
  CANCELLED
}

enum ApplicationStatus {
  PENDING
  ACCEPTED
  REJECTED
}

enum ProjectStatus {
  IN_PROGRESS
  COMPLETED
  CANCELLED
}

enum EscrowStatus {
  UNFUNDED
  FUNDED
  RELEASED
  REFUNDED
}

enum DeliverableStatus {
  PENDING
  SUBMITTED
  APPROVED
  REJECTED
}

enum PaymentType {
  ESCROW_FUND
  ESCROW_RELEASE
  COMMISSION
  REWARD
}

enum PaymentStatus {
  PENDING
  SUCCESSFUL
  FAILED
}

enum ReviewCategory {
  CLIENT_TO_FREELANCER
  FREELANCER_TO_CLIENT
}

model User {
  id           String    @id @default(uuid())
  email        String    @unique
  passwordHash String
  name         String
  role         Role
  kycStatus    KycStatus @default(PENDING)
  kycDetails   Json?
  doneScore    Float     @default(0)
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt

  // Relations
  skills             Skill[]
  jobs               Job[]                 @relation("ClientJobs")
  applications       Application[]         @relation("FreelancerApplications")
  clientProjects     Project[]             @relation("ClientProjects")
  freelancerProjects Project[]             @relation("FreelancerProjects")
  sentMessages       Message[]             @relation("SentMessages")
  receivedMessages   Message[]             @relation("ReceivedMessages")
  conversations      Conversation[]        @relation("ConversationParticipants")
  reviewsWritten     Review[]              @relation("ReviewsWritten")
  reviewsReceived    Review[]              @relation("ReviewsReceived")
}

model Skill {
  id    String @id @default(uuid())
  name  String @unique
  users User[]
  jobs  Job[]
}

model Job {
  id          String    @id @default(uuid())
  title       String
  description String
  budget      Decimal   @db.Decimal(10, 2)
  status      JobStatus @default(OPEN)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  clientId String
  client   User   @relation("ClientJobs", fields: [clientId], references: [id])

  skills       Skill[]
  applications Application[]
  project      Project?
}

model Application {
  id        String            @id @default(uuid())
  proposal  String
  bidAmount Decimal           @db.Decimal(10, 2)
  status    ApplicationStatus @default(PENDING)
  createdAt DateTime          @default(now())
  updatedAt DateTime          @updatedAt

  jobId String
  job   Job    @relation(fields: [jobId], references: [id], onDelete: Cascade)

  freelancerId String
  freelancer   User   @relation("FreelancerApplications", fields: [freelancerId], references: [id], onDelete: Cascade)
}

model Project {
  id               String        @id @default(uuid())
  status           ProjectStatus @default(IN_PROGRESS)
  escrowStatus     EscrowStatus  @default(UNFUNDED)
  budget           Decimal       @db.Decimal(10, 2)
  commissionAmount Decimal       @db.Decimal(10, 2)
  payoutAmount     Decimal       @db.Decimal(10, 2)
  createdAt        DateTime      @default(now())
  updatedAt        DateTime      @updatedAt

  jobId String @unique
  job   Job    @relation(fields: [jobId], references: [id], onDelete: Cascade)

  clientId String
  client   User   @relation("ClientProjects", fields: [clientId], references: [id])

  freelancerId String
  freelancer   User   @relation("FreelancerProjects", fields: [freelancerId], references: [id])

  deliverables Deliverable[]
  payments     Payment[]
  reviews      Review[]
}

model Conversation {
  id        String   @id @default(uuid())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  participants User[]    @relation("ConversationParticipants")
  messages     Message[]
}

model Message {
  id        String   @id @default(uuid())
  content   String
  createdAt DateTime @default(now())

  senderId String
  sender   User   @relation("SentMessages", fields: [senderId], references: [id], onDelete: Cascade)

  receiverId String
  receiver   User   @relation("ReceivedMessages", fields: [receiverId], references: [id], onDelete: Cascade)

  conversationId String
  conversation   Conversation @relation(fields: [conversationId], references: [id], onDelete: Cascade)
}

model Deliverable {
  id            String            @id @default(uuid())
  title         String
  description   String
  status        DeliverableStatus @default(PENDING)
  submissionUrl String?
  createdAt     DateTime          @default(now())
  updatedAt     DateTime          @updatedAt

  projectId String
  project   Project @relation(fields: [projectId], references: [id], onDelete: Cascade)
}

model Payment {
  id        String        @id @default(uuid())
  amount    Decimal       @db.Decimal(10, 2)
  type      PaymentType
  status    PaymentStatus @default(PENDING)
  reference String?       @unique
  createdAt DateTime      @default(now())
  updatedAt DateTime      @updatedAt

  projectId String
  project   Project @relation(fields: [projectId], references: [id], onDelete: Cascade)
}

model Review {
  id        String         @id @default(uuid())
  rating    Int
  comment   String?
  category  ReviewCategory
  createdAt DateTime       @default(now())
  updatedAt DateTime       @updatedAt

  projectId String
  project   Project @relation(fields: [projectId], references: [id], onDelete: Cascade)

  reviewerId String
  reviewer   User   @relation("ReviewsWritten", fields: [reviewerId], references: [id])

  revieweeId String
  reviewee   User   @relation("ReviewsReceived", fields: [revieweeId], references: [id])
}
```
