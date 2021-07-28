'use strict';

const db = require('../db');

const getPost = async (postId) => {
  const query = 'SELECT * FROM posts WHERE post_id=$1';
  return db.query(query, [postId]);
};

module.exports = { getPost };
