import { Router } from "express";
import { checkAccess } from "../controllers/accessCheckController";

const router = Router();

router.post("/check", checkAccess);

export default router;
