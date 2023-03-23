import type { Request, Response} from "express"
// tslint:disable-next-line:no-duplicate-imports
import { Router } from "express";
import Controller from "./achievements.controller";
import { schema, validateBody } from "../../helpers/validation";

const achievements: Router = Router();
const controller = new Controller();

  // TODO add @Response
  achievements.get("/",  async (req: Request, res: Response) => {
    const response = await controller.getAllAchievements(req.query);

    return res.send(response);
});

achievements.get("/:id",  async (req: Request, res: Response) => {
    const response = await controller.getAchievementById(+req.params.id);

    return res.send(response);
});

achievements.post("/", validateBody(schema.Achievement), async (req: Request, res: Response) => {
    const response = await controller.create(req.body);
    
    return res.send(response);
});

achievements.put("/:id", validateBody(schema.Achievement), async (req: Request, res: Response) => {
    const response = await controller.update(+req.params.id, req.body);

    return res.send(response);
});

achievements.delete("/:id",  async (req: Request, res: Response) => {
    const response = await controller.delete(+req.params.id);

    return res.send(response);
});

export default achievements;
