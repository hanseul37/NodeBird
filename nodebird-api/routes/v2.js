const express = require("express");
const cors = require("cors");

const {
  verifyToken,
  apiLimiter,
  corsWhenDomainMatches,
} = require("../middlewares");
const {
  createToken,
  tokenTest,
  getMyPosts,
  getPostsByHashtag,
} = require("../controllers/v2");

const router = express.Router();

router.use(corsWhenDomainMatches);

// POST /v2/token
router.post("/token", apiLimiter, createToken);

// POST /v2/test
router.get("/test", verifyToken, apiLimiter, tokenTest);

// GET /v2/posts/my
router.get("/posts/my", verifyToken, apiLimiter, getMyPosts);

// GET /v2/posts/hashtag/:title
router.get("/posts/hashtag/:title", verifyToken, apiLimiter, getPostsByHashtag);

module.exports = router;
