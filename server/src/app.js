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
    port: process.env.PORT || 5000,
    host: '0.0.0.0',
    routes: {
      cors: {
        origin: ['https://urbanaid-client.vercel.app'], // Specify exact origin
        credentials: true,
        headers: ['Accept', 'Authorization', 'Content-Type', 'X-Requested-With'],
        exposedHeaders: ['Authorization'],
        maxAge: 86400
      }
    }
  });

  // Global route untuk menangani OPTIONS requests
  server.route({
    method: 'OPTIONS',
    path: '/{any*}',
    handler: (request, h) => {
      return h.response('OK')
        .code(200)
        .header('Access-Control-Allow-Origin', 'https://urbanaid-client.vercel.app')
        .header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        .header('Access-Control-Allow-Headers', 'Authorization, Content-Type, X-Requested-With')
        .header('Access-Control-Max-Age', '86400');
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
        headers: ['Accept', 'Authorization', 'Content-Type', 'X-Requested-With'],
        exposedHeaders: ['Authorization'],
        credentials: true,
        maxAge: 86400
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