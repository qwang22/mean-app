import { Router, Request, Response, NextFunction } from 'express';
import TestService from '../services/test.service';
import { DbService } from '../services/db.service';

export default class TestController {
  protected router: Router;
  protected service: TestService;

  constructor(db: DbService) { 
    this.router = this.createRouter();
    this.service = new TestService(db)
  }

  public createRouter = (): Router => {
    const router = Router();
    router.get('/test', this.get);

    return router;
  }

  public getRoutes = () => {
    return this.router;
  }

  protected get = async (req: Request, res: Response | any, next: NextFunction) => {
    const response = await this.service.test();
    res.status(200).send(response);
  }
}