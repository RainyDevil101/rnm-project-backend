import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import cors from '@fastify/cors';
import 'dotenv/config';

import getRoutes from '../routes/user.routes.js';


const __dirname = dirname(fileURLToPath(import.meta.url));
const publicFolderPath = path.join(__dirname, '..', '..', 'public');

class Server {

  constructor() {
    this.app = fastify({
      logger: true,
    });
    this.port = process.env.PORT;
    this.usersPath = '/api/users';

    // Middlewares
    this.middlewares();

    // App routes
    this.routes();

  };

  middlewares() {

    // CORS
    this.app.register(cors, {});

    // Public Directory

    this.app.register(fastifyStatic, {
      root: publicFolderPath,
      prefix: '/',
      list: {
        format: 'html',
        render: (publicFolderPath) => {
          return publicFolderPath;
        }
      }
    });

  };

  routes() {

    const { routes } = getRoutes();

    this.app.register((app, _, done) => {
      routes.map((route) => {
        app.route(route);
      });
      done();
    }, { prefix: this.usersPath });
  };

  listen() {
    this.app.listen({ port: this.port }, (err, address) => {
      if (err) {
        this.app.log.error(err);
        process.exit(1);
      };
      console.log('Listening on port:', address);
    });
  };
};

export default Server;