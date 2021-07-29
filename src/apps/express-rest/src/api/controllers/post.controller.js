'use strict';

module.exports = (postService) => {
  const getPostById = async (req, res, next) => {
    const { postId } = req.params;
    const [err, post] = await postService.getPostById(postId);
    if (!err) {
      res.status(200).json({ post });
    } else next(err);
  };

  const createPost = async (req, res, next) => {
    const { authorId, title, content } = req.body;
    const postId = await postService.createPost(authorId, title, content);
    if (postId) {
      res.status(201).json({ postId });
    } else next();
  };

  const updatePost = async (req, res, next) => {
    const { title, content } = req.body;
    const [err] = await postService.updatePost(title, content);
    if (!err) {
      res.status(200).json({ success: true });
    } else next(err);
  };

  const deletePost = async (req, res, next) => {
    const { postId } = req.param;
    const [err] = await postService.deletePost(postId);
    if (!err) {
      res.status(200).json({ success: true });
    } else next(err);
  };

  return { getPostById, createPost, updatePost, deletePost };
};
