// ordersService.ts
import Order from './models/orderSchema';
import mongoose from 'mongoose';
import { IOrder } from './interfaces/orderInterfaces';

export class OrdersService {
    public async getAllOrders(): Promise<IOrder[]> {
        const orders = await Order.find().exec();
        return orders;
    }

    public async createOrder(productId: string, quantity: number): Promise<IOrder> {
        const order = new Order({
            _id: new mongoose.Types.ObjectId(),
            product: productId,
            quantity: quantity
        });
        return await order.save();
    }

    public async getOrderById(orderId: string): Promise<IOrder> {
        const order = await Order.findById(orderId).exec();
        if (order) {
            return order;
        } else {
            throw new Error('Order not found');
        }
    }

    public async updateOrderById(orderId: string, quantity: number): Promise<IOrder> {
        const order = await Order
            .findByIdAndUpdate(orderId,{$set: {quantity: quantity}}, {new: true})
            .exec();
            if (order) {
                return order;
            } else {
                throw new Error('Order not found');
            }
    }

    public async deleteOrderById(orderId: string): Promise<void> {
        await Order.deleteOne({_id: orderId }).exec();
    }
}
