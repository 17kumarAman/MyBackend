import express from "express";
import {
    createClock,
    getAllClocks,
    getClockById,
    updateClock,
    deleteClock
} from "../controllers/TestClock.js";

const router = express.Router();

router.post("/create", createClock);
router.get("/get", getAllClocks);
router.get("/get/:id", getClockById);
router.put("/update/:id", updateClock);
router.delete("/delete/:id", deleteClock);

export default router;
