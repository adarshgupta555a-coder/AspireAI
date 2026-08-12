import express from "express";
import { userData, userPosted } from "../controllers/users.controllers.js";
import { validateSchema } from "../middlewares/validate.middleware.js";
import { usersValidSchema } from "../schemas/user.schemas.js";

const router = express.Router();

router.get("/", userData);
router.post("/",validateSchema(usersValidSchema), userPosted);

export default router;