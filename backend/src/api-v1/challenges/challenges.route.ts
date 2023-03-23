import type { Request, Response} from "express"
// tslint:disable-next-line:no-duplicate-imports
import { Router } from "express";
import Controller from "./challenges.controller";

const challenges: Router = Router();
const controller = new Controller();

challenges.get("/",  async (req: Request, res: Response) => {
    const response = await controller.getAllChallenges(req.query);

    return res.send(response);
});

export default challenges;