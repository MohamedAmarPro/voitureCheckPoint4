const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const models = require("../models");

const register = async (req, res) => {
  const { email, username, password } = req.body;

  try {
    // Hash the password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    // Create a user
    const user = {
      username,
      email,
      password: hash,
    };

    await models.auth.insert(user);
    return res.status(200).json("User has been created.");
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const [user] = await models.auth.selectByUsername(username);

    if (user.length === 0) {
      return res.status(404).json("User not found");
    }

    if (!user[0].username) {
      return res.status(400).send({ message: "Invalid username" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user[0].password);

    if (!isPasswordCorrect) {
      return res.status(400).json("Wrong username or password");
    }

    const token = jwt.sign({ id: user[0].id }, process.env.JWT_SECRET);

    // Création du cookie et ajout dans la réponse
    res
      .cookie("access_token", token, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      })
      .json(user[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json("Internal server error");
  }
};

const logout = (req, res) => {
  res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json("User has been logged out.");
};

module.exports = {
  register,
  login,
  logout,
};
