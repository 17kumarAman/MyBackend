import { Router } from "express";
import {createLead ,getAllLead, editLeadStatus,getAllLead2, postImage,deleteLeads , editLead} from "../controller/leadController.js"

const router = Router();

router.post("/createLead",createLead );
// router.get("/getAllLead", getAllLead);
router.post('/getAllLead', async (req, res) => {
    const {id} = req.body;
    const data = await getAllLead({ ...req.query , userId: id });
    res.json(data);
});
router.get('/getAllLead', async (req, res) => {
    const data = await getAllLead2({ ...req.query  });
    res.json(data);
});
router.post("/postImage", postImage);
router.delete("/deleteLead/:id",deleteLeads);
router.post("/editLead/:id" ,editLead );


router.post("/updateLeadStatus/:id" , editLeadStatus);
export default router;
