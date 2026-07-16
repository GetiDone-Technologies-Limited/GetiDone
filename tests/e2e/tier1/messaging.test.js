module.exports = [
  {
    name: 'Messaging Module: Send message successfully',
    fn: async ({ baseUrl, assert }) => {
      const sendRes = await fetch(`${baseUrl}/messaging/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          senderId: 'user_client',
          receiverId: 'user_freelancer',
          message: 'Hello, can we start tomorrow?'
        })
      });
      assert.strictEqual(sendRes.status, 201);
      const msg = await sendRes.json();
      assert.ok(msg.id);
      assert.strictEqual(msg.senderId, 'user_client');
      assert.strictEqual(msg.receiverId, 'user_freelancer');
      assert.strictEqual(msg.message, 'Hello, can we start tomorrow?');
    }
  },
  {
    name: 'Messaging Module: List conversations contains active conversation',
    fn: async ({ baseUrl, assert }) => {
      // Send a message first
      await fetch(`${baseUrl}/messaging/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          senderId: 'user_client',
          receiverId: 'user_freelancer',
          message: 'Hello, can we start tomorrow?'
        })
      });

      const convsRes = await fetch(`${baseUrl}/messaging/conversations`);
      assert.strictEqual(convsRes.status, 200);
      const conversations = await convsRes.json();
      assert.ok(Array.isArray(conversations));
      assert.ok(conversations.some(c => c.participantIds.includes('user_client') && c.participantIds.includes('user_freelancer')));
    }
  },
  {
    name: 'Messaging Module: Subsequent message updates lastMessage and updatedAt in conversation',
    fn: async ({ baseUrl, assert }) => {
      const payload1 = { senderId: 'u1', receiverId: 'u2', message: 'First message' };
      const payload2 = { senderId: 'u1', receiverId: 'u2', message: 'Second message' };

      // Send 1st
      await fetch(`${baseUrl}/messaging/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload1)
      });
      const res1 = await fetch(`${baseUrl}/messaging/conversations`);
      const convs1 = await res1.json();
      const conv1 = convs1.find(c => c.participantIds.includes('u1'));
      const originalTime = conv1.updatedAt;

      // Send 2nd
      await fetch(`${baseUrl}/messaging/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload2)
      });
      const res2 = await fetch(`${baseUrl}/messaging/conversations`);
      const convs2 = await res2.json();
      const conv2 = convs2.find(c => c.participantIds.includes('u1'));

      assert.strictEqual(conv2.lastMessage, 'Second message');
      assert.ok(new Date(conv2.updatedAt) >= new Date(originalTime));
    }
  },
  {
    name: 'Messaging Module: Multiple independent conversations are created for different pairs',
    fn: async ({ baseUrl, assert }) => {
      await fetch(`${baseUrl}/messaging/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ senderId: 'u1', receiverId: 'u2', message: 'Hey u2' })
      });
      await fetch(`${baseUrl}/messaging/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ senderId: 'u1', receiverId: 'u3', message: 'Hey u3' })
      });

      const res = await fetch(`${baseUrl}/messaging/conversations`);
      const conversations = await res.json();
      assert.strictEqual(conversations.length, 2);
    }
  },
  {
    name: 'Messaging Module: Conversation updatedAt uses valid ISO timestamp format',
    fn: async ({ baseUrl, assert }) => {
      await fetch(`${baseUrl}/messaging/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ senderId: 'u1', receiverId: 'u2', message: 'Ping' })
      });

      const res = await fetch(`${baseUrl}/messaging/conversations`);
      const convs = await res.json();
      const conv = convs[0];
      assert.ok(conv.updatedAt);
      assert.doesNotThrow(() => new Date(conv.updatedAt).toISOString());
    }
  },
  {
    name: 'Messaging Module: Send message with large text body',
    fn: async ({ baseUrl, assert }) => {
      const longMessage = 'A'.repeat(5000);
      const sendRes = await fetch(`${baseUrl}/messaging/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          senderId: 'u1',
          receiverId: 'u2',
          message: longMessage
        })
      });
      assert.strictEqual(sendRes.status, 201);
      const data = await sendRes.json();
      assert.strictEqual(data.message, longMessage);
    }
  }
];
