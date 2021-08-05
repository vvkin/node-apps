'use strict';

const filterDTO = (dto) => {
  const predicate = ([, value]) => value !== undefined;
  return Object.fromEntries(Object.entries(dto).filter(predicate));
};

module.exports = { filterDTO };
