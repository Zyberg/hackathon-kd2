import type { Request, Response} from "express"
// tslint:disable-next-line:no-duplicate-imports
import { Router } from "express";
import Controller from "./userGroups.controller";
import { schema, validateBody } from "../../helpers/validation";

const userGroups: Router = Router();
const controller = new Controller();

userGroups.get("/",  async (req: Request, res: Response) => {
    const response = await controller.getAllUserGroups(req.query);

    return res.send(response);
});

userGroups.get("/:id",  async (req: Request, res: Response) => {
    const response = await controller.getUserGroupById(+req.params.id);

    return res.send(response);
});

userGroups.post("/", validateBody(schema.UserGroupCreateModel), async (req: Request, res: Response) => {
    const response = await controller.create(req.body);
    
    return res.send(response);
});

userGroups.put("/:id", validateBody(schema.UserGroupUpdateModel), async (req: Request, res: Response) => {
    const response = await controller.update(+req.params.id, req.body);

    return res.send(response);
});

userGroups.delete("/:id",  async (req: Request, res: Response) => {
    const response = await controller.delete(+req.params.id);

    return res.send(response);
});

export default userGroups;
