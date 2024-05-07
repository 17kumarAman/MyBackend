import mongoose from 'mongoose';
const mySchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "user"
    },
    LoanOption:{
        type:String
    },
    title:{
        type:String
    },
    type:String,
    loanAmount:{
        type:String
    },
    
});

const Loan = mongoose.model('Loan', mySchema);

export default Loan;
