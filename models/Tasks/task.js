import mongoose from "mongoose";

const mySchema = new mongoose.Schema(
  {
    taskName: {
      type: String,
    },
    startDate: {
      type: String,
    },
    dueDate: {
      type: String,
    },
    priority: {
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
    Status:{
      type: String ,
      default:"Not Started"
    },
    description:{
      type:String, 
    }
  
  },
  { timestamps: true }
);

const Clients = mongoose.model("ProjectTasks", mySchema);

export default Clients;
