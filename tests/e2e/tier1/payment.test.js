module.exports = [
  {
    name: 'Payment Module: Fund escrow successfully',
    fn: async ({ baseUrl, assert }) => {
      const fundRes = await fetch(`${baseUrl}/payment/escrow/fund`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobId: 'job_123',
          clientId: 'user_client',
          freelancerId: 'user_freelancer',
          amount: 250
        })
      });
      assert.strictEqual(fundRes.status, 201);
      const escrow = await fundRes.json();
      assert.ok(escrow.transactionId);
      assert.strictEqual(escrow.status, 'funded');
      assert.strictEqual(escrow.amount, 250);
    }
  },
  {
    name: 'Payment Module: Release escrow successfully',
    fn: async ({ baseUrl, assert }) => {
      const fundRes = await fetch(`${baseUrl}/payment/escrow/fund`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobId: 'job_123',
          clientId: 'user_client',
          freelancerId: 'user_freelancer',
          amount: 250
        })
      });
      const escrow = await fundRes.json();

      const releaseRes = await fetch(`${baseUrl}/payment/escrow/release`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transactionId: escrow.transactionId
        })
      });
      assert.strictEqual(releaseRes.status, 200);
      const releasedEscrow = await releaseRes.json();
      assert.strictEqual(releasedEscrow.transactionId, escrow.transactionId);
      assert.strictEqual(releasedEscrow.status, 'released');
      assert.ok(releasedEscrow.releasedAt);
    }
  },
  {
    name: 'Payment Module: Release already released escrow returns HTTP 400',
    fn: async ({ baseUrl, assert }) => {
      const fundRes = await fetch(`${baseUrl}/payment/escrow/fund`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobId: 'job_123',
          clientId: 'user_client',
          freelancerId: 'user_freelancer',
          amount: 150
        })
      });
      const escrow = await fundRes.json();

      // First release
      await fetch(`${baseUrl}/payment/escrow/release`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transactionId: escrow.transactionId })
      });

      // Second release
      const releaseRes = await fetch(`${baseUrl}/payment/escrow/release`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transactionId: escrow.transactionId })
      });
      assert.strictEqual(releaseRes.status, 400);
      const data = await releaseRes.json();
      assert.strictEqual(data.error, 'Escrow already released');
    }
  },
  {
    name: 'Payment Module: Fund multiple escrows and check transaction ID sequence',
    fn: async ({ baseUrl, assert }) => {
      const txs = [];
      for (let i = 0; i < 2; i++) {
        const res = await fetch(`${baseUrl}/payment/escrow/fund`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ jobId: 'j', clientId: 'c', freelancerId: 'f', amount: 10 + i })
        });
        const data = await res.json();
        txs.push(data.transactionId);
      }
      assert.strictEqual(txs[0], 'tx_1');
      assert.strictEqual(txs[1], 'tx_2');
    }
  },
  {
    name: 'Payment Module: Fund escrow with amount 0',
    fn: async ({ baseUrl, assert }) => {
      const res = await fetch(`${baseUrl}/payment/escrow/fund`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobId: 'job_zero',
          clientId: 'c',
          freelancerId: 'f',
          amount: 0
        })
      });
      assert.strictEqual(res.status, 201);
      const data = await res.json();
      assert.strictEqual(data.amount, 0);
    }
  },
  {
    name: 'Payment Module: Escrow structure contains all required properties',
    fn: async ({ baseUrl, assert }) => {
      const res = await fetch(`${baseUrl}/payment/escrow/fund`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobId: 'job_prop',
          clientId: 'client_prop',
          freelancerId: 'free_prop',
          amount: 100
        })
      });
      const escrow = await res.json();
      assert.ok(escrow.transactionId);
      assert.strictEqual(escrow.jobId, 'job_prop');
      assert.strictEqual(escrow.clientId, 'client_prop');
      assert.strictEqual(escrow.freelancerId, 'free_prop');
      assert.strictEqual(escrow.amount, 100);
      assert.strictEqual(escrow.status, 'funded');
      assert.ok(escrow.createdAt);
    }
  }
];
