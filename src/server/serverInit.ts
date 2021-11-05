import express from 'express';

const serverInit = () => {
    const app = express();

    return new Promise<any>((resolve, reject) => {
        app.listen(8081);
        resolve(true);
    });
};

export default serverInit;
