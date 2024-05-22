import express, { Express } from 'express';
import Server from './server';
import './dotenv';

const app: Express = express();
const server = new Server(app);

server.start();

// const express = require('express');
// // set up app to use express to handle routes, middleware and other aspects of webserver. 
// const app = express();
// // body parser to parse incoming requests, does not handle multipart forms or file uploads or binary data
// // but is enough for most use cases
// const bodyParser = require('body-parser');
// // get the routes for the app

// // connect whichever database you want to use

// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json());

// // set up cors to allow cross origin requests
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
//     if(req.method === 'OPTIONS') {
//         res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
//         return res.status(200).json({});
//     }
//     next();
// });

// // set up routes for the app


// // handle missed requests to 404
// app.use((req, res, next) => {
//     const error = new Error('Page not found');
//     error.status = 404;
//     next(error);
// })
// // handle errors in the app
// app.use((error, req, res, next) => {
//     res.status(error.status || 500);
//     res.json({
//         message: error.message
//     })
// })