import type { Request, Response} from "express"
// tslint:disable-next-line:no-duplicate-imports
import { Router } from "express";
import Controller from "./images.controller";

const images: Router = Router();
const controller = new Controller();

images.post("/upload", async (req: Request, res: Response) => {

    console.log('test')
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    const response = await controller.upload(req);
    return res.send(response);
});

export default images;
