import mongoose, { Schema, Document } from 'mongoose';

export interface IOrder extends Document {
    _id: mongoose.Types.ObjectId;
    product: mongoose.Types.ObjectId;
    quantity: number;
}