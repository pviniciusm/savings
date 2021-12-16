import { Request, Response } from 'express';
import { Exception, RequiredFieldError } from '@/controller/errors';
import { DomainError } from '@/domain/errors/domain-error';
import { ControllerError } from '@/controller/errors/controller-error';

export const handleExpressRequest = async (
    res: Response,
    method: () => Promise<any>
) => {
    try {
        return await method();
    } catch (err) {
        if (err instanceof DomainError) {
            return res.status(400).send(Exception(err));
        }

        if (err instanceof ControllerError) {
            return res.status(401).send(Exception(err));
        }

        return res.status(500).send(Exception(err));
    }
};
