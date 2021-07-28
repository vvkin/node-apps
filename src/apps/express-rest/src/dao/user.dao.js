'use strict';

const db = require('../db');

const table = 'Users';

const getOne = async (userId) => {
  return db.selectOne({
    fields: '*',
    table,
    where: { userId },
  });
};

const create = async (email, username, fullName) => {
  const rows = await db.insert({
    items: { email, username, fullName },
    table,
    returning: ['userId'],
  });
  return rows[0].userId;
};

module.exports = { getOne, create };
