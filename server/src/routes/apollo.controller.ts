import { Router, Request, Response, NextFunction } from 'express';

export default class ApolloController {
  protected router: Router;

  constructor() { 
    this.router = this.createRouter();
  }

  public createRouter = (): Router => {
    const router = Router();
    router.get('/apollo', this.get);

    return router;
  }

  public getRoutes = () => {
    return this.router;
  }

  protected get = async (req: Request, res: Response | any, next: NextFunction) => {
    return this.getHandler(req, res, next);
  }

  protected getHandler = async (req, res, next) => {
    res.send({ obj: 'test'})
  }
}