import express, { Application } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'
import './dotenv'
import helmet from 'helmet'
import appRoutes from './routes'
import compression from 'compression'
import hpp from 'hpp'
import { errorHandler } from './middleware/errorMiddleware'

const shouldCompress = (req: express.Request, res: express.Response): boolean => {
    const contentType = res.getHeader('Content-Type');
    if (typeof contentType === 'string') {
      // List of content types to compress
      const compressibleTypes = [
        'text/html',
        'text/css',
        'application/javascript',
        'application/json',
        'application/xml',
        'text/plain'
      ];
      return compressibleTypes.some(type => contentType.includes(type));
    }
    return false;
  };
  
class Server {
    private app: Application

    constructor(app: Application) {
        this.app = express()
        this.setupMiddleware()
        this.setupErrorHandling()
        this.appRoutesMiddleware(app)
    }
    public start(): void {
        this.startHttpServer()
    }

    private appRoutesMiddleware(app: Application): void {
        this.app.use(appRoutes)
    }

    private setupMiddleware(): void {
        this.app.use(bodyParser.urlencoded({ extended: false }))
        this.app.use(bodyParser.json())
        this.app.use(cors())
        this.app.use(morgan('dev'))
        this.app.use(helmet())
        this.app.use(compression({
            threshold: 1024,
            filter: shouldCompress
        }))
        this.app.use(hpp())
        // cors headers milddleware
        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*'); // * means any client can access, could add specific domain instead
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
            if (req.method === 'OPTIONS') { // browser will always send an options request first to see if it's allowed to send the actual request
                res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
                return res.status(200).json({});
            }
            next();
        });
    }

    private setupErrorHandling(): void {
        this.app.use(errorHandler)
    }
    private startHttpServer(): void {
        const port = process.env.PORT || 3000
        this.app.listen(port, () => console.log(`Server running on port at http://localhost:${port}`))
    }

    public getApp(): Application {
        return this.app
    }

}

export default Server;

// // get http to create http server
// const http = require('http');
// // get the app for the server with approutes 
// const app = require('./app');
// // get the port from the env or use 3000
// const port = process.env.PORT || 3000;
// // create the server with the app
// const server = http.createServer(app);
// // start the server
// server.listen(port, () => console.log(`Server running on port at http://localhost:${port}`))