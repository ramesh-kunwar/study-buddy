import { Router } from "express";
import validate from "../../middleware/validate";

import { registerSchema, loginSchema } from "./auth.schema";
import { loginUserController, logoutUserController, registerUserController } from "./auth.controller";

const router = Router();
router.post("/register", validate(registerSchema), registerUserController);
router.post("/login", validate(loginSchema), loginUserController);
router.post("/logout", logoutUserController);

export default router;
