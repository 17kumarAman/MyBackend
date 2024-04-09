import Clock from "../models/Clock/clock.js"


export const createClock = async(req ,res)=>{
    try{

     const {  clockInDetail , clockOutDetail , date ,breakTime} = req.body;

     console.log("cc ",date);

      const {userId} = req.params;

      const clockDetails = await Clock.create({Date:date , clockIn:clockInDetail , clockOut:clockOutDetail ,user: userId , breakTime:breakTime});

       return res.status(200).json({
        status:true ,
        message:"Succesful created ",
        data: clockDetails
       })

    } catch(error){
        return res.status(500).json({
            status:500 , 
            message:"Internal server error "
        })
    }
}


export const getClockByUserDate = async (req, res) => {
    try {
        const { date } = req.body;
        const { userId } = req.params;

        console.log('date ',date , userId);
        
        const clockEntries = await Clock.findOne({
            user: userId,
            Date: date ,
        }).select('clockIn clockOut breakTime').populate("user");
      

        return res.status(200).json({
            status: true,
            message: "Clock details fetched successfully",
            data: clockEntries
        });

    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Internal server error"
        });
    }
};



export const getAttendanceDetails = async (req, res) => {
  
   const {type ,date , month,userId} = req.body;

    console.log("type ",type ,"date ",date , "month ",month , "USERiD ",userId);


     if(type === "monthly"){

        if(userId){

           console.log('month ',month);
         
           const startDate = new Date(`2024-${month}-01`);
           const formattedStartDate = startDate.toLocaleDateString("en-GB", {
               day: '2-digit',
               month: '2-digit',
               year: '2-digit'
           });
         
          // Get the last day of the month
const lastDay = new Date(2024, month, 0).getDate();

// Construct the endDate using the last day of the month
const endDate = new Date(2024, month - 1, lastDay);

// Format the endDate
const formattedEndDate = endDate.toLocaleDateString("en-GB", {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit'
});
           console.log("start ",formattedStartDate , "end ",formattedEndDate);

           const userAttendance = await Clock.find({
            user: userId,
            Date: { $gte: formattedStartDate, $lte: formattedEndDate }
        }).populate('user'); 

        console.log('user deta ',userAttendance);

        }
       

     }

  };
  

  export const getAllAttendence = async(req ,res)=>{
    try{

         const allAtt = await Clock.find({}).populate("user");

         return res.status(200).json({
            status:200 , 
             data:allAtt
         })

    } catch(error){
        console.log(error);
    }
  }