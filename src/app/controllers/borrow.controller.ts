import express, { Request, Response } from "express";

import { BorrowModel } from "../models/borrow.models";
export const borrowsRoutes = express.Router();

// borrow -post
borrowsRoutes.post("/create-borrow", async (req: Request, res: Response) => {

  try {
      const body = req.body;
    const book = await BorrowModel.create(body);
    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
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
// borrow get
borrowsRoutes.get("/", async (req: Request, res: Response) => {
 
  try {
    const book = await BorrowModel.find().populate("book");
    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
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