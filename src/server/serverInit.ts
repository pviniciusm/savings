import express from 'express';
import cors from 'cors';
import incomeRoutes from './routes/income-routes';
import outcomeRoutes from './routes/outcome-routes';
import invoiceRoutes from './routes/invoice-routes';

const serverInit = () => {
    const app = express();
    app.use(express.json());
    app.use(cors());

    app.use('/income', incomeRoutes);
    app.use('/outcome', outcomeRoutes);
    app.use('/invoice', invoiceRoutes);

    let port: number | string = process.env.PORT || 8081;
    return new Promise<any>((resolve, reject) => {
        app.listen(port);
        resolve(true);
    });
};

export default serverInit;
