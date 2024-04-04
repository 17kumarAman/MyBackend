import { Router } from "express";
import {createAward , getAllAward} from "../controller/awardController.js"

const router = Router();

router.post("/postAward", createAward);
router.get("/getAllAward", getAllAward);

export default router;
