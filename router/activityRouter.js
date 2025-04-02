import { Router } from "express";

import isAuthenticated from "../middleware/auth.js";
import { upload } from "../middleware/multer.js";
import {
  deleteAllActivities,
  getActivitiesByUser,
  getAllActivities,
  getStatisticsByUser,
  postActivity,
  postActivityHr,
  getActivity
} from "../controller/activityController.js";
const router = Router();

router.post("/postActivity", isAuthenticated, postActivity);

router.post("/postActivityHr", isAuthenticated, postActivityHr);

router.get("/getActivitiesByUser", isAuthenticated, getActivitiesByUser);
router.get("/getActivity/:userId", getActivity);


router.get("/getStatisticsByUser", isAuthenticated, getStatisticsByUser);

router.get("/getAllActivities", getAllActivities);

router.delete("/deleteAllActivities", deleteAllActivities);

export default router;
