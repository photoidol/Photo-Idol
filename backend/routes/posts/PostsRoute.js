const express = require("express");
const { protect, isPaidUser } = require("../../middleware/authMiddleware");
const { createPosts, getallPosts, getPost, deletePosts, updatePosts, getallPost, getallPostofUser, userPostsSearch, toggleLike } = require("../../controllers/posts/PostsControllers");
const { upload } = require("../../utils/uploadImg");
const router = express.Router();

router.get("/", getallPosts);
router.get("/all", getallPost);
router.get("/:slug", getPost);
router.get("/search/posts", userPostsSearch);

router.get("/user/posts", protect, getallPostofUser);
router.post("/", protect, isPaidUser, upload.single("assets"), createPosts);
router.delete("/remove/:id", protect, deletePosts);
router.delete("/remove", protect, deletePosts);

router.put("/:id", protect, upload.single("assets"), updatePosts);
router.post("/like/:id", protect, toggleLike);

module.exports = router;
