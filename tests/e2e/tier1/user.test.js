module.exports = [
  {
    name: 'User Module: Register client successfully',
    fn: async ({ baseUrl, assert }) => {
      const res = await fetch(`${baseUrl}/user/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'client@getidone.com',
          password: 'securePassword123',
          name: 'Alice Client',
          role: 'client'
        })
      });
      assert.strictEqual(res.status, 201);
      const data = await res.json();
      assert.strictEqual(data.success, true);
      assert.strictEqual(data.user.email, 'client@getidone.com');
      assert.strictEqual(data.user.role, 'client');
      assert.ok(data.user.id);
    }
  },
  {
    name: 'User Module: Register freelancer successfully',
    fn: async ({ baseUrl, assert }) => {
      const res = await fetch(`${baseUrl}/user/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'freelancer@getidone.com',
          password: 'devPassword999',
          name: 'Bob Developer',
          role: 'freelancer',
          skills: ['Node.js', 'React', 'TypeScript']
        })
      });
      assert.strictEqual(res.status, 201);
      const data = await res.json();
      assert.strictEqual(data.success, true);
      assert.strictEqual(data.user.email, 'freelancer@getidone.com');
      assert.strictEqual(data.user.role, 'freelancer');
      assert.deepStrictEqual(data.user.skills, ['Node.js', 'React', 'TypeScript']);
    }
  },
  {
    name: 'User Module: Login with valid credentials',
    fn: async ({ baseUrl, assert }) => {
      await fetch(`${baseUrl}/user/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'auth_test@getidone.com',
          password: 'password123',
          name: 'Auth Test User',
          role: 'client'
        })
      });

      const res = await fetch(`${baseUrl}/user/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'auth_test@getidone.com',
          password: 'password123'
        })
      });
      assert.strictEqual(res.status, 200);
      const data = await res.json();
      assert.strictEqual(data.success, true);
      assert.ok(data.token);
    }
  },
  {
    name: 'User Module: Get profile by ID',
    fn: async ({ baseUrl, assert }) => {
      const registerRes = await fetch(`${baseUrl}/user/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'profile_test@getidone.com',
          password: 'password123',
          name: 'Profile Test User',
          role: 'freelancer',
          skills: ['Rust']
        })
      });
      const registerData = await registerRes.json();
      const userId = registerData.user.id;

      const res = await fetch(`${baseUrl}/user/profile/${userId}`);
      assert.strictEqual(res.status, 200);
      const profile = await res.json();
      assert.strictEqual(profile.id, userId);
      assert.strictEqual(profile.name, 'Profile Test User');
      assert.deepStrictEqual(profile.skills, ['Rust']);
      assert.strictEqual(profile.profileStatus, 'active');
      assert.strictEqual(profile.kycVerified, true);
    }
  },
  {
    name: 'User Module: Register multiple users and verify ID generation sequence',
    fn: async ({ baseUrl, assert }) => {
      const users = [
        { email: 'u1@test.com', password: 'pwd', name: 'User One', role: 'client' },
        { email: 'u2@test.com', password: 'pwd', name: 'User Two', role: 'freelancer' }
      ];
      const ids = [];
      for (const u of users) {
        const res = await fetch(`${baseUrl}/user/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(u)
        });
        const data = await res.json();
        ids.push(data.user.id);
      }
      assert.strictEqual(ids[0], 'user_1');
      assert.strictEqual(ids[1], 'user_2');
    }
  },
  {
    name: 'User Module: E2E register, login and profile fetch flow',
    fn: async ({ baseUrl, assert }) => {
      const email = 'e2eflow@test.com';
      const password = 'mySecretPassword';
      
      const reg = await fetch(`${baseUrl}/user/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name: 'E2E Flow User', role: 'client' })
      });
      assert.strictEqual(reg.status, 201);
      const regData = await reg.json();
      
      const login = await fetch(`${baseUrl}/user/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      assert.strictEqual(login.status, 200);
      const loginData = await login.json();
      assert.ok(loginData.token);

      const profile = await fetch(`${baseUrl}/user/profile/${regData.user.id}`);
      assert.strictEqual(profile.status, 200);
      const profData = await profile.json();
      assert.strictEqual(profData.name, 'E2E Flow User');
    }
  }
];
