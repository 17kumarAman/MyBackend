import mongoose from 'mongoose';

const clockSchema = new mongoose.Schema({
    Date: {
        type: String,
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    clockIn: {
        type: String,
    },
    clockOut: {
        type: String,
    } , 
    breakTime:{
        type:String,
    }
});

const Clock = mongoose.model('Clock', clockSchema);

export default Clock;
