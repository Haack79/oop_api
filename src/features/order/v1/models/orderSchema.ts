import mongoose, { Schema } from 'mongoose';
import { IOrder } from "../interfaces/orderInterfaces";

const orderSchema: Schema<IOrder> = new Schema({
    _id: {type: Schema.Types.ObjectId, auto: true},
    product: {type: Schema.Types.ObjectId, ref: 'Product', required: true},
    quantity: {type: Number, default: 1}
});

const Order = mongoose.model<IOrder>('Order', orderSchema);
export default Order;
