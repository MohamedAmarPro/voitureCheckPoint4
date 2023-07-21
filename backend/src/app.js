// import some node modules for later

const fs = require("node:fs");
const path = require("node:path");
const cookieParser = require("cookie-parser");
const multer = require("multer");
// create express app

const express = require("express");

const app = express();

app.use(cookieParser()); // Le middleware analyse les en-têtes de la requête pour extraire les cookies et les transformer en objets JavaScript.
app.use(express.json());

app.use("/static", express.static("public"));

const cors = require("cors");

app.use(cors());

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});
const upload = multer({ storage });
// use some application-level middlewares

app.post("/upload", upload.single("file"), function (req, res) {
  const { file } = req;

  res.status(200).json(file.filename);
});

// import and mount the API routes

const router = require("./router");

app.use(router);

// serve the `backend/public` folder for public resources

app.use(express.static(path.join(__dirname, "../public")));

// serve REACT APP

const reactIndexFile = path.join(
  __dirname,
  "..",
  "..",
  "frontend",
  "dist",
  "index.html"
);

if (fs.existsSync(reactIndexFile)) {
  // serve REACT resources

  app.use(express.static(path.join(__dirname, "..", "..", "frontend", "dist")));

  // redirect all requests to the REACT index file

  app.get("*", (req, res) => {
    res.sendFile(reactIndexFile);
  });
}

// ready to export

module.exports = app;
