const net = require('net');
const { spawn } = require('child_process');

// First check if port 5000 is in use
const testSocket = new net.Socket();

testSocket.on('error', (err) => {
  if (err.code === 'ECONNREFUSED') {
    console.log('Port 5000 is available');
    startServer();
  } else {
    console.log('Error checking port:', err.message);
  }
});

testSocket.on('connect', () => {
  console.log('Port 5000 is in use');
  testSocket.destroy();
  process.exit(1);
});

testSocket.connect(5000, '127.0.0.1');

function startServer() {
  console.log('Starting server...');
  const server = spawn('node', ['server.js'], {
    stdio: 'inherit',
    shell: true
  });

  server.on('error', (err) => {
    console.log('Failed to start server:', err.message);
  });

  // Handle server exit
  server.on('exit', (code) => {
    if (code !== 0) {
      console.log(`Server process exited with code ${code}`);
    }
  });
}