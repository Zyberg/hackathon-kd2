import type { Request, Response} from "express"
// tslint:disable-next-line:no-duplicate-imports
import { Router } from "express";
import Controller from "./images.controller";

const images: Router = Router();
const controller = new Controller();

images.post("/upload", async (req: Request, res: Response) => {
    const response = await controller.upload(req);
    return res.send(response);
});

export default images;
