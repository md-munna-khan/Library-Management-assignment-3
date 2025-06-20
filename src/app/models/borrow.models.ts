import mongoose, { model, Schema } from "mongoose";
import { Borrow, borrowStaticMethod } from "../interfaces/borrow.interface";
import { BookModel } from "./book.models";


const borrowSchema = new Schema<Borrow,borrowStaticMethod>({
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

//  Static Method: borrowBook
borrowSchema.statics.Borrow = async function (
  bookId: string,
  quantity: number,
  dueDate: Date
): Promise<Borrow> {
  const book = await BookModel.findById(bookId);
  if (!book) throw new Error("Book not found");

  if (book.copies < quantity) {
    throw new Error("Not enough copies available");
  }

  // Update book
  book.copies = quantity;
  if (book.copies === 0) {
    book.available = false;
  }

  await book.save();

  // Create and return borrow record
  const borrowRecord = await this.create({
    book: book._id,
    quantity,
    dueDate,
  });

  return borrowRecord;
};

export const BorrowModel = model<Borrow, borrowStaticMethod>("Borrow", borrowSchema);