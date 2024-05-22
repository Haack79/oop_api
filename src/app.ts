import express, { Express } from 'express';
import Server from './server';
import './dotenv';

class Application {
    private server: Server
    
    constructor() {
        const app: Express = express();
        this.server = new Server(app);
    }
    public start(): void {
        this.server.start();
    }

}

const application = new Application();
application.start();