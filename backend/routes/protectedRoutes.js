const express = require('express');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

router.get('/protected', verifyToken, (req, res) => {
  res.send('Protected route accessed.');
});

module.exports = router;
