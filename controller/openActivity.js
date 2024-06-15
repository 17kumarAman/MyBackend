import Task from "../models/taskModel.js";
import Meet from "../models/MeetingModel.js"

export const CreateTask = async( req ,res)=>{

     const {  Subject, Priority ,  Status , DueDate ,  RelatedTo ,  ContactName ,  Note  , LeadId , userId} = req.body;

      const taskDetail = await Task.create({Subject , Priority ,Status , DueDate ,  RelatedTo ,  ContactName ,  Note , LeadId , user:userId });

 return res.status(200).json({
    status:true ,
    message:"Successfuly done",
    taskDetail
 })

}

export const EditTask = async( req ,res)=>{

    const {  Subject, Priority ,  Status , DueDate ,  RelatedTo ,  ContactName ,  Note  , LeadId} = req.body;

    const {taskId} =req.params;

    const taskDetail = await Task.findByIdAndUpdate(taskId, {Subject , Priority ,Status , DueDate ,  RelatedTo ,  ContactName ,  Note , LeadId } , {new:true});

return res.status(200).json({
  status:true ,
  message:"Successfuly done",
  taskDetail
})

}

export const DeleteTask = async( req ,res)=>{

    const {taskId} = req.params;

     const taskDetail = await Task.findByIdAndDelete(taskId);

     return res.status(200).json({
        status:true , 
        message:"Successfuly "
     })

}

export const CreateMeet = async( req ,res)=>{

    const {   title , meetDateFrom ,  meetDateTo , Status , meetTimeFrom , meetTimeTo , Host , RelatedTo ,  Participant , Note , userId , LeadId} = req.body;

    const meetDetail = await Meet.create({title , meetDateFrom ,  meetDateTo , Status , meetTimeFrom , meetTimeTo , Host , RelatedTo ,  Participant , Note ,user:userId , LeadId });

return res.status(200).json({
  status:true ,
  message:"Successfuly done",
  meetDetail
})

}

export const EditMeet = async( req ,res)=>{

    const {   title , meetDateFrom ,  meetDateTo , Status , meetTimeFrom , meetTimeTo , Host , RelatedTo ,  Participant , Note , LeadId} = req.body;

    const {meetId} = req.params;

    const meetDetail = await Meet.findByIdAndUpdate(meetId , {title , meetDateFrom ,  meetDateTo , Status , meetTimeFrom , meetTimeTo , Host , RelatedTo ,  Participant , Note , LeadId } , {new:true});

return res.status(200).json({
  status:true ,
  message:"Successfuly done",
  meetDetail
})


}

export const DeleteMeet = async( req ,res)=>{
    const {meetId} = req.params;

    const meetDetail = await Meet.findByIdAndDelete(meetId);

    return res.status(200).json({
       status:true , 
       message:"Successfuly "
    })
}

export const GetTaskByUser = async(req ,res)=>{
     const {userId} = req.params;

     const allTask = await Task.find({user:userId}).populate("user");

     return res.status(200).json({
        status:true ,
        allTask
     })
}

export const  GetMeetByUser = async(req ,res)=>{
    const {userId} = req.params;

    const allMeet = await Meet.find({user:userId}).populate("user");

    return res.status(200).json({
       status:true ,
       allMeet
    })
}