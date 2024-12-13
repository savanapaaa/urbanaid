const statisticsController = require('../controllers/statistics-controller');

const routes = [
  {
    method: 'GET',
    path: '/api/statistics/reports',
    handler: statisticsController.getReportStatistics,
    options: {
      auth: false
    }
  },
  {
    method: 'GET',
    path: '/api/reviews',
    handler: statisticsController.getReviews,
    options: {
      auth: false 
    }
  }
];

module.exports = routes;