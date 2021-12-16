import { Request, Response, Router } from 'express';
import { OutcomeController } from '@/controller/outcome-controller';
import { CreateOutcomeUseCase } from '@/domain/usecases/create-outcome/create-outcome';
import { createOutcomeRepository } from '@/server/helpers/repositories-factory';
import { handleExpressRequest } from '@/server/helpers/handle-express-request';
import { ListOutcomeUseCase } from '@/domain/usecases/list-outcome/list-outcome';

const routes = Router();

const repository = createOutcomeRepository();

// Controller initialization
const controller = new OutcomeController(
    new CreateOutcomeUseCase(repository),
    new ListOutcomeUseCase(repository)
);

routes.post('/', (req: Request, res: Response) => handleExpressRequest(res, () => controller.create(req, res)));
routes.get('/', (req: Request, res: Response) => handleExpressRequest(res, () => controller.list(req, res)));

export default routes;
