import Clock from "../models/Clock/clock.js"


export const createClock = async(req ,res)=>{
    try{

     const {  clockInDetail , clockOutDetail , date ,breakTime} = req.body;

      const {userId} = req.params;

      const clockDetails = await Clock.create({Date:date , clockIn:clockInDetail , clockOut:clockOutDetail ,user: userId , breakTime:breakTime});

       console.log('clokde ',clockDetails);

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

        
        const searchDateUTC = new Date(date);
        searchDateUTC.setHours(0, 0, 0, 0); // Reset time to midnight
        const searchDateEndUTC = new Date(searchDateUTC.getTime() + 24 * 60 * 60 * 1000); // Next day's midnight
        
        const clockEntries = await Clock.findOne({
            user: userId,
            Date: { $gte: searchDateUTC, $lt: searchDateEndUTC }
        }).select('clockIn clockOut breakTime');
        
        



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

function getMonthDates(monthNumber) {
    console.log("monthNumber ",monthNumber);
    const today = new Date();
    const year = today.getFullYear();
  
    // Create a new Date object for the desired month (0 for January, 11 for December)
    const monthStart = new Date(year, monthNumber-1, 1);
  
    // Get the last day of the month by setting the date to 0 and letting it roll over
    const monthEnd = new Date(year, monthNumber, 0);
  
    // Format the dates in yy-dd-mm format
    const formattedStart = `${year.toString().slice(-2)}-${monthStart.getDate().toString().padStart(2, '0')}-${(monthNumber + 1).toString().padStart(2, '0')}`;
    const formattedEnd = `${year.toString().slice(-2)}-${monthEnd.getDate().toString().padStart(2, '0')}-${(monthNumber + 1).toString().padStart(2, '0')}`;
  
    return {
      startDate: formattedStart,
      endDate: formattedEnd
    };
  }




export const getAttendanceDetails = async (req, res) => {
    try {
      const { type, month, userId } = req.body;

       if(type === "monthly"){

          if(month){
            let subMonth = month.substring(5, 7); 
            let final ;
            if(subMonth[0] == '0'){
               final = subMonth.slice(1);
               }
               
            const monthData = getMonthDates(final-1); 

            console.log("Start date:", monthData.startDate);  
            console.log("End date:", monthData.endDate); 

            const employdata = await Clock.find({user: userId});

            console.log("ee ",employdata);

            
          }



          else {
            console.log("month not available");

          }

       }

    
    
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        status: false,
        message: "Internal server error",
      });
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