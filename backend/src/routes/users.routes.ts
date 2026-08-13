import express from "express";
import { Register, userData } from "../controllers/users.controllers.js";
import { validateSchema } from "../middlewares/validate.middleware.js";
import { usersValidSchema } from "../schemas/user.schemas.js";

const router = express.Router();

router.get("/", userData);
router.post("/",validateSchema(usersValidSchema), Register);

export default router;