
import Award from "../models/award/award.js"
import User from "../models/User/User.js"
import { mailSender } from "../utils/SendMail2.js";



export const createAward  = async(req ,res)=>{
    try{

        const {employee, awardType, date,gift, description, rating} = req.body;
        console.log("emp; ",date);

        const userDetail = await User.findOne({fullName:employee});

        
  await mailSender(userDetail.email, `Regarding Award`, `<div>
  <div>awardType: ${awardType}</div>
  <div>date: ${date}</div>
  <div>gift: ${gift}</div>
  <div>description: ${description}</div>
  <div>rating: ${rating}</div>
  </div>`);



        
          const awardDetail = await Award.create({employee , awardType , date , gift , description,rating});

          return res.status(200).json({
            status:true ,
            message:"Successfuly creeated",
            awardDetail
          })


    } catch(error){
        console.log("error ",error);
        return res.status(500).json({
            status:true ,
            message:"Internal server error "
        })
    }
 }

 export const getAllAward = async(req ,res)=>{
    try{

         const allAward = await Award.find({});

          return res.status(200).json({
            status:true ,
        data: allAward
          })
    } catch(error){
        console.log(error);
    }
 }