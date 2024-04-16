import { Router } from "express";
import {createLead ,getAllLead , postImage} from "../controller/leadController.js"

const router = Router();

router.post("/createLead",createLead );
router.get("/getAllLead", getAllLead);
router.post("/postImage", postImage);

export default router;
