module.exports = [
  {
    name: 'Security Engine: SQL Injection payload in URL parameter is blocked with HTTP 403 and triggers intrusion alert',
    fn: async ({ baseUrl, assert }) => {
      const res = await fetch(`${baseUrl}/job?title=UNION%20SELECT%20*%20FROM%20users`);
      assert.strictEqual(res.status, 403);
      const data = await res.json();
      assert.strictEqual(data.error, 'Security Vulnerability Blocked');
      assert.ok(data.alertId);
    }
  },
  {
    name: 'Security Engine: XSS script injection payload in URL is blocked with HTTP 403',
    fn: async ({ baseUrl, assert }) => {
      const res = await fetch(`${baseUrl}/user/profile?name=%3Cscript%3Ealert(1)%3C/script%3E`);
      assert.strictEqual(res.status, 403);
      const data = await res.json();
      assert.strictEqual(data.error, 'Security Vulnerability Blocked');
    }
  },
  {
    name: 'Security Engine: Path traversal attempt is blocked with HTTP 403',
    fn: async ({ baseUrl, assert }) => {
      const res = await fetch(`${baseUrl}/job/..%2f..%2fetc%2fpasswd`);
      assert.strictEqual(res.status, 403);
      const data = await res.json();
      assert.strictEqual(data.error, 'Security Vulnerability Blocked');
    }
  },
  {
    name: 'Security Engine: GET /security/alerts retrieves all blocked threat incident records',
    fn: async ({ baseUrl, assert }) => {
      // Trigger a attack payload
      await fetch(`${baseUrl}/job?title=UNION%20SELECT%20*%20FROM%20users`);

      const res = await fetch(`${baseUrl}/security/alerts`);
      assert.strictEqual(res.status, 200);
      const data = await res.json();
      assert.strictEqual(data.status, 'VERIFIED_SECURE');
      assert.ok(Array.isArray(data.alerts));
      assert.ok(data.totalActiveAlerts >= 1);
      assert.strictEqual(data.alerts[0].type, 'SQL_INJECTION');
      assert.strictEqual(data.alerts[0].severity, 'CRITICAL');
    }
  }
];
