import { Router } from "express";
import {ProvidePermission , RemovePermission } from "../controller/Permission.js"

const router = Router();

router.post("/providePermission" , ProvidePermission);
router.post("/removePermission" , RemovePermission);


export default router;
