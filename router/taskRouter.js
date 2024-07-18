import { Router } from "express";

import isAuthenticated from "../middleware/auth.js";
import {
  deleteTask,
  getTasks,
  postTask,
  updateTask,

} from "../controller/TaskController.js";
import { CreateClient, EditClient  ,getAllClient , DisableClient , CreateProject , EditProject , getAllProject , DeleteProjects , getProjectByUser , CreateProjectTask , GetAllTask , GetTaskByUser } from "../controller/Clients.js";

const router = Router();

router.post("/postTask", isAuthenticated, postTask);

router.put("/updateTask/:id", isAuthenticated, updateTask);

router.get("/getTasks", isAuthenticated, getTasks);

router.delete("/deleteTask/:id", isAuthenticated, deleteTask);


// for cliient 
router.post("/createClient" , CreateClient);
router.post("/editClient/:clientId" , EditClient);
router.get("/getAllClient" , getAllClient);
router.post("/disableClient/:clientId" , DisableClient);

// for projeccts 

router.post("/createProject" , CreateProject);
router.post("/editProject/:projectId" , EditProject);
router.get("/getAllProject" , getAllProject);
router.delete("/deleteProject/:projectId" , DeleteProjects);
router.get("/getProjectByUser/:userId" , getProjectByUser);


// for project task 
router.post("/createProjectTask" , CreateProjectTask);
router.get("/getAllTask" , GetAllTask);
router.get("/getTaskByUser/:userId" ,GetTaskByUser);



export default router;
