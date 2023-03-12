import type { Request, Response} from "express"
// tslint:disable-next-line:no-duplicate-imports
import { Router } from "express";
import { DataTableQuery } from "../../types/generic/DataTable";
import Controller from "./achievements.controller";

const achievements: Router = Router();
const controller = new Controller();

achievements.get("/", async (req: Request, res: Response) => {
    const response = await controller.getAllAchievements(req.query);

    console.log(req.query as DataTableQuery);
    return res.send(response);
});

export default achievements;
