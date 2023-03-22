import { Router } from "express";
import swaggerUi from "swagger-ui-express";

const docs: Router = Router();

docs.use(
  "/",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/swagger.json",
    },
  })
);

export default docs;