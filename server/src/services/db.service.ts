import mongoose from 'mongoose';
import { dbConnection } from '../config/db.connection';
import bindModels from '../lib/model-binder';

export class DbService {
  private db: mongoose.Connection;
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
            const entities = bindModels();
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

  close(): Promise<void> {
    if (this.db) return this.db.close();
  }

  getAll = async () => {
    return this.db.models.Test.find({});
  }

  // Chat methods

  getChat = async (_id?: string) => {
    return this.db.models.Chat.find(_id ? { _id } : {});
  }

  createChat = async (chat) => {
    return this.db.models.Chat.create(chat, { new: true });
  }

  updateChat = async (chat) => {
    console.log('chat obj received', chat)
    const match = { _id: chat._id };
    const { user, message } = chat;
    const messages = { messages: { user, message } };
    return this.db.models.Chat.update(match, { $push: messages }, { new: true });
  }
}