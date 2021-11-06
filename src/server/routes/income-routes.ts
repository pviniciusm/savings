import { Request, Response, Router } from 'express';
import { exception } from '../../controller/errors/exception';
import { RequiredFieldError } from '../../controller/errors/required-field-error';
import { IncomeController } from '../../controller/income';

const routes = Router();
const controller = new IncomeController();

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
        const { value, description, date, paid } = req.body;
        const ret = await controller.create(value, description, date, paid);

        return res.status(201).send(ret);
    } catch (err) {
        if (err instanceof RequiredFieldError) {
            return res.status(400).send(exception(err));
        }
        return res.status(500).send(exception(err));
    }
});

export default routes;
