const express = require("express");
const User = require("../models/user");
const { isLoggedIn } = require("../middlewares");
const {
  follow,
  unfollow,
  changeNick,
  deletePost,
} = require("../controllers/user");

const router = express.Router();

// POST /user/:id/follow
router.post("/:id/follow", isLoggedIn, follow);
router.post("/:id/unfollow", isLoggedIn, unfollow);
router.post("/change", isLoggedIn, changeNick);
router.post("/:twitId/delete", isLoggedIn, deletePost);
module.exports = router;
