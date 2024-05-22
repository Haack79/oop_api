import { Application } from "express";
import { orderRoutes } from "./features/order/v1/orderRoutes";

export default (app: Application) => {
    const routes = () => {
        app.use('/orders', orderRoutes);
    }
    routes();
}
// Path: src/server.ts
