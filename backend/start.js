const { spawn } = require('child_process');
const path = require('path');

// Kill existing node processes (Windows specific)
const cleanup = spawn('taskkill', ['/F', '/IM', 'node.exe'], { shell: true });

cleanup.on('close', () => {
  console.log('Cleaned up existing processes');
  
  // Start the server
  const server = spawn('node', ['server.js'], {
    stdio: 'inherit',
    shell: true
  });

  server.on('error', (err) => {
    console.error('Failed to start server:', err);
    process.exit(1);
  });

  process.on('SIGINT', () => {
    server.kill();
    process.exit();
  });
});