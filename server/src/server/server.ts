import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import TestController from '../routes/test.controller';
import ApolloController from '../routes/apollo.controller';

// get environment vars
dotenv.config();

const start = (container) => {
  return new Promise((resolve, reject) => {
    const { port } = container.resolve('serverSettings');

    if (!port) {
      reject(new Error('The server must be started with an available port'));
    }

    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors());

    const testRoutes = new TestController().getRoutes();
    const apolloRoutes = new ApolloController().getRoutes();
    app.use(testRoutes);
    app.use(apolloRoutes);

    const server = app.listen(port, () => {
      resolve(server);
    });
  });
}

export default Object.assign({}, { start });