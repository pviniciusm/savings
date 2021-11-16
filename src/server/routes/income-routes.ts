import { Request, Response, Router } from 'express';
import { exception } from '../../controller/errors/exception';
import { RequiredFieldError } from '../../controller/errors/required-field-error';
import { IncomeController } from '../../controller/income';
import { CreateIncomeUseCase } from '../../domain/usecases/create-income/create-income';
import { ListIncomeUseCase } from '../../domain/usecases/list-income/list-income';
import { getRepository } from '../configuration/income-repository';

const routes = Router();

// Repository initialization
const repository = getRepository();

const controller = new IncomeController(
    new CreateIncomeUseCase(repository),
    new ListIncomeUseCase(repository)
);

routes.get('/', async (req: Request, res: Response) => {
    try {
        return await controller.list(req, res);
    } catch (err) {
        return res.status(500).send(exception(err));
    }
});

routes.post('/', async (req: Request, res: Response) => {
    try {
        return await controller.create(req, res);
    } catch (err) {
        if (err instanceof RequiredFieldError) {
            return res.status(400).send(exception(err));
        }
        return res.status(500).send(exception(err));
    }
});

export default routes;
