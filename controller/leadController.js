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


export const getAllLead = async({id,query, page, perPage})=>{
    let and = [];
    if (id && id !== "" && id !== "undefined") {
        and.push({ _id: id });
    }
    if (query && query !== "" && query !== "undefined") {
        console.log(query);
        and.push({ name: { $regex: query, $options: "i" } });
    }
    if (and.length === 0) {
        and.push({});
    }

    // const count = await User.count({ $and: and });

    let data;
    if (page && page !== "" && page !== "undefined") {
        data = await User.find({ $and: and }).skip((page - 1) * perPage).limit(perPage);
    }
    else {
        data = await Lead.find({ $and: and }).populate("LeadOwner")
    }
    return { status: true, data };

        // const allLead = await Lead.find({}).populate("LeadOwner");  
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

export const deleteLeads = async (req, res) => {
    const { id } = req.params;
  
    const data = await Lead.findByIdAndDelete(id);

    return{
      data:data,
      status:true,
      message:"delete successfully"
    }
  }
