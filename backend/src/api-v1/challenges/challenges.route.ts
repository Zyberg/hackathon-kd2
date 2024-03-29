import type { Request, Response} from "express"
// tslint:disable-next-line:no-duplicate-imports
import { Router } from "express";
import Controller from "./challenges.controller";
import { schema, validateBody } from "../../helpers/validation";

const challenges: Router = Router();
const controller = new Controller();

  // TODO add @Response
challenges.get("/",  async (req: Request, res: Response) => {
    const response = await controller.getAllChallenges(req.query);

    return res.send(response);
});

challenges.get("/:id",  async (req: Request, res: Response) => {
    const response = await controller.getChallengeById(+req.params.id);

    return res.send(response);
});

challenges.post("/", validateBody(schema.ChallengeCreateModel), async (req: Request, res: Response) => {
    const response = await controller.create(req.body);
    
    return res.send(response);
});

challenges.put("/:id", validateBody(schema.ChallengeUpdateModel),  async (req: Request, res: Response) => {
    const response = await controller.update(+req.params.id, req.body);

    return res.send(response);
});

challenges.delete("/:id",  async (req: Request, res: Response) => {
    const response = await controller.delete(+req.params.id);

    return res.send(response);
});

challenges.post('/:id/join/:userId', async (req: Request, res: Response) => {
    const response = await controller.join(+req.params.id, +req.params.userId);

    return res.send(response);
});

challenges.delete('/:id/join/:userId', async (req: Request, res: Response) => {
    const response = await controller.leave(+req.params.id, +req.params.userId);

    return res.send(response);
});

challenges.post("/upload", async (req: Request, res: Response) => {
    const response = await controller.upload(req);
    return res.send(response);
});

export default challenges;
