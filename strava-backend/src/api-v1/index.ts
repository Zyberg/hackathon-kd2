import { Router } from "express";

import users from "./users/users.route";
import challenges from "./challenges/challenges.route";
import achievements from "./achievements/achievements.route";

const router: Router = Router();

router.use("/users", users);
router.use("/challenges", challenges);
router.use("/achievements", achievements);

export default router;
