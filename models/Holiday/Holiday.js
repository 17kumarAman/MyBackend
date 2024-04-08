import mongoose from 'mongoose';

const mySchema = new mongoose.Schema({
    admin: String,
    holidayName: String,
    startDate: String,
    endDate:String
});

const Holiday = mongoose.model('Holiday', mySchema);

export default Holiday;
