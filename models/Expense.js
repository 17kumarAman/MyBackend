import mongoose from "mongoose";

const mySchema = new mongoose.Schema(
  {
    title: { 
      type: String,
    },
    note: {
      type: String,
    },
    totalAmount: {
      type: String,
    },
    date:{
        type:String , 
    }, 
   
  },
  { timestamps: true }
);

const Clients = mongoose.model("Expense", mySchema);

export default Clients;
