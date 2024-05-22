// handle http requests
import { Request, Response } from 'express';
import { OrdersService } from './orderService';
import { ServerError } from '../../../middleware/CustomError';
import Server from '../../../server';

export class OrdersController {
    private ordersService: OrdersService;

    constructor() {
        this.ordersService = new OrdersService();
    }

    public async getAll(req: Request, res: Response): Promise<void> {
        try {
            const orders = await this.ordersService.getAllOrders();
            res.status(200).json({
                count: orders.length,
                orders: orders.map(order => ({
                    _id: order._id,
                    product: order.product,
                    quantity: order.quantity,
                    request: {
                        type: 'GET',
                        url: `http://localhost:3orderId: string, quantity: number, quantity: any}
                }))
            });
        } catch (error) {
            res.status(500).json({
                error: ServerError
            });
        }
    }

    public async create(req: Request, res: Response): Promise<void> {
        try {
            const { productId, quantity } = req.body;
            const order = await this.ordersService.createOrder(productId, quantity);
            res.status(201).json({
                message: 'Order was created',
                orderCreated: {
                    _id: order._id,
                    product: order.product,
                    quantity: order.quantity,
                    request: {
                        type: 'GET',
                        url: `http://localhost:3000/orders/${order._id}`
                    }
                }
            });
        } catch (error) {
            res.status(500).json({
                error: ServerError
            });
        }
    }

    public async getById(req: Request, res: Response): Promise<void> {
        try {
            const orderId = req.params.orderId;
            const order = await this.ordersService.getOrderById(orderId);
            res.status(200).json({
                order: {
                    _id: order._id,
                    product: order.product,
                    quantity: order.quantity
                }
            });
        } catch (error) {
            res.status(500).json({
                error: ServerError
            });
        }
    }
    public async updateById(req: Request, res: Response): Promise<void> {
        try {
            const orderId = req.params.orderId;
            const { productId, quantity } = req.body;
            const order = await this.ordersService.updateOrderById(orderId, productId, quantity);
            res.status(200).json({
                message: 'Order updated',
                orderUpdated: {
                    _id: order._id,
                    product: order.product,
                    quantity: order.quantity
                }
            });
        } catch (error) {
            res.status(500).json({
                error: ServerError
            });
        }
    }

    public async deleteById(req: Request, res: Response): Promise<void> {
        try {
            const orderId = req.params.orderId;
            await this.ordersService.deleteOrderById(orderId);
            res.status(200).json({
                message: 'Order deleted'
            });
        } catch (error) {
            res.status(500).json({
                error: ServerError
            });
        }
    }
}

export const ordersController: OrdersController = new OrdersController();
