import User from "../models/User/User.js"

export const ProvidePermission = async(req ,res)=>{

    try{

        const {Designation , userId , Service  , SubPermission}  = req.body;

        if (userId) {
            const userDetail = await User.findById(userId);

            if (userDetail) {
                userDetail[Service] = true;

                 if(SubPermission){
                    userDetail[SubPermission] = true;
                 }

                await userDetail.save();
                return res.status(200).json({
                    status: true,
                    message: "Permission granted",
                    user: userDetail
                });
            } else {
                return res.status(404).json({
                    status: false,
                    message: "User not found"
                });
            }
        } else if (Designation) {
            
            const users = await User.updateMany(
                { designation: Designation },
                { $set: { [Service]: true } }
            );

             if(SubPermission){
                const users = await User.updateMany(
                    { designation: Designation },
                    { $set: { [SubPermission]: true } } 
                )
             }

             return res.status(200).json({
                status:true,
                message:"Successfuly provided "
             })
           
               
        } else {
            return res.status(403).json({
                status: false,
                message: "Please provide valid user ID or designation"
            });
        }

    } catch(error){
        console.log("eror ",error);
        res.status(500).json({
            status:false ,
            message:"Internal server error"
        })
    }
}


export const RemovePermission = async(req ,res)=>{

    try{

        const {Designation , userId , Service  , SubPermission}  = req.body;

        if (userId) {
            const userDetail = await User.findById(userId);

            if (userDetail) {
                userDetail[Service] = false;

                 if(SubPermission){
                    userDetail[SubPermission] = false;
                 }

                await userDetail.save();
                return res.status(200).json({
                    status: true,
                    message: "Permission granted",
                    user: userDetail
                });
            } else {
                return res.status(404).json({
                    status: false,
                    message: "User not found"
                });
            }
        } else if (Designation) {
            
            const users = await User.updateMany(
                { designation: Designation },
                { $set: { [Service]: false } }
            );

             if(SubPermission){
                const users = await User.updateMany(
                    { designation: Designation },
                    { $set: { [SubPermission]: false } } 
                )
             }

             return res.status(200).json({
                status:true,
                message:"Successfuly provided "
             })
           
               
        } else {
            return res.status(403).json({
                status: false,
                message: "Please provide valid user ID or designation"
            });
        }

    } catch(error){
        console.log("eror ",error);
        res.status(500).json({
            status:false ,
            message:"Internal server error"
        })
    }
}


export const setupPermissionRemovalByAdmin = async ({service}) =>{
    const {id} = req.params;
    const requestByUser = await User.find({department:id});

    const totalRemovalRequest = requestByUser[service];
    console.log(totalRemovalRequest)

   if (totalRemovalRequest.father === false){
      requestByUser = false;
      console.log(requestByUser);
   }
   else if(totalRemovalRequest.father === true){
    requestByUser = true;
    console.log(requestByUser);
   }

   return(
    {
        data:requestByUser,
        data1:totalRemovalRequest,
        message:"request user is fetch successfully",
        status:true
    }
   )

}

