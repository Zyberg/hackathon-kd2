import { NextFunction, Response, Router, Request } from "express";
import stravaClient from "./strava/stravaClient";

const router: Router = Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    const a = await stravaClient.getMyActivities("f442b8037a528342d4a09476af67cf1a770fa8c4");

    res.send({ a })
});

export default router;
