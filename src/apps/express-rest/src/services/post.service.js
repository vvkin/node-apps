'use strict';

const postDAO = require('../dao/post.dao');

const getPost = async (postId) => {
  return postDAO.getOne(postId);
};

const createPost = async (authorId, title, content) => {
  return postDAO.create({ authorId, title, content });
};

module.exports = { getPost, createPost };
