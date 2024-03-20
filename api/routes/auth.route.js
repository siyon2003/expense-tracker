
import { Router } from "express";
import { signin, signOut, signup } from "../Controllers/auth.controller.js";

const router = Router();

router.post("/signup", signup);
router.post("/signin",signin);
router.get("/signout",signOut);

export default router;
