const db = require('../config/database');

const StatisticsModel = {
  async getReportStatistics() {
    try {
      const query = `
        SELECT 
          (SELECT COUNT(*) FROM laporan_masuk) as active,
          (SELECT COUNT(*) FROM riwayat_laporan WHERE status = 'diterima') as completed,
          (SELECT COUNT(*) FROM laporan_masuk WHERE status = 'pending') as pending
      `;

      const result = await db.query(query);
      
      return {
        active: parseInt(result.rows[0].active),
        completed: parseInt(result.rows[0].completed),
        pending: parseInt(result.rows[0].pending)
      };
    } catch (error) {
      console.error('Error in getReportStatistics:', error);
      throw error;
    }
  },

  async getReviews() {
    try {
      const query = `
        SELECT 
          r.rating,
          r.review_text,
          u.nama as user_name
        FROM reviews r 
        JOIN users u ON r.user_id = u.id 
        JOIN riwayat_laporan rl ON r.laporan_id = rl.id 
        WHERE rl.status = 'diterima' 
        ORDER BY r.created_at DESC 
        LIMIT 3
      `;

      const result = await db.query(query);
      return result.rows;
    } catch (error) {
      console.error('Error in getReviews:', error);
      throw error;
    }
  }
};

module.exports = StatisticsModel;