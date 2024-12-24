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
  console.log('Available routes:', authRoutes);  
  const server = Hapi.server({
    port: process.env.PORT || 5000,
    host: '0.0.0.0',
    routes: {
      cors: {
        origin: ['*'],
        headers: [
          'Accept',
          'Authorization',
          'Content-Type',
          'If-None-Match',
          'X-Requested-With'
        ],
        exposedHeaders: ['Authorization', 'Content-Type'],
        additionalHeaders: ['X-Requested-With'],
        credentials: false
      },
    },
  });

  // Pre-handler untuk CORS
  server.ext('onPreHandler', (request, h) => {
    if (request.method === 'options') {
      const response = h.response('OK');
      response.header('Access-Control-Allow-Origin', '*');
      response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      response.header('Access-Control-Allow-Headers', 'Authorization, Content-Type, X-Requested-With');
      return response;
    }
    return h.continue;
  });

  // Pre-response handler untuk CORS
  server.ext('onPreResponse', (request, h) => {
    const response = request.response;
    if (response.isBoom) {
      response.output.headers['Access-Control-Allow-Origin'] = '*';
      response.output.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
      response.output.headers['Access-Control-Allow-Headers'] = 'Authorization, Content-Type, X-Requested-With';
    } else {
      response.header('Access-Control-Allow-Origin', '*');
      response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      response.header('Access-Control-Allow-Headers', 'Authorization, Content-Type, X-Requested-With');
    }
    return h.continue;
  });

  // Logging middleware untuk request
  server.ext('onRequest', (request, h) => {
    console.log('Incoming request:', {
      method: request.method,
      path: request.path,
      headers: request.headers
    });
    return h.continue;
  });

  // Root route
  server.route({
    method: 'GET',
    path: '/',
    handler: () => {
      return { status: 'success', message: 'Server is running' };
    },
    options: {
      auth: false
    }
  });

  // OPTIONS route untuk CORS preflight
  server.route({
    method: 'OPTIONS',
    path: '/{any*}',
    handler: (request, h) => {
      const response = h.response('OK');
      response.header('Access-Control-Allow-Origin', '*');
      response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      response.header('Access-Control-Allow-Headers', 'Authorization, Content-Type, X-Requested-With');
      return response;
    },
    options: {
      auth: false
    }
  });

  // Register plugins
  await server.register([
    {
      plugin: jwt
    },
    {
      plugin: Inert
    }
  ]);

  // Setup JWT auth strategy
  server.auth.strategy('jwt', 'jwt', {
    key: process.env.JWT_SECRET,
    validate,
    verifyOptions: { algorithms: ['HS256'] },
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

  server.route(routes);

  // Response logging
  server.events.on('response', (request) => {
    console.log('Response sent:', {
      method: request.method,
      path: request.path,
      statusCode: request.response.statusCode,
      headers: request.response.headers
    });

    if (request.response.statusCode >= 400) {
      console.error('Error details:', request.response.source);
    }
  });

  // Route logging on startup
  server.ext('onPreStart', () => {
    console.log('Registering routes:');
    routes.forEach((route) => {
      if (Array.isArray(route.method)) {
        route.method.forEach((method) => {
          console.log(`  ${method.toUpperCase()} ${route.path}`);
        });
      } else {
        console.log(`  ${route.method.toUpperCase()} ${route.path}`);
      }
    });
  });

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.error('Unhandled rejection:', err);
  process.exit(1);
});

init();