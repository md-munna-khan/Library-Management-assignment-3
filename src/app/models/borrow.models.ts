import mongoose, { model, Schema } from "mongoose";
import { Borrow } from "../interfaces/borrow.interface";


const borrowSchema = new Schema<Borrow>({
  book:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Book",
    required:true
  },
  quantity:{
    type:Number,
    required:true,
    validate:{
        validator:Number.isInteger,
        message:'Quantity must be an integer.'
    },
    min: [1, 'Quantity must be at least 1.']
  },
  dueDate:{
    type:Date,
    required:true
  }
},
{
  versionKey:false,
  timestamps:true
});
// creating a custom Static method
// borrowSchema.static("bookQuantity",async function {
  
// })
export const BorrowModel=model("Borrow",borrowSchema)