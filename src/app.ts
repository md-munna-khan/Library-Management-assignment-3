import express, { Application, Request, Response } from "express";
import { booksRoutes } from "./app/controllers/books.controller";
import { borrowsRoutes } from "./app/controllers/borrow.controller";

const app: Application = express();
app.use(express.json())
app.use("/books",booksRoutes)
app.use("/borrow",borrowsRoutes)
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Library Management App");
});
export default app;