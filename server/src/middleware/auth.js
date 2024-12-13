const jwt = require('jsonwebtoken');

const validateToken = {
  assign: 'user',
  method: async (request, h) => {
    try {
      const token = request.headers.authorization?.replace('Bearer ', '');
      
      if (!token) {
        return h.response({
          status: 'fail',
          message: 'Token tidak ditemukan',
        }).code(401).takeover();
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return decoded;
    } catch (error) {
      return h.response({
        status: 'fail',
        message: 'Token tidak valid',
      }).code(401).takeover();
    }
  },
};

module.exports = { validateToken };