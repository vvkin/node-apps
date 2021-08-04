'use strict';

class BaseModel {
  constructor(table, pk, db) {
    this.table = table;
    this.pk = pk;
    this.db = db;
  }

  async findAll(conditions) {
    return this.db.find({
      field: ['*'],
      table: this.table,
      where: conditions,
    });
  }

  async findOne(conditions) {
    return this.db.findOne({
      fields: ['*'],
      table: this.table,
      where: conditions,
    });
  }

  async create(record) {
    const rows = await this.db.insert({
      items: record,
      table: this.table,
      returning: [this.pk],
    });
    return rows?.[0]?.[this.pk];
  }

  async delete(conditions) {
    const rows = await this.db.delete({
      table: this.table,
      where: conditions,
      returning: [this.pk],
    });
    return rows?.[0]?.[this.pk];
  }
}

module.exports = { BaseModel };
