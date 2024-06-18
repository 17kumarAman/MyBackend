import { Router } from "express";
import {createLead ,getAllLead,getAllLead3 ,  editLeadStatus,getAllLead2, postImage,deleteLeads , editLead, editLeadNote , GetAllLeadByAdmin , GetLeadById} from "../controller/leadController.js"

const router = Router();

router.post("/createLead",createLead );
router.get("/getLeadById/:id" , GetLeadById);

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


router.post("/updateLeadStatus/:id" , editLeadStatus);
router.post("/updateLeadNote/:id" , editLeadNote);

export default router;
