import { Router, Request, Response, NextFunction } from 'express';

export default class TestController {
  protected router: Router;

  constructor() { 
    this.router = this.createRouter();
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
    await res.send('Test GET works');
  }
}