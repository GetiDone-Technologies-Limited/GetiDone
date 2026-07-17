async function run() {
  try {
    const res = await fetch('http://localhost:3001/matching/recommend/seed-job-1');
    const data = await res.json();
    console.log(JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Error:', err.message);
  }
}
run();
