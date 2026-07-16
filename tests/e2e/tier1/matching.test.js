module.exports = [
  {
    name: 'Matching Module: Get recommended freelancers sorted by match percentage',
    fn: async ({ baseUrl, assert }) => {
      // Register freelancers with different skills
      await fetch(`${baseUrl}/user/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'matching_f1@getidone.com',
          password: 'password',
          name: 'Freelancer One',
          role: 'freelancer',
          skills: ['Node.js', 'React']
        })
      });
      await fetch(`${baseUrl}/user/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'matching_f2@getidone.com',
          password: 'password',
          name: 'Freelancer Two',
          role: 'freelancer',
          skills: ['React']
        })
      });

      // Create job requiring Node.js and React
      const jobRes = await fetch(`${baseUrl}/job`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'Fullstack Job',
          budget: 1000,
          clientId: 'user_10',
          skillsRequired: ['Node.js', 'React']
        })
      });
      const job = await jobRes.json();

      const recRes = await fetch(`${baseUrl}/matching/recommend/${job.id}`);
      assert.strictEqual(recRes.status, 200);
      const recommendations = await recRes.json();
      
      assert.ok(Array.isArray(recommendations));
      assert.ok(recommendations.length >= 2);

      const rec1 = recommendations.find(r => r.freelancer.name === 'Freelancer One');
      const rec2 = recommendations.find(r => r.freelancer.name === 'Freelancer Two');

      assert.strictEqual(rec1.matchPercentage, 100);
      assert.strictEqual(rec2.matchPercentage, 50);
      // Verify ordering
      assert.strictEqual(recommendations[0].freelancer.name, 'Freelancer One');
    }
  },
  {
    name: 'Matching Module: Recommend freelancers for job with no skills required (100% match)',
    fn: async ({ baseUrl, assert }) => {
      await fetch(`${baseUrl}/user/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'any_skills@getidone.com',
          password: 'password',
          name: 'Any Skill Developer',
          role: 'freelancer',
          skills: ['Python']
        })
      });

      const jobRes = await fetch(`${baseUrl}/job`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'General Job',
          budget: 100,
          clientId: 'user_10',
          skillsRequired: []
        })
      });
      const job = await jobRes.json();

      const recRes = await fetch(`${baseUrl}/matching/recommend/${job.id}`);
      const recommendations = await recRes.json();
      const match = recommendations.find(r => r.freelancer.name === 'Any Skill Developer');
      assert.strictEqual(match.matchPercentage, 100);
    }
  },
  {
    name: 'Matching Module: Recommend freelancers with 0% overlap',
    fn: async ({ baseUrl, assert }) => {
      await fetch(`${baseUrl}/user/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'no_overlap@getidone.com',
          password: 'password',
          name: 'No Overlap Developer',
          role: 'freelancer',
          skills: ['Fortran']
        })
      });

      const jobRes = await fetch(`${baseUrl}/job`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'Modern Job',
          budget: 100,
          clientId: 'user_10',
          skillsRequired: ['TypeScript']
        })
      });
      const job = await jobRes.json();

      const recRes = await fetch(`${baseUrl}/matching/recommend/${job.id}`);
      const recommendations = await recRes.json();
      const match = recommendations.find(r => r.freelancer.name === 'No Overlap Developer');
      assert.strictEqual(match.matchPercentage, 0);
    }
  },
  {
    name: 'Matching Module: Initial Done Score for new user',
    fn: async ({ baseUrl, assert }) => {
      const registerRes = await fetch(`${baseUrl}/user/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'donescore_user@getidone.com',
          password: 'password',
          name: 'DoneScore User',
          role: 'freelancer'
        })
      });
      const registerData = await registerRes.json();
      const userId = registerData.user.id;

      const res = await fetch(`${baseUrl}/matching/donescore/${userId}`);
      assert.strictEqual(res.status, 200);
      const data = await res.json();
      assert.strictEqual(data.userId, userId);
      assert.ok(data.doneScore > 0);
      assert.strictEqual(data.metrics.review, 4.0);
      assert.strictEqual(data.metrics.completion, 0.85);
    }
  },
  {
    name: 'Matching Module: Done Score changes dynamically when jobs are completed',
    fn: async ({ baseUrl, assert }) => {
      // 1. Register client and freelancer
      const clientReg = await fetch(`${baseUrl}/user/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'client_ds@test.com', password: 'pwd', name: 'Client DS', role: 'client' })
      });
      const clientData = await clientReg.json();

      const freelancerReg = await fetch(`${baseUrl}/user/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'free_ds@test.com', password: 'pwd', name: 'Freelancer DS', role: 'freelancer' })
      });
      const freelancerData = await freelancerReg.json();
      const fId = freelancerData.user.id;

      // 2. Fetch initial score
      const initialRes = await fetch(`${baseUrl}/matching/donescore/${fId}`);
      const initialData = await initialRes.json();
      const initialScore = initialData.doneScore;

      // 3. Create job & application
      const jobRes = await fetch(`${baseUrl}/job`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'DS Job 1', budget: 100, clientId: clientData.user.id })
      });
      const job = await jobRes.json();

      const applyRes = await fetch(`${baseUrl}/job/${job.id}/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ freelancerId: fId, proposal: 'Hello' })
      });
      const app = await applyRes.json();

      // 4. Mark application completed
      await fetch(`${baseUrl}/application/${app.id}/complete`, { method: 'POST' });

      // 5. Fetch updated score
      const updatedRes = await fetch(`${baseUrl}/matching/donescore/${fId}`);
      const updatedData = await updatedRes.json();
      const updatedScore = updatedData.doneScore;

      assert.ok(updatedScore > initialScore, `Updated score ${updatedScore} should be higher than initial ${initialScore}`);
    }
  },
  {
    name: 'Matching Module: Done Score metrics change proportionally with multiple completed jobs',
    fn: async ({ baseUrl, assert }) => {
      const freelancerReg = await fetch(`${baseUrl}/user/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'multi_ds@test.com', password: 'pwd', name: 'Multi DS', role: 'freelancer' })
      });
      const freelancerData = await freelancerReg.json();
      const fId = freelancerData.user.id;

      // Complete 2 jobs
      for (let i = 0; i < 2; i++) {
        const jobRes = await fetch(`${baseUrl}/job`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: `DS Job ${i}`, budget: 100, clientId: 'client_ds' })
        });
        const job = await jobRes.json();

        const applyRes = await fetch(`${baseUrl}/job/${job.id}/apply`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ freelancerId: fId, proposal: 'Hello' })
        });
        const app = await applyRes.json();

        await fetch(`${baseUrl}/application/${app.id}/complete`, { method: 'POST' });
      }

      const res = await fetch(`${baseUrl}/matching/donescore/${fId}`);
      const data = await res.json();
      
      // With completedCount = 2:
      // reviewScore = 4.0 + min(2 * 0.2, 1.0) = 4.4
      // completionRate = 0.90 + min(2 * 0.02, 0.10) = 0.94
      assert.strictEqual(data.metrics.review, 4.4);
      assert.strictEqual(data.metrics.completion, 0.94);
    }
  }
];
