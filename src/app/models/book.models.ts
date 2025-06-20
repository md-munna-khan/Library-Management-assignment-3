import { model, Schema } from "mongoose";
import { Books } from "../interfaces/book.interface";

const bookSchema = new Schema<Books>({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: String,
    required: true,
    trim: true,
  },
  genre: {
    type: String,
    enum: [
      "FICTION",
      " NON_FICTION",
      "SCIENCE",
      "HISTORY",
      "BIOGRAPHY",
      "FANTASY",
    ],
    required: true,
    trim: true,
  },
  isbn: {
    type: String,
    required: true,
    trim: true,
    unique: [true, " The book’s International Standard Book Number"],
  },
  description: {
    type: String,

    trim: true,
  },
  copies: {
    type: Number,
    min: [0, "Copies cannot be negative"],
    validate: {
      validator: Number.isInteger,
      message: "Copies must be an integer",
    },
  },
  available: {
    type: Boolean,
    default: true,
  },
  
},
{
    versionKey:false,
    timestamps:true
});



export const BookModel = model("Book", bookSchema);
