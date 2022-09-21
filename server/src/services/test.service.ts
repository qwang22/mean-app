import { DbService } from "./db.service";

export default class TestService {
  private dbService: DbService;

  constructor(dbService: DbService) {
    this.dbService = dbService;
  }

  test(): Promise<any> {
    return this.dbService.getAll();
  }
}