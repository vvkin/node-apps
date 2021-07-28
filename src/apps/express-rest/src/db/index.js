'use strict';

const { Pool } = require('pg');

const pool = new Pool();

const _execute = async (query, params = []) => {
  const { rows } = await pool.query(query, params);
  return rows;
};

const _where = (where) => {
  const conditions = Object.keys(where)
    .map((key, idx) => `${key}=$${idx + 1}`)
    .join(' AND ');
  return 'WHERE ' + conditions;
};

const find = async (fields, table, where) => {
  const attributes = fields !== '*' ? fields.join(',') : '*';
  const whereClause = _where(where);
  const query = `SELECT ${attributes} FROM ${table} ${whereClause}`;
  const params = where ? Object.values(where).flat() : [];
  return _execute(query, params);
};

module.exports = { find };
