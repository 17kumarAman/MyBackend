import mongoose from "mongoose";


const mySchema = new mongoose.Schema({
  content:{
    type:String,
  } , 
  user: {
    type:mongoose.Types.ObjectId,
    ref:"User"
},
  
  },{timestamps:true});

  const OfferLetter = mongoose.model("FreelencerOffer", mySchema);

  export default OfferLetter;