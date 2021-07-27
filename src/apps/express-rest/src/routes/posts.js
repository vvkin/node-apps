'use strict';

const { Router } = require('express');

const route = Router();

route.get('/:postId', (req, res) => {
  const { postId } = req.params;
  res.send({ postId });
});

module.exports = route;
