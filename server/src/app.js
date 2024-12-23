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
        origin: ['https://urbanaid-client.vercel.app', 'http://localhost:9000'],
        headers: ['Accept', 'Authorization', 'Content-Type', 'X-Requested-With'],
        credentials: true,
        additionalHeaders: ['X-Requested-With']
      }
    },
  });

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

  // Error logging
  server.events.on('response', (request) => {
    console.log(`${request.info.remoteAddress}: ${request.method.toUpperCase()} ${request.path} --> ${request.response.statusCode}`);
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