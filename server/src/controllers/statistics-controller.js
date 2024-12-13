const StatisticsModel = require('../models/statisticsModel');

const statisticsController = {
  async getReportStatistics(request, h) {
    try {
      const statistics = await StatisticsModel.getReportStatistics();
      
      return h.response({
        status: 'success',
        data: statistics
      }).code(200);
    } catch (error) {
      console.error('Error in getReportStatistics:', error);
      
      return h.response({
        status: 'error',
        message: 'Terjadi kesalahan saat mengambil data statistik'
      }).code(500);
    }
  },

  async getReviews(request, h) {
    try {
      const reviews = await StatisticsModel.getReviews();
      
      return h.response({
        status: 'success',
        data: reviews
      }).code(200);
    } catch (error) {
      console.error('Error in getReviews:', error);
      
      return h.response({
        status: 'error',
        message: 'Terjadi kesalahan saat mengambil data review'
      }).code(500);
    }
  }
};

module.exports = statisticsController;