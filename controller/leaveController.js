import Leave from "../models/Leave/Leave.js";
import User from "../models/User/User.js";
import { removeUndefined } from "../utils/util.js";
import { mailSender } from "../utils/SendMail2.js";
import EmployeeLeave from "../models/EmployeeLeave/employeeLeave.js"


export const postLeave = async ({ auth, type, from, to, days, reason }) => {
  const newLeave = new Leave({
    user: auth, 
    leaveType: type, 
    from, 
    to, 
    days, 
    reason, 
    status: "", 
    ts: new Date().getTime()
  });


  const saveLeave = await newLeave.save();
  // "pooja@kusheldigi.com"

  await mailSender("pooja@kusheldigi.com" , "Regarding Leave" ,  `<div>
  <div>from: ${auth?.fullName}</div>
  <div>to: ${to}</div>
  <div>days: ${(days) - 1 + 2 }</div>
  <div>reason: ${reason}</div>
  </div>`);


  return { success: true, message: "New leave created" };
};

export const updateLeave = async ({ auth,employeeName ,  id, leaveType, from, to, days, reason, status }) => {
  let updateObj=removeUndefined({
    leaveType, from, to, days, reason
  });

  const updateLeave = await Leave.findByIdAndUpdate(
    id,
    { $set: updateObj },
    { new: true }
  );

  console.log(updateLeave);

   const employe = await User.findOne({fullName: employeeName});

   await mailSender(employe.email ,"update Leave " , `<div>
   <div>from: ${auth?.fullName}</div>
   <div>to: ${to}</div>
   <div>days: ${(days) - 1 + 2}</div>
   <div>reason: ${reason}</div>
  </div>`)
    

  return { success: true, message: "Leave updated" };
};

export const getUserLeaves = async ({ auth }) => {
  const data = await Leave.find({}).populate('user'); // Populate the 'user' field
  return { success: true, data };
};

export const getUserLeaveById = async ({ auth, id }) => {
  if (!auth) {
    return { success: false, message: "Not Authorised" };
  }

  const data = await Leave.findById(id);
  return { success: true, data };
};

export const deleteLeave = async ({ auth, id }) => {
  if (!auth) {
    return { success: false, message: "Not Authorised" };
  }

  const data = await Leave.findByIdAndDelete(id);
  return { success: true, data };
};

export const deleteAllLeaves = async () => {
  const data = await Leave.deleteMany();
  return { success: true, data };
};

export const getTotalLeaveCount = async()=>{
  // const data = await Leave.find({status:"Pending"});

  const data = await Leave.find({
    $or: [
      { status: "Pending" },
      { status: "" },
      { status: { $exists: false } }
    ]
  });

  const totalLeave = data.length;

   return {
    success:true ,
 totalLeave
   }
}

export const rejectLeaveHandler  = async({fullName , id})=>{

  const leaveDetails = await Leave.findById(id);

  leaveDetails.status = "Rejected";

  await leaveDetails.save();

  const userDetail = await User.findOne({fullName: fullName});


  
await mailSender(userDetail?.email ,"Regarding holiday cancel " , `<div>
<div>Your holidays are cancel by admin</div>

</div>`)
 

return {
status: true , 
message:"Successfuly send the email"
}
}

export const acceptLeaveHandler  = async({fullName , days , id , userId , startDate , endDate})=>{

  const leaveDetails = await Leave.findById(id);

    leaveDetails.status = "Accepted";

    await leaveDetails.save();

   const userDetail = await User.findOne({fullName: fullName});

         const subject = `total holiday of ${days} days`;

    await mailSender(userDetail?.email ,"Accept Leave " , `<div>
   <div>total holiday of ${days} days Accepted</div>

  </div>`)
    

  const leaveDetailing = await EmployeeLeave.create({startDate , endDate , user: userId});



    return {
      status: true , 
      message:"Successfuly send the email"
    }


}

// this is employee leave controllers 

export const GetTodayLeave = async(req , res)=>{
  try{

     const today = new Date();
     const year = today.getFullYear();
     const month = String(today.getMonth() + 1).padStart(2, '0'); 
     const day = String(today.getDate()).padStart(2, '0');
     const todayDate = `${year}-${month}-${day}`;

    const employeesOnLeave = await EmployeeLeave.find({
      startDate: { $lte: todayDate },
      endDate: { $gte: todayDate }
    }).populate('user');


    return res.status(200).json({
      status:true , 
      message:"Successfuly fetched" , 
      data : employeesOnLeave
    })

  } catch(error){
    console.log(error);
    return res.status(500).json({
      status:false , 
      message:"INterval server error "
    })
  }
}