const express = require('express');
const path = require('path');
const os = require('os');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/health', (req, res) => {
    res.status(500).json({ status: 'unhealthy' });  // ← Changed 200 to 500
});

app.listen(PORT, () => console.log(`Running on port ${PORT}`));
