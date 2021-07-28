'use strict';

const { Pool } = require('pg');

const pool = new Pool();

const query = async (body, params) => {
  const { rows } = await pool.query(body, params);
  return rows;
};

module.exports = { query };
