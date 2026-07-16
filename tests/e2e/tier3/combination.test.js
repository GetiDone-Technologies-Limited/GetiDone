module.exports = [
  {
    name: 'Combination: Job creation -> matching recommendation -> application',
    fn: async ({ baseUrl, assert }) => {
      // 1. Create a Freelancer with skills
      const registerRes = await fetch(`${baseUrl}/user/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'combination_dev@getidone.com',
          password: 'password',
          name: 'Combination Developer',
          role: 'freelancer',
          skills: ['Python', 'Django']
        })
      });
      const freelancer = (await registerRes.json()).user;

      // 2. Create a Job requiring Python and Django
      const jobRes = await fetch(`${baseUrl}/job`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'Django Expert Needed',
          budget: 1500,
          clientId: 'user_client',
          skillsRequired: ['Python', 'Django']
        })
      });
      const job = await jobRes.json();

      // 3. Verify Matching Recommendation
      const recRes = await fetch(`${baseUrl}/matching/recommend/${job.id}`);
      const recommendations = await recRes.json();
      const matched = recommendations.find(r => r.freelancer.id === freelancer.id);
      assert.ok(matched);
      assert.strictEqual(matched.matchPercentage, 100);

      // 4. Apply to Job
      const applyRes = await fetch(`${baseUrl}/job/${job.id}/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          freelancerId: freelancer.id,
          proposal: 'I have 5 years of Django experience.'
        })
      });
      assert.strictEqual(applyRes.status, 201);
      const app = await applyRes.json();
      assert.strictEqual(app.jobId, job.id);
      assert.strictEqual(app.freelancerId, freelancer.id);
    }
  },
  {
    name: 'Combination: Messaging -> Escrow funding flow',
    fn: async ({ baseUrl, assert }) => {
      // 1. Send conversation message
      const msgRes = await fetch(`${baseUrl}/messaging/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          senderId: 'client_1',
          receiverId: 'freelancer_1',
          message: 'Agree to $300?'
        })
      });
      assert.strictEqual(msgRes.status, 201);

      // 2. Fund escrow immediately after agreement
      const fundRes = await fetch(`${baseUrl}/payment/escrow/fund`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobId: 'job_456',
          clientId: 'client_1',
          freelancerId: 'freelancer_1',
          amount: 300
        })
      });
      assert.strictEqual(fundRes.status, 201);
      const escrow = await fundRes.json();
      assert.strictEqual(escrow.status, 'funded');
      assert.strictEqual(escrow.amount, 300);
    }
  },
  {
    name: 'Combination: Auth + Job Post + Recommendation',
    fn: async ({ baseUrl, assert }) => {
      // 1. Register client and freelancer
      const clientReg = await fetch(`${baseUrl}/user/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 't3_client1@getidone.com',
          password: 'securePassword1',
          name: 'Tier 3 Client One',
          role: 'client'
        })
      });
      assert.strictEqual(clientReg.status, 201);
      const client = (await clientReg.json()).user;

      const freelancerReg = await fetch(`${baseUrl}/user/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 't3_free1@getidone.com',
          password: 'securePassword2',
          name: 'Tier 3 Freelancer One',
          role: 'freelancer',
          skills: ['React', 'CSS']
        })
      });
      assert.strictEqual(freelancerReg.status, 201);
      const freelancer = (await freelancerReg.json()).user;

      // 2. Login client to verify credentials
      const clientLogin = await fetch(`${baseUrl}/user/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 't3_client1@getidone.com',
          password: 'securePassword1'
        })
      });
      assert.strictEqual(clientLogin.status, 200);
      const loginData = await clientLogin.json();
      assert.ok(loginData.token);

      // 3. Post Job
      const jobRes = await fetch(`${baseUrl}/job`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'React Landing Page',
          budget: 500,
          clientId: client.id,
          skillsRequired: ['React']
        })
      });
      assert.strictEqual(jobRes.status, 201);
      const job = await jobRes.json();

      // 4. Fetch recommendations and assert
      const recRes = await fetch(`${baseUrl}/matching/recommend/${job.id}`);
      assert.strictEqual(recRes.status, 200);
      const recs = await recRes.json();
      const match = recs.find(r => r.freelancer.id === freelancer.id);
      assert.ok(match);
      assert.strictEqual(match.matchPercentage, 100);
    }
  },
  {
    name: 'Combination: Job Application + Escrow funding',
    fn: async ({ baseUrl, assert }) => {
      // 1. Register Client and Freelancer
      const clientReg = await fetch(`${baseUrl}/user/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 't3_client2@getidone.com',
          password: 'password',
          name: 'Client Two',
          role: 'client'
        })
      });
      const client = (await clientReg.json()).user;

      const freelancerReg = await fetch(`${baseUrl}/user/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 't3_free2@getidone.com',
          password: 'password',
          name: 'Freelancer Two',
          role: 'freelancer'
        })
      });
      const freelancer = (await freelancerReg.json()).user;

      // 2. Post Job
      const jobRes = await fetch(`${baseUrl}/job`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'Quick Translation',
          budget: 150,
          clientId: client.id
        })
      });
      const job = await jobRes.json();

      // 3. Apply
      const applyRes = await fetch(`${baseUrl}/job/${job.id}/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          freelancerId: freelancer.id,
          proposal: 'I can translate this quickly.'
        })
      });
      assert.strictEqual(applyRes.status, 201);
      const app = await applyRes.json();

      // 4. Fund Escrow based on application
      const fundRes = await fetch(`${baseUrl}/payment/escrow/fund`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobId: job.id,
          clientId: client.id,
          freelancerId: freelancer.id,
          amount: job.budget
        })
      });
      assert.strictEqual(fundRes.status, 201);
      const escrow = await fundRes.json();
      assert.strictEqual(escrow.status, 'funded');
      assert.strictEqual(escrow.amount, 150);
    }
  },
  {
    name: 'Combination: Job Completion + Done Score recalculation',
    fn: async ({ baseUrl, assert }) => {
      // 1. Register Client and Freelancer
      const clientReg = await fetch(`${baseUrl}/user/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 't3_client3@getidone.com',
          password: 'password',
          name: 'Client Three',
          role: 'client'
        })
      });
      const client = (await clientReg.json()).user;

      const freelancerReg = await fetch(`${baseUrl}/user/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 't3_free3@getidone.com',
          password: 'password',
          name: 'Freelancer Three',
          role: 'freelancer'
        })
      });
      const freelancer = (await freelancerReg.json()).user;

      // Get initial done score
      const dsRes1 = await fetch(`${baseUrl}/matching/donescore/${freelancer.id}`);
      const initialScore = (await dsRes1.json()).doneScore;

      // 2. Post Job and Apply
      const jobRes = await fetch(`${baseUrl}/job`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'API Optimization',
          budget: 1000,
          clientId: client.id
        })
      });
      const job = await jobRes.json();

      const applyRes = await fetch(`${baseUrl}/job/${job.id}/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          freelancerId: freelancer.id,
          proposal: 'I will optimize existing backend APIs.'
        })
      });
      const app = await applyRes.json();

      // 3. Complete Job Application
      const compRes = await fetch(`${baseUrl}/application/${app.id}/complete`, {
        method: 'POST'
      });
      assert.strictEqual(compRes.status, 200);

      // 4. Retrieve and verify new Done Score
      const dsRes2 = await fetch(`${baseUrl}/matching/donescore/${freelancer.id}`);
      const finalScore = (await dsRes2.json()).doneScore;

      // Confirm dynamic score recalculation occurred
      assert.notStrictEqual(initialScore, finalScore);
      assert.ok(finalScore > initialScore);
    }
  },
  {
    name: 'Combination: Messaging + Apply',
    fn: async ({ baseUrl, assert }) => {
      // 1. Register Client and Freelancer
      const clientReg = await fetch(`${baseUrl}/user/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 't3_client4@getidone.com',
          password: 'password',
          name: 'Client Four',
          role: 'client'
        })
      });
      const client = (await clientReg.json()).user;

      const freelancerReg = await fetch(`${baseUrl}/user/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 't3_free4@getidone.com',
          password: 'password',
          name: 'Freelancer Four',
          role: 'freelancer'
        })
      });
      const freelancer = (await freelancerReg.json()).user;

      // 2. Post Job
      const jobRes = await fetch(`${baseUrl}/job`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'Logo Design',
          budget: 200,
          clientId: client.id
        })
      });
      const job = await jobRes.json();

      // 3. Send message before applying
      const msgRes = await fetch(`${baseUrl}/messaging/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          senderId: freelancer.id,
          receiverId: client.id,
          message: 'Hello, I saw your Logo Design post. I am interested!'
        })
      });
      assert.strictEqual(msgRes.status, 201);

      // Verify conversation exists
      const convRes = await fetch(`${baseUrl}/messaging/conversations`);
      const conversations = await convRes.json();
      const conversation = conversations.find(c => c.participantIds.includes(freelancer.id) && c.participantIds.includes(client.id));
      assert.ok(conversation);
      assert.strictEqual(conversation.lastMessage, 'Hello, I saw your Logo Design post. I am interested!');

      // 4. Apply to Job
      const applyRes = await fetch(`${baseUrl}/job/${job.id}/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          freelancerId: freelancer.id,
          proposal: 'I can design a modern minimalist logo.'
        })
      });
      assert.strictEqual(applyRes.status, 201);
      const app = await applyRes.json();
      assert.strictEqual(app.jobId, job.id);
    }
  }
];
