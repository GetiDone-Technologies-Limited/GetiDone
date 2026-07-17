async function test() {
  try {
    const res = await fetch('http://localhost:3001/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'client@getidone.com', password: 'password123' })
    });
    console.log(res.status, res.statusText);
    const data = await res.json();
    console.log(data);
  } catch (e) {
    console.error('Fetch error:', e);
  }
}
test();
