const pool = require('../config/database');

class UserModel {
  static async findByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await pool.query(query, [email]);
    return result.rows[0];
  }

  static async findById(id) {
    const query = 'SELECT * FROM users WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async create({ nama, email, password }) {
    const query = `
      INSERT INTO users (nama, email, password, role)
      VALUES ($1, $2, $3, $4)
      RETURNING id, nama, email, role`;
    const result = await pool.query(query, [nama, email, password, 'user']);
    return result.rows[0];
  }

  static async getAllUsers() {
    const query = 'SELECT id, nama, email, role, created_at FROM users WHERE role = $1';
    const result = await pool.query(query, ['user']);
    return result.rows;
  }

  static async delete(id) {
    const query = 'DELETE FROM users WHERE id = $1 AND role = $2 RETURNING *';
    const result = await pool.query(query, [id, 'user']);
    return result.rows[0];
  }

  static async update(id, { nama, email }) {
    const query = `
      UPDATE users 
      SET nama = $1, email = $2
      WHERE id = $3 AND role = $4
      RETURNING id, nama, email, role`;
    const result = await pool.query(query, [nama, email, id, 'user']);
    return result.rows[0];
  }
}

module.exports = UserModel;