import { Request, Response, Router } from 'express';
import { exception } from '../../controller/errors/exception';
import { RequiredFieldError } from '../../controller/errors/required-field-error';
import { IncomeController } from '../../controller/income';
import { InMemoryIncomeRepository } from '../../domain/data/in-memory-income-repository';
import { CreateIncomeUseCase } from '../../domain/usecases/create-income/create-income';

const routes = Router();

// Classes initialization
const inMemoryIncomeRepository = new InMemoryIncomeRepository();
const createIncomeUseCase = new CreateIncomeUseCase(inMemoryIncomeRepository);
const controller = new IncomeController(createIncomeUseCase);

routes.get('/', async (req: Request, res: Response) => {
    try {
        let id = req.query.id ? req.query.id as string : undefined;
        const ret = await controller.list(id);
        return res.status(200).send(ret);
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
