const AbstractManager = require("./AbstractManager");

class AuthManager extends AbstractManager {
  constructor() {
    super({ table: "users" });
  }

  async insert(user) {
    await this.database.query(
      `INSERT INTO users(username, email, password) VALUES (?, ?, ?)`,
      [user.username, user.email, user.password]
    );
  }

  selectByUsername(username) {
    return this.database.query(`SELECT * FROM users WHERE username = ?`, [
      username,
    ]);
  }
}

module.exports = AuthManager;
