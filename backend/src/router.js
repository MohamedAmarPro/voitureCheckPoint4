const express = require("express");

const router = express.Router();

const itemControllers = require("./controllers/itemControllers");
const authControllers = require("./controllers/authControllers");
const postControllers = require("./controllers/postControllers");

router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.put("/items/:id", itemControllers.edit);
router.post("/items", itemControllers.add);
router.delete("/items/:id", itemControllers.destroy);

router.post("/auth/register", authControllers.register);
router.post("/auth/login", authControllers.login);
router.post("/auth/logout", authControllers.logout);

router.get("/posts", postControllers.getPosts);
router.get("/posts/:id", postControllers.getPost);
router.post("/posts/:id", postControllers.addPost);
router.delete("/posts/:id", postControllers.deletePost);
router.put("/posts/:id", postControllers.updatePost);

module.exports = router;
