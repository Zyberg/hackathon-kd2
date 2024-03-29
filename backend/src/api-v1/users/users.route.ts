import type { Request, Response} from "express"
// tslint:disable-next-line:no-duplicate-imports
import { Router } from "express";
import Controller from "./users.controller";

const users: Router = Router();
const controller = new Controller();

users.get("/",  async (req: Request, res: Response) => {
    const response = await controller.getAllUsers(req.query);

    return res.send(response);
});

users.get("/:id",  async (req: Request, res: Response) => {
    const response = await controller.getUserById(+req.params.id);

    return res.send(response);
});

users.get("/:id/challenges",  async (req: Request, res: Response) => {
    const response = await controller.getUserChallenges(+req.params.id);

    return res.send(response);
});

users.get("/:id/achievements",  async (req: Request, res: Response) => {
    const response = await controller.getUserAchievements(+req.params.id);

    return res.send(response);
});


users.delete("/:id",  async (req: Request, res: Response) => {
    const response = await controller.deleteUserById(+req.params.id);

    return res.send(response);
});

users.get('/:id/activitygraph', async (req: Request, res: Response) => {
    const response = await controller.getUserActivityGraph(+req.params.id);

    return res.send(response);
})

export default users;
