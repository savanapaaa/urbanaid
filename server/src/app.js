const Hapi = require('@hapi/hapi');
const jwt = require('hapi-auth-jwt2');
const Path = require('path');
const Inert = require('@hapi/inert');
const authRoutes = require('./routes/auth.routes');
const statisticsRoutes = require('./routes/statistics.routes');
const reportRoutes = require('./routes/report.routes');
const riwayatRoutes = require('./routes/riwayat.routes');
const reviewRoutes = require('./routes/review.routes');
const superadminRoutes = require('./routes/superadmin.routes');
require('dotenv').config();

const validate = async (decoded, request, h) => {
  if (request.path.startsWith('/api/superadmin') && decoded.role !== 'superadmin') {
    return { isValid: false };
  }
  return { isValid: true, credentials: decoded };
};

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT,
    host: '0.0.0.0',
    routes: {
      cors: {
        origin: ['https://urbanaid-client.vercel.app'],
        additionalHeaders: ['cache-control', 'x-requested-with'],
        credentials: true
      }
    }
  });

  // Global route untuk menangani OPTIONS requests
  server.route({
    method: 'OPTIONS',
    path: '/{any*}',
    handler: (request, h) => {
      const response = h.response('OK');
      response.header('Access-Control-Allow-Origin', 'https://urbanaid-client.vercel.app');
      response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      response.header('Access-Control-Allow-Headers', 'Authorization, Content-Type, X-Requested-With');
      response.header('Access-Control-Allow-Credentials', 'true');
      response.code(200);
      return response;
    },
    options: {
      auth: false,
      cors: true
    }
  });

  // Plugin registration
  await server.register([
    { plugin: jwt },
    { plugin: Inert }
  ]);

  // JWT strategy setup
  server.auth.strategy('jwt', 'jwt', {
    key: process.env.JWT_SECRET,
    validate,
    verifyOptions: { algorithms: ['HS256'] }
  });

  server.auth.default('jwt');

  // Register all routes
  const routes = [
    ...authRoutes,
    ...statisticsRoutes,
    ...reportRoutes,
    ...riwayatRoutes,
    ...reviewRoutes,
    ...superadminRoutes
  ];

  // Add CORS options to each route
  const routesWithCors = routes.map(route => ({
    ...route,
    options: {
      ...route.options,
      cors: {
        origin: ['https://urbanaid-client.vercel.app'],
        credentials: true,
        additionalHeaders: ['cache-control', 'x-requested-with']
      }
    }
  }));

  server.route(routesWithCors);

  // Response monitoring
  server.events.on('response', request => {
    console.log(`${request.info.remoteAddress}: ${request.method.toUpperCase()} ${request.path} --> ${request.response.statusCode}`);
  });

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.error('Unhandled rejection:', err);
  process.exit(1);
});

init();