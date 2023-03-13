import { Router } from "express";

import auth from "./authentication/authentication.route";
import users from "./users/users.route";
import challenges from "./challenges/challenges.route";
import achievements from "./achievements/achievements.route";
import wip from "./wip";

const router: Router = Router();

router.use("/auth", auth);
router.use("/users", users);
router.use("/challenges", challenges);
router.use("/achievements", achievements);
router.use("/test", wip);

export default router;
