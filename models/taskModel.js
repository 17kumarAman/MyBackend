import mongoose, { mongo } from 'mongoose';

const taskModel = new mongoose.Schema({

    Subject:{
        type: String,
    },
    Priority: {
        type: String , 
    },
    Status: {
        type: String,
    },
    DueDate: {
        type: Date,
    },
    RelatedTo: {
        type: String,
    },
    ContactName: {
        type: String,
    },
    Note: {
        type: String,
    },
    LeadId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Lead"
    }, 
    user:{
        type: mongoose.Schema.Types.ObjectId , 
        ref:"User"
    }
 
});

const task = mongoose.model('TaskModel', taskModel);

export default task;
