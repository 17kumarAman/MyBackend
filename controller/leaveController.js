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

  await mailSender("pooja@kusheldigi.com", "Regarding Leave", `<div>
  <div>from: ${auth?.fullName}</div>
  <div>to: ${to}</div>
  <div>days: ${parseInt(days) + 1}</div>
  <div>reason: ${reason}</div>
  </div>`);


  return { success: true, message: "New leave created" };
};

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export const monthlyLeave = async(req , res)=>{
  const {month} = req.body;
  console.log("month",month);
 if(month){
  const now = new Date();
    const year = now.getFullYear();
    
    // If month is provided, ensure it's a valid number between 1 and 12
    if (month < 1 || month > 12) {
      return res.status(400).json({
        status: false,
        message: "Invalid month value"
      });
    }

    // Calculate the start and end dates for the specified month
    const startOfMonth = new Date(year, month - 1, 1);
    const endOfMonth = new Date(year, month, 0); // Last day of the month

    // Format dates if needed
    const formattedStartOfMonth = formatDate(startOfMonth);
    const formattedEndOfMonth = formatDate(endOfMonth);

    // Fetch leave records within the specified month
    const leaves = await Leave.find({
      from: { $gte: formattedStartOfMonth },
      to: { $lte: formattedEndOfMonth },
      status: 'Accepted'
    }).populate("user");

    console.log('leave',leaves);

    return res.status(200).json({
      status: true,
      data: leaves
    });
 }
 else {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  
  const formattedStartOfMonth = formatDate(startOfMonth);

  const leaves = await Leave.find({
    from: { $gt: formattedStartOfMonth },
    status:'Accepted'
  }).populate("user");
  
  return res.status(200).json({
    status:true ,
    data:leaves
  })
 }

}

export const updateLeave = async ({ auth, employeeName, id, leaveType, from, to, days, reason, status }) => {
  let updateObj = removeUndefined({
    leaveType, from, to, days, reason
  });

  const updateLeave = await Leave.findByIdAndUpdate(
    id,
    { $set: updateObj },
    { new: true }
  );

  console.log(updateLeave);

  const employe = await User.findOne({ fullName: employeeName });

  await mailSender(employe.email, "update Leave ", `<div>
   <div>from: ${auth?.fullName}</div>
   <div>to: ${to}</div>
   <div>days: ${(days) +1}</div>
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

export const getTotalLeaveCount = async () => {
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
    success: true,
    totalLeave
  }
}

export const rejectLeaveHandler = async ({ fullName, id }) => {

  const leaveDetails = await Leave.findById(id);

  leaveDetails.status = "Rejected";

  await leaveDetails.save();

  const userDetail = await User.findOne({ fullName: fullName });



  await mailSender(userDetail?.email, "Regarding holiday cancel ", `<div>
<div>Your holidays are cancel by admin</div>

</div>`)


  return {
    status: true,
    message: "Successfuly send the email"
  }
}

export const acceptLeaveHandler = async ({ fullName, days, id, userId, startDate, endDate }) => {

  const leaveDetails = await Leave.findById(id);

  leaveDetails.status = "Accepted";

  await leaveDetails.save();

  const userDetail = await User.findOne({ fullName: fullName });

  const subject = `total holiday of ${days} days`;

  await mailSender(userDetail?.email, "Accept Leave ", `<div>
   <div>total holiday of ${parseInt(days)+1} days Accepted</div>

  </div>`)


  const leaveDetailing = await EmployeeLeave.create({ startDate, endDate, user: userId });



  return {
    status: true,
    message: "Successfuly send the email"
  }


}

// this is employee leave controllers 

export const GetTodayLeave = async (req, res) => {
  try {

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
      status: true,
      message: "Successfuly fetched",
      data: employeesOnLeave
    })

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: "INterval server error "
    })
  }
}