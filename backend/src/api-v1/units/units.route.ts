import type { Request, Response} from "express"
// tslint:disable-next-line:no-duplicate-imports
import { Router } from "express";
import Controller from "./units.controller";
import { schema, validateBody } from "../../helpers/validation";

const units: Router = Router();
const controller = new Controller();

units.get("/",  async (req: Request, res: Response) => {
    const response = await controller.getAllUnits(req.query);

    return res.send(response);
});

units.get("/:id",  async (req: Request, res: Response) => {
    const response = await controller.getUnitById(+req.params.id);

    return res.send(response);
});

units.post("/", validateBody(schema.challengeUnit), async (req: Request, res: Response) => {
    const response = await controller.create(req.body);
    
    return res.send(response);
});

units.put("/:id", validateBody(schema.challengeUnit), async (req: Request, res: Response) => {
    const response = await controller.update(+req.params.id, req.body);

    return res.send(response);
});

units.delete("/:id",  async (req: Request, res: Response) => {
    const response = await controller.delete(+req.params.id);

    return res.send(response);
});

export default units;
