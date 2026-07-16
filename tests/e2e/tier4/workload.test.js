module.exports = [
  {
    name: 'Workload: Complete freelancer hire, messaging, escrow, and rating journey',
    fn: async ({ baseUrl, assert }) => {
      // 1. Client Register
      const clientRegRes = await fetch(`${baseUrl}/user/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'workload_client@getidone.com',
          password: 'clientpassword',
          name: 'Big Client Corp',
          role: 'client'
        })
      });
      assert.strictEqual(clientRegRes.status, 201);
      const client = (await clientRegRes.json()).user;

      // 2. Freelancer Register
      const devRegRes = await fetch(`${baseUrl}/user/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'workload_dev@getidone.com',
          password: 'devpassword',
          name: 'Pro Developer',
          role: 'freelancer',
          skills: ['Node.js', 'PostgreSQL', 'Prisma']
        })
      });
      assert.strictEqual(devRegRes.status, 201);
      const dev = (await devRegRes.json()).user;

      // 3. Client Posts Job
      const jobRes = await fetch(`${baseUrl}/job`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'Database Setup with Prisma',
          description: 'Need a PostgreSQL schema designed and verified using Prisma.',
          budget: 800,
          clientId: client.id,
          skillsRequired: ['PostgreSQL', 'Prisma']
        })
      });
      assert.strictEqual(jobRes.status, 201);
      const job = await jobRes.json();

      // 4. Match Recommendation check
      const recRes = await fetch(`${baseUrl}/matching/recommend/${job.id}`);
      const recommendations = await recRes.json();
      const match = recommendations.find(r => r.freelancer.id === dev.id);
      assert.ok(match);
      assert.ok(match.matchPercentage >= 50);

      // 5. Freelancer Applies
      const applyRes = await fetch(`${baseUrl}/job/${job.id}/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          freelancerId: dev.id,
          proposal: 'I can build and validate your Prisma schema within 48 hours.'
        })
      });
      assert.strictEqual(applyRes.status, 201);
      const app = await applyRes.json();

      // 6. Messaging Exchange
      const msg1Res = await fetch(`${baseUrl}/messaging/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          senderId: client.id,
          receiverId: dev.id,
          message: 'Looks good. Let’s do it.'
        })
      });
      assert.strictEqual(msg1Res.status, 201);

      const msg2Res = await fetch(`${baseUrl}/messaging/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          senderId: dev.id,
          receiverId: client.id,
          message: 'Great, ready when you fund the escrow.'
        })
      });
      assert.strictEqual(msg2Res.status, 201);

      // 7. Client Funds Escrow
      const fundRes = await fetch(`${baseUrl}/payment/escrow/fund`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobId: job.id,
          clientId: client.id,
          freelancerId: dev.id,
          amount: 800
        })
      });
      assert.strictEqual(fundRes.status, 201);
      const escrow = await fundRes.json();
      assert.strictEqual(escrow.status, 'funded');

      // 8. Freelancer Delivers and Client Releases Escrow
      const releaseRes = await fetch(`${baseUrl}/payment/escrow/release`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transactionId: escrow.transactionId
        })
      });
      assert.strictEqual(releaseRes.status, 200);
      const releasedEscrow = await releaseRes.json();
      assert.strictEqual(releasedEscrow.status, 'released');

      // 9. Matching Module DoneScore Check
      const dsRes = await fetch(`${baseUrl}/matching/donescore/${dev.id}`);
      assert.strictEqual(dsRes.status, 200);
      const dsData = await dsRes.json();
      assert.strictEqual(dsData.userId, dev.id);
      assert.ok(dsData.doneScore > 0);
    }
  },
  {
    name: 'Workload: Multi-Freelancer Selection/Bidding',
    fn: async ({ baseUrl, assert }) => {
      // 1. Register Client
      const clientReg = await fetch(`${baseUrl}/user/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 't4_client2@getidone.com',
          password: 'password',
          name: 'Tech Inc',
          role: 'client'
        })
      });
      const client = (await clientReg.json()).user;

      // 2. Register 3 freelancers with different skills
      const dev1Reg = await fetch(`${baseUrl}/user/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 't4_freeA@getidone.com',
          password: 'password',
          name: 'Freelancer A',
          role: 'freelancer',
          skills: ['React', 'Redux']
        })
      });
      const devA = (await dev1Reg.json()).user;

      const dev2Reg = await fetch(`${baseUrl}/user/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 't4_freeB@getidone.com',
          password: 'password',
          name: 'Freelancer B',
          role: 'freelancer',
          skills: ['React']
        })
      });
      const devB = (await dev2Reg.json()).user;

      const dev3Reg = await fetch(`${baseUrl}/user/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 't4_freeC@getidone.com',
          password: 'password',
          name: 'Freelancer C',
          role: 'freelancer',
          skills: ['Svelte']
        })
      });
      const devC = (await dev3Reg.json()).user;

      // 3. Post a Job requiring React and Redux
      const jobRes = await fetch(`${baseUrl}/job`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'React Redux Dashboard',
          budget: 2000,
          clientId: client.id,
          skillsRequired: ['React', 'Redux']
        })
      });
      const job = await jobRes.json();

      // 4. Retrieve recommendations and verify ranking
      const recRes = await fetch(`${baseUrl}/matching/recommend/${job.id}`);
      const recs = await recRes.json();
      assert.strictEqual(recs[0].freelancer.id, devA.id); // 100% match
      assert.strictEqual(recs[1].freelancer.id, devB.id); // 50% match
      assert.strictEqual(recs[2].freelancer.id, devC.id); // 0% match

      // 5. All three freelancers apply (bid) on the job
      const applyA = await fetch(`${baseUrl}/job/${job.id}/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ freelancerId: devA.id, proposal: 'I can build this using React & Redux.' })
      });
      const appA = await applyA.json();

      await fetch(`${baseUrl}/job/${job.id}/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ freelancerId: devB.id, proposal: 'I only know React but can learn Redux.' })
      });

      await fetch(`${baseUrl}/job/${job.id}/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ freelancerId: devC.id, proposal: 'I want to build this in Svelte.' })
      });

      // 6. Client hires best match (Freelancer A)
      // Send onboarding messaging
      await fetch(`${baseUrl}/messaging/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ senderId: client.id, receiverId: devA.id, message: 'You are hired. Funding escrow now.' })
      });

      // Fund Escrow for Dev A
      const fundRes = await fetch(`${baseUrl}/payment/escrow/fund`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobId: job.id,
          clientId: client.id,
          freelancerId: devA.id,
          amount: 2000
        })
      });
      const escrow = await fundRes.json();

      // 7. Complete job & release payment
      await fetch(`${baseUrl}/payment/escrow/release`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transactionId: escrow.transactionId })
      });

      await fetch(`${baseUrl}/application/${appA.id}/complete`, { method: 'POST' });

      // Verify Dev A Done Score is updated
      const dsRes = await fetch(`${baseUrl}/matching/donescore/${devA.id}`);
      const dsData = await dsRes.json();
      assert.ok(dsData.doneScore > 80); // Success score
    }
  },
  {
    name: 'Workload: Dispute and Partial Escrow Release Workload',
    fn: async ({ baseUrl, assert }) => {
      // 1. Client and Freelancer register
      const clientReg = await fetch(`${baseUrl}/user/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 't4_client3@getidone.com',
          password: 'password',
          name: 'Disputing Client',
          role: 'client'
        })
      });
      const client = (await clientReg.json()).user;

      const freelancerReg = await fetch(`${baseUrl}/user/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 't4_freeD@getidone.com',
          password: 'password',
          name: 'Freelancer D',
          role: 'freelancer'
        })
      });
      const freelancer = (await freelancerReg.json()).user;

      // 2. Post Job and Fund Escrow ($1000)
      const jobRes = await fetch(`${baseUrl}/job`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'E-commerce API Integration',
          budget: 1000,
          clientId: client.id
        })
      });
      const job = await jobRes.json();

      const fundRes = await fetch(`${baseUrl}/payment/escrow/fund`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobId: job.id,
          clientId: client.id,
          freelancerId: freelancer.id,
          amount: 1000
        })
      });
      const escrow = await fundRes.json();

      // 3. Negotiate dispute via messaging
      await fetch(`${baseUrl}/messaging/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          senderId: client.id,
          receiverId: freelancer.id,
          message: 'The integration was only half completed. Let us settle for $600.'
        })
      });

      await fetch(`${baseUrl}/messaging/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          senderId: freelancer.id,
          receiverId: client.id,
          message: 'Fine, release $600 and refund the rest.'
        })
      });

      // 4. Client executes partial escrow release of $600
      const releaseRes = await fetch(`${baseUrl}/payment/escrow/release`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transactionId: escrow.transactionId,
          amount: 600
        })
      });
      assert.strictEqual(releaseRes.status, 200);
      const releasedEscrow = await releaseRes.json();
      assert.strictEqual(releasedEscrow.status, 'released');
    }
  },
  {
    name: 'Workload: Multi-Milestone Progressive Payment Release',
    fn: async ({ baseUrl, assert }) => {
      // 1. Client and Freelancer register
      const clientReg = await fetch(`${baseUrl}/user/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 't4_client4@getidone.com',
          password: 'password',
          name: 'Milestone Client',
          role: 'client'
        })
      });
      const client = (await clientReg.json()).user;

      const freelancerReg = await fetch(`${baseUrl}/user/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 't4_freeE@getidone.com',
          password: 'password',
          name: 'Freelancer E',
          role: 'freelancer'
        })
      });
      const freelancer = (await freelancerReg.json()).user;

      // 2. Post Job
      const jobRes = await fetch(`${baseUrl}/job`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'Full Stack App Development',
          budget: 1500,
          clientId: client.id
        })
      });
      const job = await jobRes.json();

      // Apply
      const applyRes = await fetch(`${baseUrl}/job/${job.id}/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          freelancerId: freelancer.id,
          proposal: 'I can execute this milestone by milestone.'
        })
      });
      const app = await applyRes.json();

      // 3. Milestone 1: Design phase ($500)
      const fundM1 = await fetch(`${baseUrl}/payment/escrow/fund`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobId: job.id,
          clientId: client.id,
          freelancerId: freelancer.id,
          amount: 500
        })
      });
      const escrowM1 = await fundM1.json();
      assert.strictEqual(escrowM1.status, 'funded');

      // Complete Milestone 1 delivery & release
      await fetch(`${baseUrl}/messaging/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ senderId: freelancer.id, receiverId: client.id, message: 'Design files submitted.' })
      });

      const releaseM1 = await fetch(`${baseUrl}/payment/escrow/release`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transactionId: escrowM1.transactionId })
      });
      assert.strictEqual(releaseM1.status, 200);

      // 4. Milestone 2: Implementation phase ($1000)
      const fundM2 = await fetch(`${baseUrl}/payment/escrow/fund`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobId: job.id,
          clientId: client.id,
          freelancerId: freelancer.id,
          amount: 1000
        })
      });
      const escrowM2 = await fundM2.json();

      // Complete Milestone 2 delivery & release
      await fetch(`${baseUrl}/messaging/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ senderId: freelancer.id, receiverId: client.id, message: 'Codebase deployed.' })
      });

      const releaseM2 = await fetch(`${baseUrl}/payment/escrow/release`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transactionId: escrowM2.transactionId })
      });
      assert.strictEqual(releaseM2.status, 200);

      // 5. Complete application & check Done Score
      await fetch(`${baseUrl}/application/${app.id}/complete`, { method: 'POST' });

      const dsRes = await fetch(`${baseUrl}/matching/donescore/${freelancer.id}`);
      const dsData = await dsRes.json();
      assert.ok(dsData.doneScore > 80);
    }
  },
  {
    name: 'Workload: KYC-based Freelancer Validation and Matched Job Execution',
    fn: async ({ baseUrl, assert }) => {
      // 1. Client and Freelancer register
      const clientReg = await fetch(`${baseUrl}/user/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 't4_client5@getidone.com',
          password: 'password',
          name: 'Enterprise Client',
          role: 'client'
        })
      });
      const client = (await clientReg.json()).user;

      const freelancerReg = await fetch(`${baseUrl}/user/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 't4_freeF@getidone.com',
          password: 'password',
          name: 'Freelancer F',
          role: 'freelancer',
          skills: ['Kubernetes', 'Docker']
        })
      });
      const freelancer = (await freelancerReg.json()).user;

      // 2. Client retrieves freelancer profile to validate KYC status
      const profRes = await fetch(`${baseUrl}/user/profile/${freelancer.id}`);
      assert.strictEqual(profRes.status, 200);
      const profile = await profRes.json();
      assert.strictEqual(profile.kycVerified, true);
      assert.strictEqual(profile.profileStatus, 'active');

      // 3. Client posts job requiring 'Kubernetes' and 'Docker'
      const jobRes = await fetch(`${baseUrl}/job`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'K8s Cluster Migration',
          budget: 5000,
          clientId: client.id,
          skillsRequired: ['Kubernetes', 'Docker']
        })
      });
      const job = await jobRes.json();

      // 4. Retrieve recommendations and apply
      const recRes = await fetch(`${baseUrl}/matching/recommend/${job.id}`);
      const recs = await recRes.json();
      const match = recs.find(r => r.freelancer.id === freelancer.id);
      assert.ok(match);
      assert.strictEqual(match.matchPercentage, 100);

      const applyRes = await fetch(`${baseUrl}/job/${job.id}/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          freelancerId: freelancer.id,
          proposal: 'Experienced DevOps engineer here.'
        })
      });
      const app = await applyRes.json();

      // 5. Escrow and release flow
      const fundRes = await fetch(`${baseUrl}/payment/escrow/fund`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobId: job.id,
          clientId: client.id,
          freelancerId: freelancer.id,
          amount: 5000
        })
      });
      const escrow = await fundRes.json();

      await fetch(`${baseUrl}/payment/escrow/release`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transactionId: escrow.transactionId })
      });

      await fetch(`${baseUrl}/application/${app.id}/complete`, { method: 'POST' });

      // Verify freelancer done score
      const dsRes = await fetch(`${baseUrl}/matching/donescore/${freelancer.id}`);
      const dsData = await dsRes.json();
      assert.ok(dsData.doneScore > 0);
    }
  }
];
