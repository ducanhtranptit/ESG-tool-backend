const express = require("express");
const router = express.Router();
const PostsController = require("../controllers/posts.controller");

router.get("/posts-list", PostsController.GetAllPosts);
router.get("/get-detail/:id", PostsController.GetDetailPost);
router.post("/create-posts", PostsController.CreatePosts);
router.get("/get-posts-latest", PostsController.GetPostsLatest);
router.put("/update-posts/:id", PostsController.UpdateDataPost);
router.delete("/delete-posts/:id", PostsController.DeletePosts);

module.exports = router;
