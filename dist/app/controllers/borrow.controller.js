"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const borrow_models_1 = require("../models/borrow.models");
exports.borrowsRoutes = express_1.default.Router();
// borrow -post
exports.borrowsRoutes.post("/create-borrow", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //   const body = req.body;
        // const book = await BorrowModel.create(body);
        const { book, quantity, dueDate } = req.body;
        const data = yield borrow_models_1.BorrowModel.Borrow(book, quantity, new Date(dueDate));
        res.status(201).json({
            success: true,
            message: "Book borrowed successfully",
            data
        });
    }
    catch (error) {
        res.status(400).json({
            message: "Validation failed",
            success: false,
            error: error.name === "ValidationError"
                ? { name: error.name, errors: error.errors }
                : error,
        });
    }
}));
// borrow get
exports.borrowsRoutes.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield borrow_models_1.BorrowModel.aggregate([
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
                }
            }
        ]);
        res.status(200).json({
            success: true,
            message: "Borrowed books summary retrieved successfully",
            data,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch borrow summary",
            error: error.message,
        });
    }
}));
