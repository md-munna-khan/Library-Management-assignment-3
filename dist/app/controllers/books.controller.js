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
exports.booksRoutes = void 0;
const express_1 = __importDefault(require("express"));
const book_models_1 = require("../models/book.models");
exports.booksRoutes = express_1.default.Router();
// book -post
exports.booksRoutes.post("/create-book", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        const book = yield book_models_1.BookModel.create(body);
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            book,
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
// book -get all
exports.booksRoutes.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        let books = [];
        // ================= filtering by genre ===================
        const bookGenre = req.query.genre ? req.query.genre : "";
        console.log(bookGenre);
        if (bookGenre) {
            books = yield book_models_1.BookModel.find({ genre: bookGenre });
        }
        else {
            books = yield book_models_1.BookModel.find();
        }
        // ============================ sorting ========================
        books = yield book_models_1.BookModel.find().sort({ "createdAt": 1 }).limit(1);
        //===================== Limit ====================
        // books= await BookModel.find().limit(1)
        // const book = await BookModel.find(body);
        res.status(201).json({
            success: true,
            message: "Books retrieved successfully",
            books,
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
// book - single id
exports.booksRoutes.get("/:booksId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.booksId;
        const books = yield book_models_1.BookModel.findById(bookId);
        res.status(201).json({
            success: true,
            message: "Book retrieved successfully",
            books,
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
// book - update single  id
exports.booksRoutes.patch("/:booksId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const booksId = req.params.booksId;
        const updateBooks = req.body;
        const books = yield book_models_1.BookModel.findByIdAndUpdate(booksId, updateBooks, {
            new: true
        });
        res.status(201).json({
            success: true,
            message: "Book updated successfully",
            books,
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
// book - delete id
exports.booksRoutes.delete("/:booksId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const booksId = req.params.booksId;
        const books = yield book_models_1.BookModel.findByIdAndDelete({ _id: booksId });
        res.status(201).json({
            success: true,
            message: "Book deleted successfully",
            books,
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
