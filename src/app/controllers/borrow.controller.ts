import express, { Request, Response } from "express";

import { BorrowModel } from "../models/borrow.models";
export const borrowsRoutes = express.Router();

// borrow -post
borrowsRoutes.post("/create-borrow", async (req: Request, res: Response) => {
  try {
    //   const body = req.body;
    // const book = await BorrowModel.create(body);
    const { book, quantity, dueDate } = req.body;

    const borrow = await BorrowModel.Borrow(book, quantity, new Date(dueDate));
    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      borrow,
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
// borrow get
borrowsRoutes.get("/", async (req: Request, res: Response) => {
  try {
    const data = await BorrowModel.aggregate([
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "bookDetails",
        },
      },
      { $unwind: "$bookDetails" },
      {
        $project: {
          _id: 0,
         
          book: {
            title: "$bookDetails.title",
            isbn: "$bookDetails.isbn"
          },
           totalQuantity: 1
        },
      },
    ]);

    res.status(200).json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch borrow summary",
      error: error.message,
    });
  }
});

