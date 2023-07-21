const AbstractManager = require("./AbstractManager");

class PostManager extends AbstractManager {
  constructor() {
    super({ table: "posts" });
  }

  async getPosts(cat) {
    const query = cat
      ? "SELECT * FROM posts WHERE cat = ?"
      : "SELECT * FROM posts";
    const values = [cat];
    const [data] = await this.database.query(query, values);
    return data;
  }

  async getPost(id) {
    const query =
      "SELECT p.id, `username`, `title`, `desc`, p.img, u.img AS userImg, `cat`,`date` FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ?";
    const values = [id];
    const [data] = await this.database.query(query, values);
    return data;
  }

  async insertPost(title, desc, img, date, uid, cat) {
    const query =
      "INSERT INTO posts(`title`, `desc`, `img`, `date`, `uid`, `cat`) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [title, desc, img, date, uid, cat];
    const [data] = await this.database.query(query, values);
    return data;
  }

  async updatePost(postId, title, desc, img, cat, uid) {
    const query =
      "UPDATE posts SET `title`=?, `desc`=?, `img`=?, `cat`=? WHERE `id`=? AND `uid`=?";
    const values = [title, desc, img, cat, postId, uid];
    const [data] = await this.database.query(query, values);
    return data;
  }

  async deletePost(postId) {
    const query = "DELETE FROM posts WHERE id = ?";
    const values = [postId];
    return this.database.query(query, values);
  }
}

module.exports = PostManager;
