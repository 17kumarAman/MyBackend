import mongoose from "mongoose";

const mySchema = new mongoose.Schema(
  {
    clockIn: {
      type: String,
    },
    clockOut: {
      type: String,
    },
    taskId:{
        type: mongoose.Schema.Types.ObjectId , 
          ref:"ProjectTasks"
    }, 
    date:{
        type:Date,
        default: Date.now()
    }
  
  },
  { timestamps: true }
);

const TaskTimer = mongoose.model("TaskTimer", mySchema);

export default TaskTimer;
