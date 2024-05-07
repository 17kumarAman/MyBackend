import { Router } from "express";
import {getAllUserPayroll , editUserSalary , createAllowance , editAllowance , deleteAllowance , createCommission , editCommission , deleteCommission , createLoan , editLoan , deleteLoan} from "../controller/payrollController.js"

const router = Router();

router.get("/getAllUserPayroll/:id" , getAllUserPayroll);
router.post("/editUserSalary/:id" , editUserSalary);

// for allowance 
router.post("/createAllowance/:id" , createAllowance);
router.post("/editAllowance" , editAllowance);
router.delete("/deleteAllowance/:allowanceId" , deleteAllowance);

// for commision
router.post("/createCommission/:id" , createCommission);
router.post("/editCommission" , editCommission);
router.delete("/deleteCommission/:allowanceId" , deleteCommission);

// for loan 
router.post("/createLoan/:id" , createLoan);
router.post("/editLoan" , editLoan);
router.delete("/deleteLoan/:allowanceId" , deleteLoan);


export default router;
