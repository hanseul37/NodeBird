const { User, Post, Hashtag } = require("../models");

exports.renderProfile = (req, res) => {
  res.render("profile", {
    title: "내 정보 - NodeBird",
    currentUrl: res.locals.currentUrl,
  });
};

exports.renderJoin = (req, res) => {
  res.render("join", { title: "회원 가입 - NodeBird" });
};

exports.renderMain = async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      include: {
        model: User,
        attributes: ["id", "nick"], //password도 있지만 비번은 프론트로 보내면 안됨!
      },
      order: [["createdAt", "DESC"]],
    });
    res.render("main", {
      title: "NodeBird",
      twits: posts,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.renderHashtag = async (req, res, next) => {
  const query = req.query.hashtag;
  if (!query) {
    return res.redirect("/");
  }
  try {
    const hashtag = await Hashtag.findOne({ where: { title: query } });
    let posts = [];
    if (hashtag) {
      posts = await hashtag.getPosts({ include: [{ model: User }] });
    }
    res.render("main", {
      title: `${query} | NodeBird`,
      twits: posts,
    });
  } catch (erorr) {
    console.error(erorr);
    next(error);
  }
};

exports.renderUserpost = async (req, res, next) => {
  const query = req.query.userId;
  if (!query) {
    return res.redirect("/");
  }

  try {
    const user = await User.findOne({ where: { id: query } });
    if (!user) {
      return res.redirect("/");
    }
    let posts = [];
    posts = await user.getPosts({ include: [{ model: User }] });
    res.render("main", {
      title: `${query} | NodeBird`,
      twits: posts,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
