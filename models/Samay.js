import mongoose from "mongoose";

const breakSchema = new mongoose.Schema({
    start: String,
    end: String,
}, { _id: false });

const mySchema = new mongoose.Schema({
    date: String,
    checkInTime: String,
    breaks: [breakSchema],
    checkOutTime: String,
    task: String,
    status: {
        type: String
    }
});

const Samay = mongoose.model("Samay", mySchema);
export default Samay
