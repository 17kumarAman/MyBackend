// this is final project routes 
import { Router } from "express";
import {CreateProject, EditProject , deleteProject ,createTask ,editTask ,deleteTask ,getAllProjects ,getProjectsByUserId ,getTasksByProjectId ,getUserTasksByProject ,changeProjectStatus,changeTaskStatus ,createTaskTimer ,getTotalTaskTime ,getProjectTaskTimelines ,uploadProjectFile , getProjectFiles ,deleteProjectFile
} from "../controller/ProjectFinal/ProjectApis"


const router = Router();

router.post("/postTask", postTask);
