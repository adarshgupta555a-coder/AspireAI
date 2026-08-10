import express from "express";
import { userData } from "../controllers/users.controllers.js";

const router = express.Router();

router.get("/", userData);

export default router;