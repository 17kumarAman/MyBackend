import Expense from "../models/Expense.js"

export const CreateExpense = async( req ,res)=>{
    const {title , note , totalAmount , date} = req.body;
     const expenseDetail = await Expense.create({title , note , totalAmount , date});

     return res.status(200).json({
        status:true ,
        expenseDetail
     })
}

export const deleteExpense = async(req ,res)=>{
    const {expenseId} = req.params;
     await Expense.findByIdAndDelete(expenseId);
     return res.status(200).json({
        status:true ,

     })
}

export const getExpense = async(req ,res)=>{
    const expesnes = await Expense.find({});
    return res.status(200).json({
        status:true ,
        expesnes
     })
}