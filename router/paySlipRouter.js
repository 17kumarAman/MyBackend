import { Router } from "express";
import {getPayslip , togglePayslip} from "../controller/payslipController.js"

const router = Router();

router.post("/getPlayslip" , getPayslip);
router.post("/toglePayslip/:userId" , togglePayslip);


export default router;
