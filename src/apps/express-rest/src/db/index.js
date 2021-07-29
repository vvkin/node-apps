'use strict';

const { Pool } = require('pg');

const buildWhere = (conditions) => {
  const clause = conditions
    ? ' WHERE ' +
      Object.keys(conditions)
        .map((key, idx) => `"${key}"=$${idx + 1}`)
        .join(' AND ')
    : '';
  return clause;
};

const buildAttrs = (attrs) => {
  return attrs[0] !== '*' ? '"' + attrs.join('","') + '"' : '*';
};

const buildReturning = (attrs) => {
  return ' RETURNING ' + buildAttrs(attrs);
};

class Database {
  constructor() {
    this.pool = new Pool();
  }

  async query(sql, data) {
    const { rows } = await this.pool.query(sql, data);
    return rows;
  }

  async find({ fields = ['*'], table, where }) {
    const attrs = buildAttrs(fields);
    const whereClause = buildWhere(where);
    const sql = `SELECT ${attrs} FROM "${table}"` + whereClause;
    const data = where ? Object.values(where) : [];
    return this.query(sql, data);
  }

  async findOne({ fields, table, where }) {
    const rows = await this.find({ fields, table, where });
    return rows[0];
  }

  async insert({ items, table, returning }) {
    const keys = Object.keys(items);
    const data = new Array(keys.length);
    const nums = new Array(keys.length);

    for (const [idx, key] of Object.entries(keys)) {
      data[idx] = items[key];
      nums[idx] = `$${idx + 1}`;
    }

    const attrs = '"' + keys.join('","') + '"';
    const params = nums.join(',');
    const sql =
      `INSERT INTO "${table}"(${attrs}) VALUES(${params})` +
      buildReturning(returning);

    return this.query(sql, data);
  }

  async delete({ table, where, returning }) {
    const sql =
      `DELETE FROM "${table}"` + buildWhere(where) + buildReturning(returning);
    const data = where ? Object.values(where) : [];
    return this.query(sql, data);
  }
}

module.exports = { Database };
