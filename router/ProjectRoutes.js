// this is final project routes 
import { Router } from "express";
import {CreateProject, EditProject , deleteProject ,createTask ,editTask ,deleteTask ,getAllProjects ,getProjectsByUserId ,getTasksByProjectId ,getUserTasksByProject ,changeProjectStatus,changeTaskStatus ,createTaskTimer ,getTotalTaskTime ,getProjectTaskTimelines ,uploadProjectFile , getProjectFiles ,deleteProjectFile
} from "../controller/ProjectFinal/ProjectApis.js"


const router = Router();

router.post("/createProject" , CreateProject);
router.get("/getAllProject", getAllProjects);
router.post("/editProject", EditProject);
router.delete("/deleteProject/:id" , deleteProject);
router.get("/getTasksByProjectId/:projectId" , getTasksByProjectId);
router.post("/createTask" , createTask);
router.delete("/deleteTask/:taskId",deleteTask);
router.post("/editTask" , editTask);
router.post("/uploadProjectFile" , uploadProjectFile);
router.post("/getProjectFiles/:projectId" , getProjectFiles);
router.get("/getProjectsByUserId/:userId" , getProjectsByUserId); 
router.get("/getUserTasksByProject/:userId/:projectId" , getUserTasksByProject); 
router.post("/changeTaskStatus" , changeTaskStatus);
router.post("/createTaskTimer" , createTaskTimer);
router.get("/getProjectTaskTimelines/:projectId" , getProjectTaskTimelines);



export default router;