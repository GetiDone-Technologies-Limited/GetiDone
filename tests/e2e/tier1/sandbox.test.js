module.exports = [
  {
    name: 'Sandbox Module: GET /sandbox/state returns active sandbox configuration',
    fn: async ({ baseUrl, assert }) => {
      const res = await fetch(`${baseUrl}/sandbox/state`);
      assert.strictEqual(res.status, 200);
      const data = await res.json();
      assert.strictEqual(data.environment, 'GETIDONE_DEVELOPER_SANDBOX');
      assert.strictEqual(data.status, 'ACTIVE');
      assert.strictEqual(data.testGatesStatus, 'READY');
      assert.strictEqual(data.webSocketsEngine, 'ONLINE');
    }
  },
  {
    name: 'Sandbox Module: POST /sandbox/payment simulates financial scenario',
    fn: async ({ baseUrl, assert }) => {
      const res = await fetch(`${baseUrl}/sandbox/payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: 400,
          reference: `SBOX-REF-SIM-${Date.now()}`,
          scenario: 'PARTIAL'
        })
      });
      assert.strictEqual(res.status, 201);
      const data = await res.json();
      assert.strictEqual(data.invoice.paidAmount, 400);
    }
  },
  {
    name: 'Sandbox Module: POST /sandbox/test-gate simulates Playwright test gate run',
    fn: async ({ baseUrl, assert }) => {
      const res = await fetch(`${baseUrl}/sandbox/test-gate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId: 'proj_sbox_101',
          passRate: 100
        })
      });
      assert.strictEqual(res.status, 201);
      const data = await res.json();
      assert.strictEqual(data.status, 'PASSED_100_PERCENT');
      assert.strictEqual(data.escrowAction, 'AUTO_RELEASED');
    }
  },
  {
    name: 'Sandbox Module: POST /sandbox/attack triggers cyber threat simulation',
    fn: async ({ baseUrl, assert }) => {
      const res = await fetch(`${baseUrl}/sandbox/attack`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          attackType: 'SQL_INJECTION',
          payload: "UNION SELECT * FROM users WHERE '1'='1'"
        })
      });
      assert.strictEqual(res.status, 201);
      const data = await res.json();
      assert.strictEqual(data.simulationResult, 'BLOCKED_BY_SECURITY_GUARD');
      assert.ok(data.securityAlert.alertId);
    }
  },
  {
    name: 'Sandbox Module: POST /sandbox/reset re-initializes sandbox environment',
    fn: async ({ baseUrl, assert }) => {
      const res = await fetch(`${baseUrl}/sandbox/reset`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      assert.strictEqual(res.status, 201);
      const data = await res.json();
      assert.strictEqual(data.status, 'RESET_SUCCESSFUL');
    }
  }
];
