import express, { Router } from 'express';
import { authMiddleware } from '../../../middleware/auth-middleware';
import { OrdersController } from './orderController';

class OrderRoutes {
    public router: Router;
    private ordersController: OrdersController;

    constructor() {
        this.router = express.Router();
        this.ordersController = new OrdersController();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.get('/', authMiddleware.verifyToken, this.ordersController.getAll);
        this.router.post('/', authMiddleware.verifyToken, this.ordersController.create);
        this.router.get('/:orderId', authMiddleware.verifyToken, this.ordersController.getById);
    }
}

export const orderRoutes = new OrderRoutes().router;

