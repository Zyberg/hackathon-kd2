import { Router } from "express";

import users from "./users/users.route";
import challenges from "./challenges/challenges.route";

const router: Router = Router();

router.use("/users", users);
router.use("/challenges", challenges);

export default router;
