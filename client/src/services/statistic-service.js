const BASE_URL = 'http://localhost:5000/api';

const StatisticService = {
  async getReportStatistics() {
    try {
      const response = await fetch(`${BASE_URL}/statistics/reports`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch statistics');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching report statistics:', error);
      return {
        active: 0,
        completed: 0,
        pending: 0
      };
    }
  },

  async getReviews() {
    try {
      const response = await fetch(`${BASE_URL}/reviews`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch reviews');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching reviews:', error);
      return [];
    }
  }
};

export default StatisticService;