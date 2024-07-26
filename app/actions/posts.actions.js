const { Sequelize, where } = require("sequelize");
const { Op } = require("sequelize");
const model = require("../models/index");
const Post = model.Posts;
class PostsActions {
  async GetAllPosts() {
    const postsList = await Post.findAll();
    return postsList;
  }
  async GetPostsLatest(filters) {
    const postsList = await Post.findAll({
      order: [["createdAt", "DESC"]],
      limit: Number(filters.limit) || 4,
    });
    return postsList;
  }
  async GetDetailPost(id) {
    const post = await Post.findByPk(id);
    return post;
  }
  async CreatePosts(posts) {
    const newPosts = await Post.create(posts);
    return newPosts;
  }
  async EditPosts(id, dataPosts) {
    const posts = await Post.findByPk(id);
    await posts.update({
      title: dataPosts.title,
      content: dataPosts.content,
      image: dataPosts.image,
    });
  }
  async DeletePosts(id) {
    await Post.destroy({
      where: {
        id,
      },
    });
  }
}

module.exports = new PostsActions();
