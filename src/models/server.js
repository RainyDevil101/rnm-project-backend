import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import 'dotenv/config';

class Server {

  constructor() {
    this.app = fastify({
      logger: true,
    });
    this.port = process.env.PORT;

    // Middlewares
    this.middlewares();

    // App routes
    this.routes();

  };

  middlewares() {

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    const publicFolderPath = path.join(__dirname, '..', '..', 'public');

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
    this.app.get('/api', (req, res) => {
      res.send({ hello: 'world' });
    });
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

