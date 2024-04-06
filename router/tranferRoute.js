import { Router } from "express";
import {createTransfer , getTransfer,deleteTransfer,updateTransfer} from "../controller/TranferController.js"

const router = Router();

router.post('/createTransfer',createTransfer);
router.get('/getTransfer',getTransfer);

router.delete("/deleteTransfer/:id",deleteTransfer);
router.put("/updateTransfer/:id",updateTransfer);

export default router;
