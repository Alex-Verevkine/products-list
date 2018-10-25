import * as express from 'express';
import { IServer } from '../interfaces';
import ProductRouter from './Product.router';
import * as path from 'path';

export default class Routes {
    /**
     * @param  {IServer} server
     * @returns void
     */
    static init(server: IServer): void {
        const router: express.Router = express.Router();
        router.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, '../../build/index.html'));
        });

        server.app.use('/product', new ProductRouter().router);
        server.app.use('/', router);
    }
}
