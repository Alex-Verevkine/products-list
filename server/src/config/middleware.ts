import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as helmet from 'helmet';
import * as path from 'path';
import * as express from 'express';
import { IServer } from '../interfaces';

export default class Middleware {
    static init(server: IServer): void {

        // express middleware
        server.app.use(bodyParser.urlencoded({ extended: false }));
        server.app.use(bodyParser.json());
        server.app.use(cookieParser());
        server.app.use(compression());
        server.app.use(helmet.referrerPolicy({
            policy: 'same-origin',
        }));
        server.app.use(helmet());
        server.app.use(cors());
        //Point static path to build
        server.app.use(express.static(path.join(__dirname, '../../build')));


        // cors
        server.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS ');
            next();
        });
    }

    static initServerErrorHandler(server: IServer) {
        server.app.use((err, req, res, next) => {
            console.error("\x1b[41m", err.stack, "\x1b[0m")
            res.status(500).send(err.message)
        })
    }
}
