import express from 'express';
import incomeRoutes from './routes/income-routes';

const serverInit = () => {
    const app = express();
    app.use(express.json());

    app.use('/income', incomeRoutes);

    return new Promise<any>((resolve, reject) => {
        app.listen(8081);
        resolve(true);
    });
};

export default serverInit;
