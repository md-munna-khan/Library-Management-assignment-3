import { model, Schema } from "mongoose";
import { Books } from "../interfaces/book.interface";

const bookSchema = new Schema<Books>({
  title: {
    type: String,
    required: [true, "Book title is required."],
    trim: true,
  },
  author: {
    type: String,
    required: [true, "Author name is required."],
    trim: true,
  },
  genre: {
    type: String,
    enum: {
      values: ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"],
      message: "Genre must be one of: FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY, or FANTASY",
    },
    required: [true, "Genre is required."],
    trim: true,
  },
  isbn: {
    type: String,
    required: [true, "ISBN (International Standard Book Number) is required."],
    trim: true,
    unique: [true, "ISBN must be unique"]
  },
  description: {
    type: String,
    trim: true,
  },
  copies: {
    type: Number,
    required: [true, "Number of copies is required."],
    min: [0, "Number of copies must be a positive number."],
  },
  available: {
    type: Boolean,
    default: true,
  }
},
  {
    versionKey: false,
    timestamps: true,
  }
);

// query middleware
bookSchema.post("findOne", function (doc, next) {
  if (!doc) {
   throw new Error("Book not found");
  }
  next();
});
// query middleware
bookSchema.pre('deleteOne', { document: true, query: false }, function() {
  console.log('Deleting doc!');
});


export const BookModel = model("Book", bookSchema);
