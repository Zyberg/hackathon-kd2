import { Router } from "express";

import users from "./users/users.route";
//import challenges from "./challenges/challenges.route";
import achievements from "./achievements/achievements.route";
import { auth } from "../helpers/auth/auth";

const router: Router = Router();

// Authenticate API with jwt tokens
router.use(auth.jwt)

router.use("/users", users);
//router.use("/challenges", challenges);
router.use("/achievements", achievements);

export default router;
