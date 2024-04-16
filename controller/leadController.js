import Lead from "../models/Lead/Lead.js"
import { uploadToCloudinary } from "../utils/cloudinary.js";


export const createLead = async(req ,res)=>{
    try{

        
     const { 
        LeadOwner,
        image,
      Company,
      FirstName,
      LastName,
      Title,
      Email,
      Phone,
      Fax,
      Mobile,
      Website,
      LeadSource,
      NoOfEmployee,
      Industry,
      LeadStatus,
      AnnualRevenue,
      Rating,
      EmailOptOut,
      SkypeID,
      SecondaryEmail,
      Twitter,
       Street ,
       City ,
       State ,
       ZipCode ,
       Country ,
       DescriptionInfo } = req.body;


    
     const leadDetail = await Lead.create({
         LeadOwner:LeadOwner,
        Company:Company,
        FirstName,
        LastName,
        Title,
        Email,
        Phone,
        Fax,
        Mobile,
        Website,
        LeadSource,
        NoOfEmployee,
        Industry,
        LeadStatus,
        AnnualRevenue,
        Rating,
        EmailOptOut,
        SkypeID,
        SecondaryEmail,
        Twitter,
         Street ,
         City ,
         State ,
         ZipCode ,
         Country ,
         DescriptionInfo , 
         image
        });


         return res.status(200).json({
            status:true ,
            message:"Successfuly created ",
            data:leadDetail
         })

    } catch(error){
 console.log("error ",error);
 return res.status(500).json({
    status:false,
    message:"Internal server error "
 })
    } 
}


export const getAllLead = async(req ,res)=>{
    try{

        const allLead = await Lead.find({}).populate("LeadOwner");

        return res.status(200).json({
            status:true,
            data: allLead
        })

    } catch(error){
        console.log("error ",error);
        return res.status(500).json({
           status:false,
           message:"Internal server error "
        })
           
    }
}

export const postImage = async(req ,res)=>{

    const {image}  = req.files;
 
    const details = await uploadToCloudinary(image.tempFilePath);
    console.log("detail ",details);

    return res.status(200).json({
        status:true ,
        data: details?.secure_url
    })

}