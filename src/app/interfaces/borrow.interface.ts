import {  Model, Types } from "mongoose";

export interface Borrow{
  book:Types.ObjectId;
  quantity:number;
  dueDate:Date;
} 

export interface BookStaticMethods extends Model<Borrow>{
  bookQuantity(quantity:number):number
}
