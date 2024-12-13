const pool = require('../config/database');

class AdminModel {
  static async findByEmail(email) {
    const query = 'SELECT * FROM admins WHERE email = $1';
    const result = await pool.query(query, [email]);
    return result.rows[0];
  }

  static async findById(id) {
    const query = 'SELECT * FROM admins WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async create({ nama, email, password, role }) {
    const query = `
      INSERT INTO admins (nama, email, password, role)
      VALUES ($1, $2, $3, $4)
      RETURNING id, nama, email, role`;
    const result = await pool.query(query, [nama, email, password, role]);
    return result.rows[0];
  }

  static async getAllAdmins() {
    const query = 'SELECT id, nama, email, role, created_at FROM admins WHERE role = $1';
    const result = await pool.query(query, ['admin']);
    return result.rows;
  }

  static async delete(id) {
    const query = 'DELETE FROM admins WHERE id = $1 AND role = $2 RETURNING *';
    const result = await pool.query(query, [id, 'admin']);
    return result.rows[0];
  }

  static async update(id, { nama, email }) {
    const query = `
      UPDATE admins 
      SET nama = $1, email = $2
      WHERE id = $3 AND role = $4
      RETURNING id, nama, email, role`;
    const result = await pool.query(query, [nama, email, id, 'admin']);
    return result.rows[0];
  }
}

module.exports = AdminModel;