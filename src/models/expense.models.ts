import { ExpenseType } from "@/types";
import mongoose from "mongoose";

const { Schema } = mongoose;

const expenseSchema = new Schema({
    name : {
        type : String,
        required : [true, "The name is required"]
    },
    amount : {
        type : Number,
        required : [true, "the amount is required"]
    },
    date : {
        type : Date,
        default : Date.now()
    },
    type  : {
        type : ExpenseType,
        required : [true, "The type of your transaction is required"]
    }
});

const Expense = mongoose.models.expenses || mongoose.model('expenses', expenseSchema);

export default Expense;