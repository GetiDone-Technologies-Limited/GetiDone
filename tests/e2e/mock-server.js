const http = require('http');

// In-memory State
let state = {
  users: [],
  jobs: [],
  applications: [],
  conversations: [],
  messages: [],
  escrows: []
};

// Helper to parse JSON body
function getJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      if (!body) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(body));
      } catch (err) {
        reject(new Error('Invalid JSON'));
      }
    });
  });
}

// Helper to send JSON response
function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

// Router
const server = http.createServer(async (req, res) => {
  const urlObj = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = urlObj.pathname;
  const method = req.method;

  try {
    // ----------------------------------------------------
    // DEBUG / TEST RUNNER UTILS
    // ----------------------------------------------------
    if (pathname === '/debug/clear' && method === 'POST') {
      state = {
        users: [],
        jobs: [],
        applications: [],
        conversations: [],
        messages: [],
        escrows: []
      };
      return sendJson(res, 200, { success: true, message: 'State cleared' });
    }

    if (pathname === '/debug/state' && method === 'GET') {
      return sendJson(res, 200, state);
    }

    // ----------------------------------------------------
    // USER MODULE
    // ----------------------------------------------------
    // POST /user/register
    if (pathname === '/user/register' && method === 'POST') {
      const body = await getJsonBody(req);
      const { email, password, name, role, skills } = body;
      
      if (!email || !password || !name || !role) {
        return sendJson(res, 400, { error: 'email, password, name, and role are required' });
      }

      if (typeof name !== 'string' || name.trim() === '') {
        return sendJson(res, 400, { error: 'name cannot be empty' });
      }

      if (role !== 'freelancer' && role !== 'client') {
        return sendJson(res, 400, { error: 'role must be either freelancer or client' });
      }

      // Check if user already exists
      const existing = state.users.find(u => u.email === email);
      if (existing) {
        return sendJson(res, 400, { error: 'User already exists' });
      }

      const user = {
        id: `user_${state.users.length + 1}`,
        email,
        password, // stored plain for mock purposes
        name,
        role,
        skills: skills || [],
        kycVerified: true,
        profileStatus: 'active'
      };
      state.users.push(user);

      // Return user without password
      const { password: _, ...userResponse } = user;
      return sendJson(res, 201, { success: true, user: userResponse });
    }

    // POST /user/login
    if (pathname === '/user/login' && method === 'POST') {
      const body = await getJsonBody(req);
      const { email, password } = body;

      if (!email || !password) {
        return sendJson(res, 400, { error: 'email and password are required' });
      }

      const user = state.users.find(u => u.email === email && u.password === password);
      if (!user) {
        return sendJson(res, 401, { error: 'Invalid credentials' });
      }

      return sendJson(res, 200, { success: true, token: `mock-jwt-token-for-${user.id}` });
    }

    // GET /user/profile/:id
    if (pathname.startsWith('/user/profile/') && method === 'GET') {
      const parts = pathname.split('/');
      const id = parts[parts.length - 1];

      const user = state.users.find(u => u.id === id);
      if (!user) {
        return sendJson(res, 404, { error: `User with ID ${id} not found` });
      }

      const { password: _, ...profile } = user;
      return sendJson(res, 200, profile);
    }

    // ----------------------------------------------------
    // JOB MODULE
    // ----------------------------------------------------
    // POST /job
    if (pathname === '/job' && method === 'POST') {
      const body = await getJsonBody(req);
      const { title, description, budget, clientId, skillsRequired } = body;

      if (!title || budget === undefined || budget === null || !clientId) {
        return sendJson(res, 400, { error: 'title, budget, and clientId are required' });
      }

      const numericBudget = Number(budget);
      if (isNaN(numericBudget) || numericBudget < 0) {
        return sendJson(res, 400, { error: 'budget must be a non-negative number' });
      }

      const job = {
        id: `job_${state.jobs.length + 1}`,
        title,
        description: description || '',
        budget: Number(budget),
        clientId,
        skillsRequired: skillsRequired || [],
        status: 'open',
        createdAt: new Date().toISOString()
      };
      state.jobs.push(job);

      return sendJson(res, 201, job);
    }

    // GET /job
    if (pathname === '/job' && method === 'GET') {
      return sendJson(res, 200, state.jobs);
    }

    // POST /job/:id/apply
    if (pathname.startsWith('/job/') && pathname.endsWith('/apply') && method === 'POST') {
      const parts = pathname.split('/');
      // /job/:id/apply -> parts = ["", "job", ":id", "apply"]
      const jobId = parts[2];
      
      const job = state.jobs.find(j => j.id === jobId);
      if (!job) {
        return sendJson(res, 404, { error: `Job with ID ${jobId} not found` });
      }

      const body = await getJsonBody(req);
      const { freelancerId, proposal } = body;

      if (!freelancerId || !proposal) {
        return sendJson(res, 400, { error: 'freelancerId and proposal are required' });
      }

      const application = {
        id: `app_${state.applications.length + 1}`,
        jobId,
        freelancerId,
        proposal,
        status: 'applied',
        createdAt: new Date().toISOString()
      };
      state.applications.push(application);

      return sendJson(res, 201, application);
    }

    // POST /job/:jobId/application/:appId/complete
    if (pathname.startsWith('/job/') && pathname.includes('/application/') && pathname.endsWith('/complete') && method === 'POST') {
      const parts = pathname.split('/');
      // /job/:jobId/application/:appId/complete -> parts = ["", "job", ":jobId", "application", ":appId", "complete"]
      const jobId = parts[2];
      const appId = parts[4];
      const application = state.applications.find(a => a.id === appId && a.jobId === jobId);
      if (!application) {
        return sendJson(res, 404, { error: `Application with ID ${appId} for job ${jobId} not found` });
      }
      application.status = 'completed';
      return sendJson(res, 200, application);
    }

    // POST /application/:id/complete
    if (pathname.startsWith('/application/') && pathname.endsWith('/complete') && method === 'POST') {
      const parts = pathname.split('/');
      // /application/:id/complete -> parts = ["", "application", ":id", "complete"]
      const id = parts[2];
      const application = state.applications.find(a => a.id === id);
      if (!application) {
        return sendJson(res, 404, { error: `Application with ID ${id} not found` });
      }
      application.status = 'completed';
      return sendJson(res, 200, application);
    }

    // ----------------------------------------------------
    // MATCHING MODULE
    // ----------------------------------------------------
    // GET /matching/recommend/:jobId
    if (pathname.startsWith('/matching/recommend/') && method === 'GET') {
      const parts = pathname.split('/');
      const jobId = parts[parts.length - 1];

      const job = state.jobs.find(j => j.id === jobId);
      if (!job) {
        return sendJson(res, 404, { error: `Job with ID ${jobId} not found` });
      }

      // Recommend freelancers based on skill overlaps
      const jobSkills = job.skillsRequired || [];
      const freelancers = state.users.filter(u => u.role === 'freelancer');

      const recommendations = freelancers.map(freelancer => {
        const freelancerSkills = freelancer.skills || [];
        const overlap = freelancerSkills.filter(s => jobSkills.includes(s));
        
        let matchPercentage = 0;
        if (jobSkills.length > 0) {
          matchPercentage = Math.round((overlap.length / jobSkills.length) * 100);
        } else {
          matchPercentage = 100; // default to 100 if no skills required
        }

        return {
          freelancer: {
            id: freelancer.id,
            name: freelancer.name,
            skills: freelancer.skills
          },
          matchPercentage
        };
      }).sort((a, b) => b.matchPercentage - a.matchPercentage); // highest match first

      return sendJson(res, 200, recommendations);
    }

    // GET /matching/donescore/:userId
    if (pathname.startsWith('/matching/donescore/') && method === 'GET') {
      const parts = pathname.split('/');
      const userId = parts[parts.length - 1];

      const user = state.users.find(u => u.id === userId);
      if (!user) {
        return sendJson(res, 404, { error: `User with ID ${userId} not found` });
      }

      // Calculate Done Score dynamically based on user data
      // For instance, count completed jobs or applications, and provide varying scores
      const completedCount = state.applications.filter(a => a.freelancerId === userId && a.status === 'completed').length;
      
      const reviewScore = 4.0 + Math.min(completedCount * 0.2, 1.0);
      const completionRate = completedCount > 0 ? 0.90 + Math.min(completedCount * 0.02, 0.10) : 0.85;
      const timeliness = 0.90 + Math.min(completedCount * 0.02, 0.10);
      const qa = 0.88 + Math.min(completedCount * 0.02, 0.12);
      const trust = 0.95;
      const engagement = 0.80 + Math.min(completedCount * 0.05, 0.20);

      // Done score formula
      const doneScoreVal = Math.round((reviewScore / 5 * 30) + (completionRate * 20) + (timeliness * 15) + (qa * 15) + (trust * 10) + (engagement * 10));

      return sendJson(res, 200, {
        userId,
        doneScore: doneScoreVal,
        metrics: {
          review: Math.round(reviewScore * 100) / 100,
          completion: Math.round(completionRate * 100) / 100,
          timeliness: Math.round(timeliness * 100) / 100,
          qa: Math.round(qa * 100) / 100,
          trust: Math.round(trust * 100) / 100,
          engagement: Math.round(engagement * 100) / 100
        }
      });
    }

    // ----------------------------------------------------
    // MESSAGING MODULE
    // ----------------------------------------------------
    // GET /messaging/conversations
    if (pathname === '/messaging/conversations' && method === 'GET') {
      // In a real app, query by logged-in user. For this mock, we return all active conversations.
      return sendJson(res, 200, state.conversations);
    }

    // POST /messaging/send
    if (pathname === '/messaging/send' && method === 'POST') {
      const body = await getJsonBody(req);
      const { senderId, receiverId, message } = body;

      if (!senderId || !receiverId || !message) {
        return sendJson(res, 400, { error: 'senderId, receiverId, and message are required' });
      }

      // Find or create conversation
      let conversation = state.conversations.find(c =>
        c.participantIds.includes(senderId) && c.participantIds.includes(receiverId)
      );

      if (!conversation) {
        conversation = {
          conversationId: `conv_${state.conversations.length + 1}`,
          participantIds: [senderId, receiverId],
          lastMessage: message,
          updatedAt: new Date().toISOString()
        };
        state.conversations.push(conversation);
      } else {
        conversation.lastMessage = message;
        conversation.updatedAt = new Date().toISOString();
      }

      const msg = {
        id: `msg_${state.messages.length + 1}`,
        conversationId: conversation.conversationId,
        senderId,
        receiverId,
        message,
        createdAt: new Date().toISOString()
      };
      state.messages.push(msg);

      return sendJson(res, 201, msg);
    }

    // ----------------------------------------------------
    // PAYMENT MODULE
    // ----------------------------------------------------
    // POST /payment/escrow/fund
    if (pathname === '/payment/escrow/fund' && method === 'POST') {
      const body = await getJsonBody(req);
      const { jobId, clientId, freelancerId, amount } = body;

      if (!jobId || !clientId || !freelancerId || amount === undefined || amount === null) {
        return sendJson(res, 400, { error: 'jobId, clientId, freelancerId, and amount are required' });
      }

      const numericAmount = Number(amount);
      if (isNaN(numericAmount) || numericAmount < 0) {
        return sendJson(res, 400, { error: 'amount must be a non-negative number' });
      }

      const escrow = {
        transactionId: `tx_${state.escrows.length + 1}`,
        jobId,
        clientId,
        freelancerId,
        amount: Number(amount),
        status: 'funded',
        createdAt: new Date().toISOString()
      };
      state.escrows.push(escrow);

      return sendJson(res, 201, escrow);
    }

    // POST /payment/escrow/release
    if (pathname === '/payment/escrow/release' && method === 'POST') {
      const body = await getJsonBody(req);
      const { transactionId } = body;

      if (!transactionId) {
        return sendJson(res, 400, { error: 'transactionId is required' });
      }

      if (body.amount !== undefined && body.amount !== null) {
        const releaseAmt = Number(body.amount);
        if (isNaN(releaseAmt) || releaseAmt < 0) {
          return sendJson(res, 400, { error: 'amount must be a non-negative number' });
        }
      }

      const escrow = state.escrows.find(e => e.transactionId === transactionId);
      if (!escrow) {
        return sendJson(res, 404, { error: `Transaction with ID ${transactionId} not found` });
      }

      if (escrow.status === 'released') {
        return sendJson(res, 400, { error: 'Escrow already released' });
      }

      escrow.status = 'released';
      escrow.releasedAt = new Date().toISOString();

      return sendJson(res, 200, escrow);
    }

    // Fallback: Not Found
    return sendJson(res, 404, { error: 'Endpoint not found' });

  } catch (err) {
    if (err.message === 'Invalid JSON') {
      return sendJson(res, 400, { error: 'Invalid JSON' });
    }
    console.error('Mock server error:', err);
    return sendJson(res, 500, { error: err.message || 'Internal server error' });
  }
});

// Run server if called directly
if (require.main === module) {
  const port = process.env.PORT || 3001;
  server.listen(port, () => {
    console.log(`Mock REST server running on port ${port}`);
  });
}

module.exports = server;
