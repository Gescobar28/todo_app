import express from 'express';
import morgan from 'morgan';
import routes from './routes/index.js';
import cors from "cors";


export const server = express();

server.use(morgan('dev'));
server.use(express.json());
server.use(cors());
server.use('/', routes);


