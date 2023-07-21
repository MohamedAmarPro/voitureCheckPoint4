const models = require("../models");

const getPosts = (req, res) => {
  const { cat } = req.query;

  models.post
    .getPosts(cat)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const getPost = (req, res) => {
  models.post
    .getPost(req.params.id)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

const addPost = (req, res) => {
  const { title, desc, cat, img, date } = req.body;

  const uid = req.params.id;

  models.post
    .insertPost(title, desc, img, date, uid, cat)
    .then(() => {
      res.status(200).json("Post has been created.");
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

const updatePost = (req, res) => {
  const uid = req.params.id;
  const postId = req.params.id;
  const { title, desc, img, cat } = req.body;

  models.post
    .updatePost(postId, title, desc, img, cat, uid)
    .then(() => {
      res.status(200).json("Post has been updated.");
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

const deletePost = (req, res) => {
  const postId = req.params.id;

  models.post
    .deletePost(postId)
    .then(() => {
      res.json("Post has been deleted!");
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

module.exports = {
  getPosts,
  getPost,
  addPost,
  deletePost,
  updatePost,
};
