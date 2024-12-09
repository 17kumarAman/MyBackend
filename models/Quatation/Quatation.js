import mongoose, { mongo } from "mongoose";


const costheadSchema = new mongoose.Schema({
  description: {
    type: String,
  },
  price: {
    type: String,
  },
  total: {
    type: String,
  }
});

const timelineSchema =  new mongoose.Schema({
  description:{
    type: String,
  }
})

const technologySchema =  new mongoose.Schema({
  description:{
    type: String,
  },
  stack:{
    type:String,
  }
})

const mySchema = new mongoose.Schema({
    UserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    leadId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lead'
    },
    introduction:{
      type:String, 
    },
    additional:{
      type:String, 
    },
    // quotationNum:{
    //   type:String ,
    // },
    customerName:{
      type:String , 
    },
    customerReq: {
      type:String , 
    },
    // mobileNum: {
    //   type:String, 
    // },
    quotationDate: {
      type:String, 
    },
    // validUntil:{
    //   type:String , 
    // },
    // customerId:{
    //   type:String, 
    // },
    // companyName: {
    //   type:String , 
    // },
    // companyAddress: {
    //   type:String , 
    // },
    // companyGSTIN:{
    //   type:String , 
    // },
    // companyWebsite:{
    //   type:String , 
    // },
    costhead: [costheadSchema]  ,
    timeline: [timelineSchema] , 
    technology : [technologySchema]

  //   QuatationNo:String,
  //   GstNo:String,
  //   SacCode:String,
  //   PlacedSupply:String,
  //   BillTo:String,
  //   ShipTo:String,
  //   ClientName:String,
  //   Address:String,
  //   Mobile:Number,
  //   Email:String,
  //   ItemDescription:String,
  //   Qty:String,
  //   Price:String,
  //   Amount:String,
  //   BalanceAmount:String,
  //   Note:String,
  //   currency:String,
  //   ts: {
  //     type: String,
  //     default: new Date().getTime()
  // },
  },{timestamps:true});

  const Quatation = mongoose.model("Quatation", mySchema);

  export default Quatation;