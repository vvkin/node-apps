'use strict';

module.exports = (postService) => {
  const getPostById = async (req, res, next) => {
    const { postId } = req.params;
    try {
      const post = await postService.findOne({ postId });
      res.status(200).json({ post });
    } catch (err) {
      next(err);
    }
  };

  const createPost = async (req, res, next) => {
    try {
      const postId = await postService.create(req.body);
      res.status(201).json({ postId });
    } catch (err) {
      next(err);
    }
  };

  const updatePostById = async (req, res, next) => {
    const { postId } = req.params;
    try {
      const post = await postService.update(postId, req.body);
      res.status(200).json({ post });
    } catch (err) {
      next(err);
    }
  };

  const deletePostById = async (req, res, next) => {
    const { postId } = req.params;
    try {
      const deletedId = await postService.delete(postId);
      res.status(200).json({ postId: deletedId });
    } catch (err) {
      next(err);
    }
  };

  return {
    getPostById,
    createPost,
    updatePostById,
    deletePostById,
  };
};
