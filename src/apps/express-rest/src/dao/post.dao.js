'use strict';

const db = require('../db');

const table = 'Posts';

const getOne = async (postId) => {
  return db.selectOne({
    fields: '*',
    table,
    where: { postId },
  });
};

const create = async ({ authorId, title, content }) => {
  const rows = await db.insert({
    items: { authorId, title, content },
    table,
    returning: ['postId'],
  });
  return rows[0].postId;
};

module.exports = { getOne, create };
