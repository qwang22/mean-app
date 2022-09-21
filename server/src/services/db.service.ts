import * as mongoose from 'mongoose';
import { dbConnection } from '../config/db.connection';
import * as fs from 'fs';
import * as path from 'path';

export class DbService {
  private db: any;
  private readonly dbConn: any = null;

  constructor(dbConn: any = dbConnection) {
    this.dbConn = dbConn;
  }

  connect(): Promise<string> {
    return new Promise((resolve, reject) => {
      if (this.dbConn && this.dbConn.dbUrl && this.dbConn.options) {
        mongoose.connect(this.dbConn.dbUrl as string, this.dbConn.options as mongoose.ConnectOptions).then(
          (_success) => {
            this.db = mongoose.connection;
            const entities = this.bindModels();
            console.info(`Discovered the following schema entities ${entities}`);
            resolve(JSON.stringify(this.dbConn));
          },
          (err) => {
            console.error('Cannot connect to mongoose:', err)
            reject(err);
          });
      } else {
        console.error('Mongo connection dbUrl & options cannot be null');
        reject('Mongo connection dbUrl & options cannot be null')
      }
    });
  }

  close() {
    if (this.db) return this.db.close();
  }

  bindModels(): string[] {
    const pathToModels = path.join(__dirname, '..', 'models');
    let files: string[] = [];
    try {
      files = fs.readdirSync(pathToModels).filter(file => (file.indexOf('.') !== 0 && file.slice(-3) === '.ts'))
        .map(file => { return file });
    } catch(err) {
      console.error('error', `unable to bind models ${err}`);
    }

    return files;
  }
}