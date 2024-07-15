import Clients from "../models/Tasks/Clients.js";
import Projects from "../models/Tasks/Projects.js";

export const CreateClient = async(req ,res)=>{
    try{

        const {Name , Email , City , State , ZipCode , PhoneNumber , Country , Address} = req.body;

   const clientDetail = await Clients.create({Name , Email , City , State , ZipCode , PhoneNumber , Country , Address });

    return res.status(200).json({
        status:true , 
        message:"done success" , 
       data: clientDetail
    })

    } catch(error){
        console.log(error);
        return res.status(500).json({
            status:false , 
            message:"Internal server error "
        })
    }
}

export const EditClient = async(req ,res)=>{
    try{
        const {Name , Email , City , State , ZipCode , PhoneNumber , Country , Address} = req.body;

        const {clientId} =req.params;

        const clientDetail = await Clients.findByIdAndUpdate( clientId, {Name , Email , City , State , ZipCode , PhoneNumber , Country , Address });
     
         return res.status(200).json({
             status:true , 
             message:"done success" , 
            data: clientDetail
         })

    } catch(error){
        console.log(error);
        return res.status(500).json({
            status:false , 
            message:"interla server error "
        })
    }
}

export const getAllClient = async(req ,res)=>{

     const allClient = await Clients.find({});

     return res.status(200).json({
        status:true ,
        message:"Done" , data: allClient
     })

}

export const DisableClient = async (req, res) => {
    try {
      const { clientId } = req.params;
  
      // Find the client by ID
      const client = await Clients.findById(clientId);
      
      if (!client) {
        return res.status(404).json({
          status: false,
          message: 'Client not found'
        });
      }
  
      // Toggle the isDisable field
      const updatedClient = await Clients.findByIdAndUpdate(
        clientId,
        { isDisable: !client.isDisable },
        { new: true }
      );
  
      return res.status(200).json({
        status: true,
        data: updatedClient
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: 'Server error',
        error: error.message
      });
    }
  };
  

  // FOR CLIENTS 
  export const CreateProject = async(req ,res)=>{
     try{

      const {Name , Description , Employee , Status , DueDate , Members} = req.body;

       const projectDetail = await Projects.create({Name , Description ,Employee , Status , DueDate , Members});

        return res.status(200).json({
          status:true , 
          message:"Successfuly done" , 
          projectDetail
        })

     } catch(error){
       console.log(error);
       return res.status(500).json({
        status:false , 
        message:"Internal server error "
       })
     }
  }

  export const EditProject = async(req ,res)=>{
    try{
        const {Name , Description , Employee , Status , DueDate , Members} = req.body;

        const {projectId} =req.params;

        console.log('rid ',projectId);

        const ProjectDetail = await Projects.findByIdAndUpdate( projectId, {Name , Description , Employee , Status , DueDate , Members });
     
         return res.status(200).json({
             status:true , 
             message:"done success" , 
            data: ProjectDetail
         })

    } catch(error){
        console.log(error);
        return res.status(500).json({
            status:false , 
            message:"interla server error "
        })
    }
}

export const getAllProject = async(req ,res)=>{

     const allClient = await Projects.find({}).populate("Members");

     return res.status(200).json({
        status:true ,
        message:"Done" , data: allClient
     })

}

export const DeleteProjects = async(req ,res)=>{
  const {projectId} = req.params;

   const ans = await Projects.findByIdAndDelete(projectId);

    return res.status(200).json({
      status:true , 
      message:"Successfuly data " , 
      data:ans 
      
    })
}