import { Router } from "express";
import {createLead ,getAllLead,getAllLead3 , GetLeadByUser , GetDesiUser, editLeadStatus,getAllLead2, postImage,deleteLeads , editLead, editLeadNote , GetAllLeadByAdmin , GetLeadById, CreateLeadStatus ,getLeadStatus , getLeadSource ,CreateLeadSource  , UpdateLeadStatus ,UpdateLeadSource , CreateLeadNote , UpdateLeadNote , DeleteLeadNote , GetNoteById , GetOpenLeads, GetDesiUser1 , PostQuotationForm , GetQuotationApi , DeleteQuotationapi , UpdateQuotationForm
} from "../controller/leadController.js"
 
const router = Router();

router.post("/createLead",createLead );
router.get("/getLeadById/:id" , GetLeadById);
router.get("/getOpenLeads/:id" , GetOpenLeads);

router.get("/getLeadByUser/:id" , GetLeadByUser);
router.get("/getDesiUser" , GetDesiUser);
router.get("/getDesiUser1",GetDesiUser1);

router.post('/getAllLead', async (req, res) => {
    const {id} = req.body;
    const data = await getAllLead({ ...req.query , userId: id });
    res.json(data);
});
router.get('/getAllLead', async (req, res) => {
    const data = await getAllLead2({ ...req.query  });
    res.json(data);
});
router.get('/getAllLead2/:userId', async (req, res) => {
    const data = await getAllLead3({ ...req.query , ...req.params  });
    res.json(data);
});

router.get("/getAllLeadByAdmin" , GetAllLeadByAdmin);
router.post("/postImage", postImage);
router.delete("/deleteLead/:id",deleteLeads);
router.post("/editLead/:id" ,editLead );


router.post("/createLeadStatus" , CreateLeadStatus);
router.post("/createLeadSource" , CreateLeadSource);

router.get("/allLeadStatus" , getLeadStatus);
router.get("/allLeadSource" , getLeadSource);

router.post("updateLeadStatus" , UpdateLeadStatus);
router.post("updateLeadSource" , UpdateLeadSource);

router.post("/updateLeadStatus/:id" , editLeadStatus);
router.post("/updateLeadNote/:id" , editLeadNote);

router.post("/createLeadNote/:LeadId" , CreateLeadNote);
router.post("/updateLeadNote2/:noteId" , UpdateLeadNote);
router.delete("/deleteLeadNote/:leadId" , DeleteLeadNote);
router.get("/getNoteById/:leadId" , GetNoteById);
router.get("/getQuotationApi/:leadId" , GetQuotationApi);
router.delete("/deleteQuotationapi/:id" , DeleteQuotationapi);

router.post("/postQuotationForm" , PostQuotationForm);
router.post("/updateQuotationForm/:quoId" , UpdateQuotationForm);

export default router;
