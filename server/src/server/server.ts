import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
// const { Server } = require("socket.io");
import { Server as SocketServer } from 'socket.io';
import TestController from '../routes/test.controller';
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
      this.app.use(morgan('dev'));

      // custom middleware example
      // this.app.use(function(req, res, next) {
      // });
  
      const testRoutes = new TestController(this.dbService).getRoutes();
      this.app.use(testRoutes);
  
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

      this.enableSockets(server);
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

  // move to separate file
  private enableSockets(server: any) {
    const io = new SocketServer(server, {
      cors: {
        origin: 'http://localhost:4200',
        methods: ['GET', 'POST']
      }
    });
    io.sockets.on('connection', (socket) => {
      console.log('SOCKET CONNECTION MADE')
      socket.on('join', (data) => {
        socket.join(data.room);
        // check for current chatrooms in db & create 1 if none exist
        console.log('joined, checking for rooms....')
      });
      socket.on('message', (data) => {
        io.in(data.room).emit('new message', { user: data.user, message: data.message });
        // update the active chat room's messages
        console.log('message received, updating chat room')
      });
      socket.on('typing', (data) => {
        console.log('TYPING EVENT RECEIVED')
        socket.broadcast.in(data.room).emit('typing', {data: data, isTyping: true});
      });
    });
  }

}

export { Server };