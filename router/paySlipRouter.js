import { Router } from "express";
import {getPayslip , togglePayslip , bulkPayslip} from "../controller/payslipController.js"

const router = Router();

router.post("/getPlayslip" , getPayslip);
router.post("/toglePayslip/:userId" , togglePayslip);
router.post("/bulkPayslip" , bulkPayslip);


export default router;
