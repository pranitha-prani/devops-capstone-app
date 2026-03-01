const express = require('express');
const os = require('os');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send(`
    <h1>🚀 DevOps Capstone App</h1>
    <p>Running on host: <strong>${os.hostname()}</strong></p>
    <p>Server time: <strong>${new Date().toISOString()}</strong></p>
    <p>Node version: <strong>${process.version}</strong></p>
  `);
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', uptime: process.uptime() });
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});