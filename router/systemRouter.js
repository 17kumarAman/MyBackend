import { Router } from "express";
import {
  postLeaveType,
  updateLeaveType,
  getLeaveTypes,
  deleteLeaveType,
  getDesignation,
  deleteDesignation,
  getDesignations,
  postDesignation,
  updateDesignation,
  fetchAllDocs,
  deleteDepartment,
  getDepartments,
  postDepartment,
  updateDepartment,

  deleteBranch,
  getBranchs,
  postBranch,
  updateBranch,
  getEmployess ,
  createDocSetup , 
  updateDocSetup , 
  deleteDocSetup,
  postLeadSource,
  updateLeadSources,
  getLeadSources,
  deleteLeadSource,
  postIndustry,
  updateIndustry,
  getIndustry,
  deleteIndustry,
} from "../controller/systemController.js";

const router = Router();

router.post("/postLeaveType", postLeaveType);

router.put("/updateLeaveType/:id", updateLeaveType);

router.get("/getLeaveTypes", getLeaveTypes);

router.delete("/deleteLeaveType/:id", deleteLeaveType);

router.post("/postBranch", postBranch);

router.put("/updateBranch/:id", updateBranch);

router.get("/getBranchs", getBranchs);

router.delete("/deleteBranch/:id", deleteBranch);

router.post("/postDepartment", postDepartment);

router.put("/updateDepartment/:id", updateDepartment);

router.get("/getDepartments", getDepartments);

router.delete("/deleteDepartment/:id", deleteDepartment);

router.post("/postDesignation", postDesignation);

router.put("/updateDesignation/:id", updateDesignation);

router.get("/getDesignations/:id", getDesignations);
router.get("/getEmployeess/:id",getEmployess);
router.get("/getDesignation", getDesignation);

router.delete("/deleteDesignation/:id", deleteDesignation);

router.post("/createDocSetup" , createDocSetup);
router.post("/updateDocSetup/:id" , updateDocSetup);
router.delete("/deleteDocSetup/:id" , deleteDocSetup);
router.get("/fetchAllDocs" , fetchAllDocs);

router.post("/postLeadSource", postLeadSource);
router.put("/updateLeadSource/:id", updateLeadSources);
router.get("/getLeadSource", getLeadSources);
router.delete("/deleteLeadSource/:id", deleteLeadSource);

router.post("/postIndustry", postIndustry);
router.put("/updateIndustry/:id", updateIndustry);
router.get("/getIndustry", getIndustry);
router.delete("/deleteIndustry/:id", deleteIndustry);




export default router;
