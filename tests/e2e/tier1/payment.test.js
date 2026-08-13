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
  },

  /* ---------------- Foundational Financial Business Rules Tests ---------------- */

  {
    name: 'Financial Payment: Partial Payment reduces outstanding balance and sets status PARTIALLY_PAID',
    fn: async ({ baseUrl, assert }) => {
      // Step 1: Create Invoice of $1,000
      const invRes = await fetch(`${baseUrl}/payment/invoice`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: 'cust_101', serviceId: 'serv_201', totalAmount: 1000 })
      });
      assert.strictEqual(invRes.status, 201);
      const invoice = await invRes.json();
      assert.strictEqual(invoice.totalAmount, 1000);
      assert.strictEqual(invoice.outstandingBalance, 1000);
      assert.strictEqual(invoice.status, 'UNPAID');

      // Step 2: Make Partial Payment of $400
      const payRes = await fetch(`${baseUrl}/payment/process`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          invoiceId: invoice.id,
          userId: 'cust_101',
          serviceId: 'serv_201',
          amount: 400,
          reference: `REF-PARTIAL-${Date.now()}`
        })
      });
      assert.strictEqual(payRes.status, 201);
      const result = await payRes.json();
      assert.strictEqual(result.invoice.paidAmount, 400);
      assert.strictEqual(result.invoice.outstandingBalance, 600);
      assert.strictEqual(result.invoice.status, 'PARTIALLY_PAID');
    }
  },

  {
    name: 'Financial Payment: Final Payment sets outstanding balance to 0 and marks invoice as PAID',
    fn: async ({ baseUrl, assert }) => {
      // Step 1: Create Invoice of $500
      const invRes = await fetch(`${baseUrl}/payment/invoice`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: 'cust_102', serviceId: 'serv_202', totalAmount: 500 })
      });
      const invoice = await invRes.json();

      // Step 2: Make Final Payment of $500
      const payRes = await fetch(`${baseUrl}/payment/process`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          invoiceId: invoice.id,
          userId: 'cust_102',
          serviceId: 'serv_202',
          amount: 500,
          reference: `REF-FINAL-${Date.now()}`
        })
      });
      assert.strictEqual(payRes.status, 201);
      const result = await payRes.json();
      assert.strictEqual(result.invoice.paidAmount, 500);
      assert.strictEqual(result.invoice.outstandingBalance, 0);
      assert.strictEqual(result.invoice.status, 'PAID');
    }
  },

  {
    name: 'Financial Payment: Overpayment exceeding outstanding balance is rejected with HTTP 400',
    fn: async ({ baseUrl, assert }) => {
      // Step 1: Create Invoice of $300
      const invRes = await fetch(`${baseUrl}/payment/invoice`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: 'cust_103', serviceId: 'serv_203', totalAmount: 300 })
      });
      const invoice = await invRes.json();

      // Step 2: Attempt Overpayment of $350 (exceeding $300 balance)
      const payRes = await fetch(`${baseUrl}/payment/process`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          invoiceId: invoice.id,
          userId: 'cust_103',
          serviceId: 'serv_203',
          amount: 350,
          reference: `REF-OVERPAY-${Date.now()}`
        })
      });
      assert.strictEqual(payRes.status, 400);
      const err = await payRes.json();
      assert.ok(err.error.includes('exceeds outstanding balance'));
    }
  },

  {
    name: 'Financial Payment: Duplicate reference is rejected with HTTP 400',
    fn: async ({ baseUrl, assert }) => {
      // Step 1: Create Invoice of $800
      const invRes = await fetch(`${baseUrl}/payment/invoice`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: 'cust_104', serviceId: 'serv_204', totalAmount: 800 })
      });
      const invoice = await invRes.json();
      const duplicateRef = `REF-DUP-UNIQUE-${Date.now()}`;

      // Step 2: First Payment succeeds
      const pay1Res = await fetch(`${baseUrl}/payment/process`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          invoiceId: invoice.id,
          userId: 'cust_104',
          serviceId: 'serv_204',
          amount: 200,
          reference: duplicateRef
        })
      });
      assert.strictEqual(pay1Res.status, 201);

      // Step 3: Second Payment with SAME reference is REJECTED
      const pay2Res = await fetch(`${baseUrl}/payment/process`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          invoiceId: invoice.id,
          userId: 'cust_104',
          serviceId: 'serv_204',
          amount: 200,
          reference: duplicateRef
        })
      });
      assert.strictEqual(pay2Res.status, 400);
      const err = await pay2Res.json();
      assert.strictEqual(err.error, 'Duplicate payment reference rejected.');
    }
  }
];

