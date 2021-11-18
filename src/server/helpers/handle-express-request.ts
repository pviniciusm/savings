import { Request, Response } from 'express';
import { Exception, RequiredFieldError } from '@/controller/errors';

export const handleExpressRequest = async (req: Request, res: Response, method: any) => {
    try {
        return await method();
    } catch (err) {
        if (err instanceof RequiredFieldError) {
            return res.status(400).send(Exception(err));
        }
        return res.status(500).send(Exception(err));
    }
};
