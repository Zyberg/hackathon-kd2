import { Router } from "express";

import auth from "./authentication/authentication.route";

const router: Router = Router();

router.use("/", auth);

export default router;
