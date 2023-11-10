import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import cors from '@fastify/cors';
import cookie from '@fastify/cookie';

import 'dotenv/config';
import { routesData, registerRoutes } from '../utils/index.js';
import { db } from '../db/index.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicFolderPath = path.join(__dirname, '..', '..', 'public');

class Server {

  constructor() {
    this.app = fastify({
      logger: true,
    });
    this.port = process.env.PORTLH;

    // DB connection
    this.dbConnection();

    // Middlewares
    this.middlewares();

    // App routes
    this.routes();

  };

  async dbConnection() {
    try {
      await db.authenticate();
    } catch (error) {
      throw new Error(error);
    }
  };

  middlewares() {

    // CORS
    this.app.register(cors, {
      origin: '*', // Cambia esto al origen correcto
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    });

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

    this.app.register(cookie, {
      secret: process.env.PORTLH,
    })

  };

  routes() {

    routesData.forEach((routeData) => {
      registerRoutes(this.app, routeData);
    });

  };

  listen() {
    this.app.listen({ port: this.port }, (err, address) => {
      if (err) {
        this.app.log.error(err);
        process.exit(1);
      };
      console.log(`Listening on port http://localhost:${this.port}`);
    });
  };
};

export default Server;