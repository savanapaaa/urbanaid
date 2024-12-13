const AuthController = require('../controllers/auth-controller');
const { validateToken } = require('../middleware/auth');

const routes = [
  {
    method: 'POST',
    path: '/api/auth/register',
    handler: AuthController.register,
    options: {
      auth: false,
    },
  },
  {
    method: 'POST',
    path: '/api/auth/login',
    handler: AuthController.login,
    options: {
      auth: false,
    },
  },
  {
    method: 'POST',
    path: '/api/auth/admin/create',
    handler: AuthController.createAdmin,
    options: {
      auth: 'jwt',
      pre: [validateToken],
    },
  },
];

module.exports = routes;