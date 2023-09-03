const User = require("../models/user");
const Post = require("../models/post");

exports.follow = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    if (user) {
      //req.user.id가 followerId, req.params.id가 followingId
      await user.addFollowing(parseInt(req.params.id, 10));
      res.send("success");
    } else {
      res.status(404).send("no user");
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.unfollow = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    if (user) {
      await user.removeFollowing(parseInt(req.params.id, 10));
      res.send("success");
    } else {
      res.status(404).send("no user");
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.changeNick = async (req, res, next) => {
  const newName = req.body.newName;
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    if (user) {
      User.update(
        {
          nick: newName,
        },
        {
          where: { id: req.user.id },
        }
      );
      return res.send("success");
    } else {
      res.status(404).send("no user");
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const twitId = req.params.twitId;
    await Post.destroy({
      where: { id: twitId },
    });
    res.send("게시물 삭제 완료");
  } catch (error) {
    console.error(error);
    next(error);
  }
};
