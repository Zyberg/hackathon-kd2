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


users.delete("/:id",  async (req: Request, res: Response) => {
    console.log(req.params.id)
    const response = await controller.deleteUserById(+req.params.id);

    return res.send(response);
});

export default users;
