import mongoose from 'mongoose';

const mySchema = new mongoose.Schema({
   
    name: {
        type: String
    },
    requiredField: [{
        type: String,
    }],
   
});

const Document = mongoose.model('Document', mySchema);

export default Document;
