import type { Request, Response} from "express"
import { Router } from "express";
import Controller from "./users.controller";

const users: Router = Router();
const controller = new Controller();


users.get("/", async (req: Request, res: Response) => {
    const response = await controller.getAllUsers();
    return res.send(response);
});

export default users;
