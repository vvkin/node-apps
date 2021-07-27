'use strict';

const { Router } = require('express');

const router = Router();

router.get('/:userId', (req, res) => {
  const { userId } = req.params;
  res.send({ userId });
});

module.exports = router;
