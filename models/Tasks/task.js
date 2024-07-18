import mongoose from "mongoose";

const mySchema = new mongoose.Schema(
  {
    Title: {
      type: String,
    },
    Description: {
      type: String,
    },
    StartDate: {
      type: String,
    },
    DueDate: {
      type: String,
    },
    Priority: {
      type: String,
      default:"Normal" , 
    },
    Members:{
        type: mongoose.Schema.Types.ObjectId , 
          ref:"User"
    }, 
     Project:{
        type: mongoose.Schema.Types.ObjectId , 
          ref:"Projects"
    },  

  },
  { timestamps: true }
);

const Clients = mongoose.model("ProjectTasks", mySchema);

export default Clients;
