module.exports = [
  {
    name: 'Job Module: Create a job post successfully',
    fn: async ({ baseUrl, assert }) => {
      const createRes = await fetch(`${baseUrl}/job`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'Build NestJS API',
          description: 'Need a developer to build REST endpoints',
          budget: 500,
          clientId: 'user_1',
          skillsRequired: ['Node.js', 'NestJS']
        })
      });
      assert.strictEqual(createRes.status, 201);
      const job = await createRes.json();
      assert.ok(job.id);
      assert.strictEqual(job.title, 'Build NestJS API');
      assert.strictEqual(job.budget, 500);
      assert.strictEqual(job.status, 'open');
    }
  },
  {
    name: 'Job Module: List all job posts',
    fn: async ({ baseUrl, assert }) => {
      // Create first
      const createRes = await fetch(`${baseUrl}/job`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'List Test Job',
          budget: 200,
          clientId: 'user_1'
        })
      });
      const createdJob = await createRes.json();

      // List
      const listRes = await fetch(`${baseUrl}/job`);
      assert.strictEqual(listRes.status, 200);
      const jobs = await listRes.json();
      assert.ok(Array.isArray(jobs));
      assert.ok(jobs.some(j => j.id === createdJob.id));
    }
  },
  {
    name: 'Job Module: Apply to a job',
    fn: async ({ baseUrl, assert }) => {
      const createRes = await fetch(`${baseUrl}/job`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'React Dashboard',
          budget: 1200,
          clientId: 'user_1'
        })
      });
      const job = await createRes.json();

      const applyRes = await fetch(`${baseUrl}/job/${job.id}/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          freelancerId: 'user_2',
          proposal: 'I can build this in 5 days'
        })
      });
      assert.strictEqual(applyRes.status, 201);
      const app = await applyRes.json();
      assert.ok(app.id);
      assert.strictEqual(app.jobId, job.id);
      assert.strictEqual(app.freelancerId, 'user_2');
      assert.strictEqual(app.status, 'applied');
    }
  },
  {
    name: 'Job Module: Complete application via application ID endpoint',
    fn: async ({ baseUrl, assert }) => {
      // Create job
      const createRes = await fetch(`${baseUrl}/job`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'Application Complete Test', budget: 100, clientId: 'user_1' })
      });
      const job = await createRes.json();

      // Apply
      const applyRes = await fetch(`${baseUrl}/job/${job.id}/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ freelancerId: 'user_2', proposal: 'Bid' })
      });
      const app = await applyRes.json();

      // Complete application
      const completeRes = await fetch(`${baseUrl}/application/${app.id}/complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      });
      assert.strictEqual(completeRes.status, 200);
      const updatedApp = await completeRes.json();
      assert.strictEqual(updatedApp.id, app.id);
      assert.strictEqual(updatedApp.status, 'completed');
    }
  },
  {
    name: 'Job Module: Complete application via job/application ID endpoint',
    fn: async ({ baseUrl, assert }) => {
      // Create job
      const createRes = await fetch(`${baseUrl}/job`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'Job Application Complete Test', budget: 100, clientId: 'user_1' })
      });
      const job = await createRes.json();

      // Apply
      const applyRes = await fetch(`${baseUrl}/job/${job.id}/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ freelancerId: 'user_2', proposal: 'Bid' })
      });
      const app = await applyRes.json();

      // Complete application via job endpoint
      const completeRes = await fetch(`${baseUrl}/job/${job.id}/application/${app.id}/complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      });
      assert.strictEqual(completeRes.status, 200);
      const updatedApp = await completeRes.json();
      assert.strictEqual(updatedApp.id, app.id);
      assert.strictEqual(updatedApp.status, 'completed');
    }
  },
  {
    name: 'Job Module: Create multiple jobs and verify multiple applications',
    fn: async ({ baseUrl, assert }) => {
      const jobs = [];
      for (let i = 0; i < 3; i++) {
        const createRes = await fetch(`${baseUrl}/job`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: `Multi Job ${i}`, budget: 100 + i * 50, clientId: 'user_1' })
        });
        jobs.push(await createRes.json());
      }
      assert.strictEqual(jobs.length, 3);

      const appRes = await fetch(`${baseUrl}/job/${jobs[0].id}/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ freelancerId: 'user_2', proposal: 'Bid' })
      });
      assert.strictEqual(appRes.status, 201);
    }
  }
];
