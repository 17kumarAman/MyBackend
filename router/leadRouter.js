import { Router } from "express";
import {createLead ,getAllLead , postImage,deleteLeads} from "../controller/leadController.js"

const router = Router();

router.post("/createLead",createLead );
// router.get("/getAllLead", getAllLead);
router.get('/getAllLead', async (req, res) => {
    const data = await getAllLead({ ...req.query });
    res.json(data);
});
router.post("/postImage", postImage);
router.delete("/deleteLead/:id",deleteLeads);

export default router;
