import { Router } from "express";
import { loginController, addATenantController, getUserController } from "../Controllers/index.js";

const router = Router();

router.post("/add", addATenantController);
router.post("/login", loginController);
router.get("/users", getUserController);

export default router;