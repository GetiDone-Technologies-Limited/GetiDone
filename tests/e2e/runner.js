const fs = require('fs');
const path = require('path');
const assert = require('assert');
const http = require('http');

// Simple command line parsing
const args = process.argv.slice(2);
const mockMode = args.includes('--mock') || !args.some(arg => arg.startsWith('--url='));
let baseUrl = '';

// Find external URL if specified
const urlArg = args.find(arg => arg.startsWith('--url='));
if (urlArg) {
  baseUrl = urlArg.split('=')[1];
} else if (process.env.API_URL) {
  baseUrl = process.env.API_URL;
}

const PORT = process.env.PORT || 3001;
let mockServerInstance = null;

// Helper to start mock server
function startMockServer() {
  return new Promise((resolve, reject) => {
    try {
      const server = require('./mock-server.js');
      mockServerInstance = server.listen(PORT, () => {
        console.log(`[INFRA] Mock server started on http://localhost:${PORT}`);
        resolve(`http://localhost:${PORT}`);
      });
      mockServerInstance.on('error', (err) => {
        reject(err);
      });
    } catch (err) {
      reject(err);
    }
  });
}

// Helper to clear mock server state
async function clearMockState(url) {
  try {
    const res = await fetch(`${url}/debug/clear`, { method: 'POST' });
    if (!res.ok) {
      console.warn(`[INFRA] Failed to clear mock server state: ${res.status}`);
    }
  } catch (err) {
    // If not a mock server or debug/clear is missing, ignore
  }
}

// Helper to scan test files
function discoverTestFiles(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      results = results.concat(discoverTestFiles(filePath));
    } else if (file.endsWith('.test.js') || file.endsWith('.js')) {
      results.push(filePath);
    }
  }
  return results;
}

async function main() {
  console.log('[INFRA] Initializing E2E Test Suite Harness...');

  // 1. Start Mock Server if needed
  if (mockMode && !baseUrl) {
    try {
      baseUrl = await startMockServer();
    } catch (err) {
      console.error('[INFRA] Failed to start mock server:', err);
      process.exit(1);
    }
  } else {
    console.log(`[INFRA] Running tests against external target URL: ${baseUrl}`);
  }

  // 2. Discover tests in Tiers
  const tiers = ['tier1', 'tier2', 'tier3', 'tier4'];
  const testFiles = [];
  for (const tier of tiers) {
    const tierDir = path.join(__dirname, tier);
    const files = discoverTestFiles(tierDir);
    testFiles.push(...files.map(f => ({ path: f, tier })));
  }

  console.log(`[INFRA] Discovered ${testFiles.length} test files.`);

  let totalTests = 0;
  let passedTests = 0;
  let failedTests = 0;
  const failureDetails = [];

  // 3. Execute test files sequentially
  for (const fileObj of testFiles) {
    const relativePath = path.relative(path.join(__dirname, '../..'), fileObj.path);
    console.log(`\n----------------------------------------\nRunning: ${relativePath} [${fileObj.tier.toUpperCase()}]\n----------------------------------------`);
    
    // Clear state before running a test suite file to ensure isolation
    await clearMockState(baseUrl);

    let suite;
    try {
      suite = require(fileObj.path);
    } catch (err) {
      console.error(`[INFRA] Failed to load test file: ${relativePath}`, err);
      failedTests++;
      failureDetails.push({ name: `Load ${relativePath}`, error: err });
      continue;
    }

    // Ensure tests are defined in an array
    const tests = Array.isArray(suite) ? suite : [suite];

    for (const testCase of tests) {
      if (!testCase || typeof testCase.fn !== 'function') {
        continue;
      }
      totalTests++;
      console.log(`▶ Test: ${testCase.name}`);
      const startTime = Date.now();

      try {
        // Clear state before each test case for maximum isolation
        await clearMockState(baseUrl);
        
        await testCase.fn({ baseUrl, assert });
        
        const duration = Date.now() - startTime;
        console.log(`✔ Passed (${duration}ms)`);
        passedTests++;
      } catch (err) {
        const duration = Date.now() - startTime;
        console.log(`❌ Failed (${duration}ms)`);
        console.error(err);
        failedTests++;
        failureDetails.push({ name: `${testCase.name} (${relativePath})`, error: err });
      }
    }
  }

  // 4. Teardown Mock Server
  if (mockServerInstance) {
    console.log('\n[INFRA] Tearing down mock server...');
    mockServerInstance.close();
  }

  // 5. Final Summary Output
  console.log('\n========================================');
  console.log('E2E TEST RUN SUMMARY');
  console.log('========================================');
  console.log(`Total Tests Run: ${totalTests}`);
  console.log(`Passed:         ${passedTests}`);
  console.log(`Failed:         ${failedTests}`);
  console.log('========================================');

  if (failedTests > 0) {
    console.log('\nFailed Details:');
    failureDetails.forEach((f, idx) => {
      console.log(`\n${idx + 1}) ${f.name}`);
      console.log(f.error.stack || f.error.message || f.error);
    });
    process.exit(1);
  } else {
    console.log('\n[INFRA] All tests completed successfully!');
    process.exit(0);
  }
}

main().catch(err => {
  console.error('[INFRA] Unhandled exception in test runner:', err);
  if (mockServerInstance) {
    mockServerInstance.close();
  }
  process.exit(1);
});
