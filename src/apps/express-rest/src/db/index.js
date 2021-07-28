'use strict';

const { Pool } = require('pg');

const pool = new Pool();

const _execute = async (query, params = []) => {
  const { rows } = await pool.query(query, params);
  return rows;
};

const _attrs = (keys) => {
  return keys === '*' ? '*' : keys.map((key) => `"${key}"`).join(',');
};

const _where = (where) => {
  const whereClause = where
    ? ' WHERE ' +
      Object.keys(where)
        .map((key, idx) => `"${key}"=$${idx + 1}`)
        .join(' AND ')
    : '';
  return whereClause;
};

const _placeholders = (length) => {
  return Array.from({ length }, (_, i) => `$${i + 1}`);
};

const _returning = (keys) => {
  return keys ? ' RETURNING ' + _attrs(keys) : '';
};

const select = async ({ fields, table, where }) => {
  const attrs = _attrs(fields);
  const whereClause = _where(where);
  const query = `SELECT ${attrs} FROM "${table}"` + whereClause;
  const params = whereClause ? Object.values(where) : [];
  return _execute(query, params);
};

const selectOne = async ({ fields, table, where }) => {
  const rows = await select({ fields, table, where });
  return rows[0];
};

const insert = async ({ items, table, returning }) => {
  const keys = Object.keys(items);

  const query =
    `INSERT INTO "${table}"(${_attrs(keys)})` +
    `VALUES(${_placeholders(keys.length)})` +
    _returning(returning);

  const params = Object.values(items);
  return _execute(query, params);
};

module.exports = { select, selectOne, insert };
