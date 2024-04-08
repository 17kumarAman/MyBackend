import { Router } from "express";
import {createClock , getClockByUserDate , getAttendanceDetails , getAllAttendence} from "../controller/clockController.js"

const router = Router();

router.post('/createClock/:userId',createClock);
router.post('/getClock/:userId',getClockByUserDate);
router.post("/attendencedetail" , getAttendanceDetails);
router.get("/allAttendence" , getAllAttendence);

export default router;
