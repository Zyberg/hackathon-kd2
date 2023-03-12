import type { Request, Response} from "express"
import { Router } from "express";
import { DataTableQuery } from "../../types/generic/DataTable";
import Controller from "./users.controller";

const users: Router = Router();
const controller = new Controller();

users.get("/", async (req: Request, res: Response) => {
    const response = await controller.getAllUsers(req.query as DataTableQuery);

    console.log(req.query as DataTableQuery);
    return res.send(response);
});

export default users;
