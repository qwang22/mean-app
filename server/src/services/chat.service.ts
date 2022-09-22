import { DbService } from "./db.service";

export default class ChatService {
  private dbService: DbService;

  constructor(dbService: DbService) {
    this.dbService = dbService;
  }

  get(req?: Request | any): Promise<any> {
    return this.dbService.getChat(req?.params?.id);
  }

  post(req: Request): Promise<any> {
    return this.dbService.createChat(req.body);
  }
}