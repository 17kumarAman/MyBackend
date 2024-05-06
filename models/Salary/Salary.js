import mongoose from 'mongoose';
const mySchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "user"
    },
    salary:{
        type:String
    }
});

const Salary = mongoose.model('Salary', mySchema);

export default Salary;
