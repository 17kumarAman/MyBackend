import Lead from "../models/Lead/Lead.js"
import { asyncHandler } from "../utils/AsyncHandler.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";


export const createLead = async (req, res) => {
    try {


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
            Street,
            City,
            State,
            ZipCode,
            Country,
            DescriptionInfo } = req.body;

        

        const leadDetail = await Lead.create({
            LeadOwner: LeadOwner,
            Company: Company,
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
            Street,
            City,
            State,
            ZipCode,
            Country,
            DescriptionInfo,
            image
        });


        return res.status(200).json({
            status: true,
            message: "Successfuly created ",
            data: leadDetail
        })

    } catch (error) {
        console.log("error ", error);
        return res.status(500).json({
            status: false,
            message: "Internal server error "
        })
    }
}


export const getAllLead = async ({ id, query, page, perPage, userId }) => {

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

    let data;
    if (page && page !== "" && page !== "undefined") {
        data = await User.find({ $and: and }).skip((page - 1) * perPage).limit(perPage);
    }
    else {
        // data = await Lead.find({ $and: and }).populate("LeadOwner")
        data = await Lead.find({ LeadOwner: userId }).populate("LeadOwner");
    }
    return { status: true, data };

}

export const GetAllLeadByAdmin =async(req ,res)=>{
    const  data = await Lead.find({});

     return res.status(200).json({
        status:true , 
        message:"Succeesul" , 
        data
     })
}

export const getAllLead2 = async ({ id, query, page, perPage }) => {

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

    let data;
    if (page && page !== "" && page !== "undefined") {
        data = await User.find({ $and: and }).skip((page - 1) * perPage).limit(perPage);
    }
    else {
        data = await Lead.find({ $and: and }).populate("LeadOwner")
    }
    return { status: true, data };

}

export const getAllLead3 = async ({ userId }) => {
    try {
        const allLead = await Lead.find({ LeadOwner: { $ne: userId } });
        console.log("allelad",allLead);
        return { status: true, allLead };
    } catch (error) {
        console.error('Error fetching leads:', error);
        throw error;
    }
};

export const postImage = async (req, res) => {

    const { image } = req.files;

    const details = await uploadToCloudinary(image.tempFilePath);
    console.log("detail ", details);

    return res.status(200).json({
        status: true,
        data: details?.secure_url
    })

}

export const deleteLeads = async (req, res) => {
    const { id } = req.params;

    const data = await Lead.findByIdAndDelete(id);

    return {
        data: data,
        status: true,
        message: "delete successfully"
    }
}

export const editLead = async (req, res) => {
    try {
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
            Street,
            City,
            State,
            ZipCode,
            Country,
            DescriptionInfo
        } = req.body;

        // Ensure id is passed as a parameter
        const id = req.params.id;

        console.log("id ", id);

        // Update lead details
        const leadDetail = await Lead.findByIdAndUpdate(id, {
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
            Street,
            City,
            State,
            ZipCode,
            Country,
            DescriptionInfo
        }, { new: true });

        console.log("lead ", leadDetail);

        return res.status(200).json({
            status: true,
            message: "Successfully updated",
            data: leadDetail
        });
    } catch (error) {
        console.log("error ", error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message // Sending specific error message to client
        });
    }
};

// ==============apis of lead things===============

export const leadByeveryUser = asyncHandler(async()=>{
    const {name,email} = req.body;
    const leadBy = (await Lead.create({name,email})).populate("firstName");

    return{
        status:true,
        message:"Lead by every user create successfully",
        data:leadBy,
        code:"404"
    }
})

export const leadEditByUser = asyncHandler(async()=>{
    const {name,email} = req.body;

    console.log({name,email});

    const leadBy = await Lead.findByIdAndUpdate({
       name: req.body.name,
       email: req.body.email
    })
    console.log(leadBy);
});


export const editLeadStatus = asyncHandler(async(req ,res)=>{
   try{

    const {LeadStatus} = req.body;

    const {id} = req.params;
     
     const lead = await Lead.findByIdAndUpdate(id, { LeadStatus: LeadStatus }, { new: true });

     res.status(200).json({ message: "Lead status updated successfully", lead });

   } catch(error){
    console.log("error ",error);
    return res.status(500).json({
        status:false ,
        message:"internal server error "
    })
   }

        
})

export const editLeadNote = asyncHandler(async(req ,res)=>{
   try{

    const {Note} = req.body;

    const {id} = req.params;
     
     const lead = await Lead.findByIdAndUpdate(id, { Note: Note ,NoteDate: Date.now() }, { new: true });

     res.status(200).json({ message: "Lead Note updated successfully", lead });

   } catch(error){
    console.log("error ",error);
    return res.status(500).json({
        status:false ,
        message:"internal server error "
    })
   }

        
})


