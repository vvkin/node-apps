'use strict';

const getUser = async (req, res) => {
  const { userId } = req.params;
  const user = {
    userId,
    username: 'mock',
    email: 'mock@mock.mock',
  };
  res.status(200).json(user);
};

module.exports = {
  getUser,
};
