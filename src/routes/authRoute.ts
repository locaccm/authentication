import { Router } from "express";
import { inviteTenant, signIn, signUp } from "../controllers/authController";

const router = Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/invitetenant", inviteTenant);

export default router;
