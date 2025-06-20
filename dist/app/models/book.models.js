"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookModel = void 0;
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
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
}, {
    versionKey: false,
    timestamps: true
});
exports.BookModel = (0, mongoose_1.model)("Book", bookSchema);
