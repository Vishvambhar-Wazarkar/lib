const express = require('express');
const router = express.Router();

// Basic route
router.get('/test', (req, res) => {
    res.send('Issue route is working!');
});

module.exports = router;
