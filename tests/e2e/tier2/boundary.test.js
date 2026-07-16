module.exports = [
  // ==========================================
  // USER MODULE BOUNDARY CASES (1 - 6)
  // ==========================================
  {
    name: 'Boundary/Corner: Register user with duplicate email',
    fn: async ({ baseUrl, assert }) => {
      const payload = {
        email: 'duplicate@getidone.com',
        password: 'password',
        name: 'First User',
        role: 'client'
      };

      // Register first time
      const res1 = await fetch(`${baseUrl}/user/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      assert.strictEqual(res1.status, 201);

      // Register second time
      const res2 = await fetch(`${baseUrl}/user/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      assert.strictEqual(res2.status, 400);
      const data2 = await res2.json();
      assert.strictEqual(data2.error, 'User already exists');
    }
  },
  {
    name: 'Boundary/Corner: Register user with missing fields',
    fn: async ({ baseUrl, assert }) => {
      const res = await fetch(`${baseUrl}/user/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'incomplete@getidone.com'
          // missing password, name, role
        })
      });
      assert.strictEqual(res.status, 400);
      const data = await res.json();
      assert.ok(data.error.includes('required'));
    }
  },
  {
    name: 'Boundary/Corner: Register user with empty/whitespace name',
    fn: async ({ baseUrl, assert }) => {
      const res = await fetch(`${baseUrl}/user/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'emptyname@getidone.com',
          password: 'password123',
          name: '   ',
          role: 'client'
        })
      });
      assert.strictEqual(res.status, 400);
      const data = await res.json();
      assert.strictEqual(data.error, 'name cannot be empty');
    }
  },
  {
    name: 'Boundary/Corner: Register user with invalid role',
    fn: async ({ baseUrl, assert }) => {
      const res = await fetch(`${baseUrl}/user/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'badrole@getidone.com',
          password: 'password123',
          name: 'Bad Role',
          role: 'admin' // invalid role
        })
      });
      assert.strictEqual(res.status, 400);
      const data = await res.json();
      assert.strictEqual(data.error, 'role must be either freelancer or client');
    }
  },
  {
    name: 'Boundary/Corner: Login with invalid credentials',
    fn: async ({ baseUrl, assert }) => {
      const res = await fetch(`${baseUrl}/user/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'nonexistent@getidone.com',
          password: 'wrongpassword'
        })
      });
      assert.strictEqual(res.status, 401);
      const data = await res.json();
      assert.strictEqual(data.error, 'Invalid credentials');
    }
  },
  {
    name: 'Boundary/Corner: Get profile for nonexistent ID',
    fn: async ({ baseUrl, assert }) => {
      const res = await fetch(`${baseUrl}/user/profile/nonexistent_id`);
      assert.strictEqual(res.status, 404);
      const data = await res.json();
      assert.ok(data.error.includes('not found'));
    }
  },

  // ==========================================
  // JOB MODULE BOUNDARY CASES (7 - 12)
  // ==========================================
  {
    name: 'Boundary/Corner: Create job with negative budget',
    fn: async ({ baseUrl, assert }) => {
      const res = await fetch(`${baseUrl}/job`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'Negative Budget Job',
          budget: -100,
          clientId: 'user_1'
        })
      });
      assert.strictEqual(res.status, 400);
      const data = await res.json();
      assert.strictEqual(data.error, 'budget must be a non-negative number');
    }
  },
  {
    name: 'Boundary/Corner: Create job with invalid JSON body',
    fn: async ({ baseUrl, assert }) => {
      const res = await fetch(`${baseUrl}/job`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: '{invalid_json_body'
      });
      assert.strictEqual(res.status, 400);
      const data = await res.json();
      assert.strictEqual(data.error, 'Invalid JSON');
    }
  },
  {
    name: 'Boundary/Corner: Create job with missing required fields',
    fn: async ({ baseUrl, assert }) => {
      const res = await fetch(`${baseUrl}/job`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'Missing Fields'
          // budget and clientId missing
        })
      });
      assert.strictEqual(res.status, 400);
      const data = await res.json();
      assert.ok(data.error.includes('required'));
    }
  },
  {
    name: 'Boundary/Corner: Apply to non-existent job',
    fn: async ({ baseUrl, assert }) => {
      const res = await fetch(`${baseUrl}/job/nonexistent_job_id/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          freelancerId: 'user_1',
          proposal: 'proposal'
        })
      });
      assert.strictEqual(res.status, 404);
      const data = await res.json();
      assert.ok(data.error.includes('not found'));
    }
  },
  {
    name: 'Boundary/Corner: Apply to job with missing proposal details',
    fn: async ({ baseUrl, assert }) => {
      // Create valid job first
      const jobRes = await fetch(`${baseUrl}/job`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'Apply Missing Fields', budget: 100, clientId: 'user_1' })
      });
      const job = await jobRes.json();

      const res = await fetch(`${baseUrl}/job/${job.id}/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          freelancerId: 'user_2'
          // proposal is missing
        })
      });
      assert.strictEqual(res.status, 400);
      const data = await res.json();
      assert.ok(data.error.includes('required'));
    }
  },
  {
    name: 'Boundary/Corner: Complete application with non-existent application ID',
    fn: async ({ baseUrl, assert }) => {
      const res = await fetch(`${baseUrl}/application/app_nonexistent/complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      });
      assert.strictEqual(res.status, 404);
      const data = await res.json();
      assert.ok(data.error.includes('not found'));
    }
  },

  // ==========================================
  // MATCHING MODULE BOUNDARY CASES (13 - 18)
  // ==========================================
  {
    name: 'Boundary/Corner: Get recommendations for non-existent job ID',
    fn: async ({ baseUrl, assert }) => {
      const res = await fetch(`${baseUrl}/matching/recommend/job_nonexistent`);
      assert.strictEqual(res.status, 404);
      const data = await res.json();
      assert.ok(data.error.includes('not found'));
    }
  },
  {
    name: 'Boundary/Corner: Get recommendations when no freelancers are registered',
    fn: async ({ baseUrl, assert }) => {
      // Create job
      const jobRes = await fetch(`${baseUrl}/job`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'Empty Recs Job', budget: 100, clientId: 'user_1', skillsRequired: ['Node.js'] })
      });
      const job = await jobRes.json();

      const res = await fetch(`${baseUrl}/matching/recommend/${job.id}`);
      assert.strictEqual(res.status, 200);
      const recommendations = await res.json();
      assert.ok(Array.isArray(recommendations));
      assert.strictEqual(recommendations.length, 0);
    }
  },
  {
    name: 'Boundary/Corner: Get Done Score for non-existent user ID',
    fn: async ({ baseUrl, assert }) => {
      const res = await fetch(`${baseUrl}/matching/donescore/user_nonexistent`);
      assert.strictEqual(res.status, 404);
      const data = await res.json();
      assert.ok(data.error.includes('not found'));
    }
  },
  {
    name: 'Boundary/Corner: Get Done Score for user with invalid role client',
    fn: async ({ baseUrl, assert }) => {
      const reg = await fetch(`${baseUrl}/user/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'client_ds_err@test.com', password: 'pwd', name: 'Client DS Err', role: 'client' })
      });
      const regData = await reg.json();
      const userId = regData.user.id;

      // Note: mock-server gets Done Score for any user, but completedCount is based on applications where freelancerId matches.
      // Let's verify it still succeeds with 0 completed applications, returning a default score.
      const res = await fetch(`${baseUrl}/matching/donescore/${userId}`);
      assert.strictEqual(res.status, 200);
      const data = await res.json();
      assert.strictEqual(data.userId, userId);
      assert.ok(data.doneScore > 0);
    }
  },
  {
    name: 'Boundary/Corner: Verify Done Score formula bounds (between 0 and 100)',
    fn: async ({ baseUrl, assert }) => {
      const reg = await fetch(`${baseUrl}/user/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'bounds_ds@test.com', password: 'pwd', name: 'Bounds DS', role: 'freelancer' })
      });
      const regData = await reg.json();
      const userId = regData.user.id;

      const res = await fetch(`${baseUrl}/matching/donescore/${userId}`);
      const data = await res.json();
      assert.ok(data.doneScore >= 0);
      assert.ok(data.doneScore <= 100);
    }
  },
  {
    name: 'Boundary/Corner: Complete multiple applications and check Done Score limits',
    fn: async ({ baseUrl, assert }) => {
      // Done Score completedCount maxes out in formulas at some point.
      // Let's register freelancer and verify Done Score calculation is correct after multiple completions.
      const reg = await fetch(`${baseUrl}/user/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'limit_ds@test.com', password: 'pwd', name: 'Limit DS', role: 'freelancer' })
      });
      const regData = await reg.json();
      const userId = regData.user.id;

      for (let i = 0; i < 6; i++) {
        const jobRes = await fetch(`${baseUrl}/job`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: `Limit DS Job ${i}`, budget: 100, clientId: 'client' })
        });
        const job = await jobRes.json();

        const applyRes = await fetch(`${baseUrl}/job/${job.id}/apply`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ freelancerId: userId, proposal: 'Proposal' })
        });
        const app = await applyRes.json();

        await fetch(`${baseUrl}/application/${app.id}/complete`, { method: 'POST' });
      }

      const res = await fetch(`${baseUrl}/matching/donescore/${userId}`);
      const data = await res.json();
      assert.ok(data.doneScore <= 100);
    }
  },

  // ==========================================
  // MESSAGING MODULE BOUNDARY CASES (19 - 24)
  // ==========================================
  {
    name: 'Boundary/Corner: Send message with missing senderId',
    fn: async ({ baseUrl, assert }) => {
      const res = await fetch(`${baseUrl}/messaging/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          receiverId: 'u2',
          message: 'Hello'
        })
      });
      assert.strictEqual(res.status, 400);
      const data = await res.json();
      assert.ok(data.error.includes('required'));
    }
  },
  {
    name: 'Boundary/Corner: Send message with missing receiverId',
    fn: async ({ baseUrl, assert }) => {
      const res = await fetch(`${baseUrl}/messaging/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          senderId: 'u1',
          message: 'Hello'
        })
      });
      assert.strictEqual(res.status, 400);
      const data = await res.json();
      assert.ok(data.error.includes('required'));
    }
  },
  {
    name: 'Boundary/Corner: Send message with missing message content',
    fn: async ({ baseUrl, assert }) => {
      const res = await fetch(`${baseUrl}/messaging/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          senderId: 'u1',
          receiverId: 'u2'
        })
      });
      assert.strictEqual(res.status, 400);
      const data = await res.json();
      assert.ok(data.error.includes('required'));
    }
  },
  {
    name: 'Boundary/Corner: Send message with invalid JSON payload',
    fn: async ({ baseUrl, assert }) => {
      const res = await fetch(`${baseUrl}/messaging/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: '{invalid_json'
      });
      assert.strictEqual(res.status, 400);
      const data = await res.json();
      assert.strictEqual(data.error, 'Invalid JSON');
    }
  },
  {
    name: 'Boundary/Corner: Retrieve conversations when no conversations exist',
    fn: async ({ baseUrl, assert }) => {
      const res = await fetch(`${baseUrl}/messaging/conversations`);
      assert.strictEqual(res.status, 200);
      const data = await res.json();
      assert.ok(Array.isArray(data));
      assert.strictEqual(data.length, 0);
    }
  },
  {
    name: 'Boundary/Corner: Send message to self (senderId === receiverId)',
    fn: async ({ baseUrl, assert }) => {
      const res = await fetch(`${baseUrl}/messaging/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          senderId: 'u1',
          receiverId: 'u1',
          message: 'Self note'
        })
      });
      assert.strictEqual(res.status, 201);
      const msg = await res.json();
      assert.strictEqual(msg.senderId, 'u1');
      assert.strictEqual(msg.receiverId, 'u1');
    }
  },

  // ==========================================
  // PAYMENT MODULE BOUNDARY CASES (25 - 30)
  // ==========================================
  {
    name: 'Boundary/Corner: Fund escrow with negative amount',
    fn: async ({ baseUrl, assert }) => {
      const res = await fetch(`${baseUrl}/payment/escrow/fund`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobId: 'job_1',
          clientId: 'client_1',
          freelancerId: 'free_1',
          amount: -500
        })
      });
      assert.strictEqual(res.status, 400);
      const data = await res.json();
      assert.strictEqual(data.error, 'amount must be a non-negative number');
    }
  },
  {
    name: 'Boundary/Corner: Fund escrow with missing amount',
    fn: async ({ baseUrl, assert }) => {
      const res = await fetch(`${baseUrl}/payment/escrow/fund`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobId: 'job_1',
          clientId: 'client_1',
          freelancerId: 'free_1'
          // amount is missing
        })
      });
      assert.strictEqual(res.status, 400);
      const data = await res.json();
      assert.ok(data.error.includes('required'));
    }
  },
  {
    name: 'Boundary/Corner: Fund escrow with invalid JSON payload',
    fn: async ({ baseUrl, assert }) => {
      const res = await fetch(`${baseUrl}/payment/escrow/fund`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: '{invalid_json'
      });
      assert.strictEqual(res.status, 400);
      const data = await res.json();
      assert.strictEqual(data.error, 'Invalid JSON');
    }
  },
  {
    name: 'Boundary/Corner: Release escrow with missing transactionId',
    fn: async ({ baseUrl, assert }) => {
      const res = await fetch(`${baseUrl}/payment/escrow/release`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          // transactionId is missing
        })
      });
      assert.strictEqual(res.status, 400);
      const data = await res.json();
      assert.strictEqual(data.error, 'transactionId is required');
    }
  },
  {
    name: 'Boundary/Corner: Release non-existent escrow transaction ID',
    fn: async ({ baseUrl, assert }) => {
      const res = await fetch(`${baseUrl}/payment/escrow/release`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transactionId: 'tx_nonexistent'
        })
      });
      assert.strictEqual(res.status, 404);
      const data = await res.json();
      assert.ok(data.error.includes('not found'));
    }
  },
  {
    name: 'Boundary/Corner: Release escrow with negative amount in body parameter',
    fn: async ({ baseUrl, assert }) => {
      const res = await fetch(`${baseUrl}/payment/escrow/release`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transactionId: 'tx_1',
          amount: -100 // invalid negative release amount
        })
      });
      assert.strictEqual(res.status, 400);
      const data = await res.json();
      assert.strictEqual(data.error, 'amount must be a non-negative number');
    }
  }
];
