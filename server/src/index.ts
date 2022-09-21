import { Server } from './server/server';
import di from './config';
import { EventEmitter } from 'events';
import { DbService } from './services/db.service';

class Main {
  public mediator = new EventEmitter();
  private server: any;

  constructor() {
    process.on('uncaughtException', this.shutdown);
    process.on('unhandledRejection', this.shutdown);

    this.mediator.on('di.ready', (container) => {
      const server = new Server(new DbService());
      server.start(container).then(
        (app) => {
          this.server = app;
          console.info(`Server started, running on port ${container.cradle.serverSettings.port}`);
        }
      );
    });
    di.init(this.mediator);

    this.mediator.emit('init');
  }

  public shutdown = (err: Error = null): void => {
    console.info('shutting down', err)
    if (err) {
      console.error(`Error occurred during shutdown ${err}`);
    }

    this.server.close(() => {
      console.info(`Shutting down server`);
    })
  }
}

const main = new Main();

export = main;