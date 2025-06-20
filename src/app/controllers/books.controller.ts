import express, { Request, Response } from "express";
import { BookModel } from "../models/book.models";
export const booksRoutes = express.Router();

// book -post
booksRoutes.post("/create-book", async (req: Request, res: Response) => {
  const body = req.body;
  try {
    const book = await BookModel.create(body);
    res.status(201).json({
      success: true,
      message: "Book created successfully",
      book,
    });
  } catch (error: any) {
    res.status(400).json({
      message: "Validation failed",
      success: false,
      error:
        error.name === "ValidationError"
          ? { name: error.name, errors: error.errors }
          : error,
    });
  }
});
// book -get all
booksRoutes.get("/", async (req: Request, res: Response) => {
  try {
    const body = req.body;
    let books=[]
    // ================= filtering by genre ===================
    const bookGenre = req.query.genre ? req.query.genre : "";
    console.log(bookGenre);
    if(bookGenre){
      books= await BookModel.find({genre:bookGenre})
    }else{
      books= await BookModel.find()
    }
    // ============================ sorting ========================
    books = await BookModel.find().sort({"createdAt":1}).limit(10)
    //===================== Limit ====================
    // books= await BookModel.find().limit(1)
    // const book = await BookModel.find(body);
    res.status(201).json({
      success: true,
      message: "Books retrieved successfully",
      books,
    });
  } catch (error: any) {
    res.status(400).json({
      message: "Validation failed",
      success: false,
      error:
        error.name === "ValidationError"
          ? { name: error.name, errors: error.errors }
          : error,
    });
  }
});
// book - single id
booksRoutes.get("/:booksId", async (req: Request, res: Response) => {
  try {
   const bookId = req.params.booksId;
   const books = await BookModel.findById(bookId)
    
    res.status(201).json({
      success: true,
      message: "Book retrieved successfully",
      books,
    });
  } catch (error: any) {
    res.status(400).json({
      message: "Validation failed",
      success: false,
      error:
        error.name === "ValidationError"
          ? { name: error.name, errors: error.errors }
          : error,
    });
  }
});
// book - update single  id
booksRoutes.patch("/:booksId", async (req: Request, res: Response) => {
  try {
   const booksId = req.params.booksId;
   const updateBooks=req.body;
   const books = await BookModel.findByIdAndUpdate(booksId,updateBooks,{
    new:true
   });
   
    
    res.status(201).json({
      success: true,
      message: "Book updated successfully",
      books,
    });
  } catch (error: any) {
    res.status(400).json({
      message: "Validation failed",
      success: false,
      error:
        error.name === "ValidationError"
          ? { name: error.name, errors: error.errors }
          : error,
    });
  }
});
// book - delete id
booksRoutes.delete("/:booksId", async (req: Request, res: Response) => {
  try {
   const booksId = req.params.booksId;
   
   const books = await BookModel.findByIdAndDelete({_id:booksId})
   
    
    res.status(201).json({
      success: true,
      message: "Book deleted successfully",
      books,
    });
  } catch (error: any) {
    res.status(400).json({
      message: "Validation failed",
      success: false,
      error:
        error.name === "ValidationError"
          ? { name: error.name, errors: error.errors }
          : error,
    });
  }
});
