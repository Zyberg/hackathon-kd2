import { NextFunction, Response, Router, Request } from "express";
import stravaClient from "./strava/stravaClient";

const router: Router = Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    console.log('yaya')

    const a = await stravaClient.getMyActivities();

    res.send({ a })
});

export default router;
