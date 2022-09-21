import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import TestController from '../routes/test.controller';
import ApolloController from '../routes/apollo.controller';
import { DbService } from '../services/db.service';

class Server {
  private app: express.Express | any; // check on this
  dbService: DbService;

  constructor(dbService: DbService) {
    this.dbService = dbService;
    dotenv.config();
  }

  public start = (container) => {
    return new Promise((resolve, reject) => {
      const { port } = container.resolve('serverSettings');
  
      if (!port) {
        reject(new Error('The server must be started with an available port'));
      }
  
      this.app = express();
      this.app.use(express.json());
      this.app.use(express.urlencoded({ extended: true }));
      this.app.use(cors());
  
      const testRoutes = new TestController().getRoutes();
      const apolloRoutes = new ApolloController().getRoutes();
      this.app.use(testRoutes);
      this.app.use(apolloRoutes);
  
      const server = this.app.listen(port, () => {
        this.dbConnect().then(
          (_success) => {
            resolve(server);
          },
          (err) => {
            reject(err)
          }
        );
      });
    });
  }

  private dbConnect(): Promise<any> {
    return new Promise((resolve, reject) => {
      console.info('Attemping to connect to database...');
      this.dbService.connect().then(
        (connectionInfo) => {
          console.info(`Successfully connected to database: ${connectionInfo}`);
          resolve(true);
        },
        (err) => {
          console.error(`Error when connecting to database ${err}`);
          reject(err)
        }
      );
    });
  }

}

export { Server };