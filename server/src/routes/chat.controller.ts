import { Router, Request, Response, NextFunction } from 'express';
import ChatService from '../services/chat.service';
import { DbService } from '../services/db.service';

export default class ChatController {
  protected router: Router;
  protected service: ChatService;

  constructor(db: DbService) {
    this.router = this.createRouter();
    this.service = new ChatService(db);
  }

  public createRouter = (): Router => {
    const router = Router();

    router.get('/chat', this.get);
    router.get('/chat/:id', this.get);
    router.post('/chat', this.post);

    return router;
  }

  public getRoutes = () => {
    return this.router;
  }

  protected get = async (req: Request, res: Response, next: NextFunction) => {
    const response = await this.service.get(req);
    res.status(200).send(response);
  }

  protected post = async (req: Request | any, res: Response, next: NextFunction) => {
    const response = await this.service.post(req);
    res.status(200).send(response);
  }
}