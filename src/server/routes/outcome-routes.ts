import { Request, Response, Router } from 'express';
import { OutcomeController } from '@/controller/outcome-controller';
import { CreateOutcomeUseCase } from '@/domain/usecases/create-outcome/create-outcome';
import { createOutcomeRepository } from '@/server/helpers/repositories-factory';
import { handleExpressRequest } from '@/server/helpers/handle-express-request';

const routes = Router();

// Controller initialization
const controller = new OutcomeController(
    new CreateOutcomeUseCase(createOutcomeRepository()),
);

routes.post('/', (req: Request, res: Response) => handleExpressRequest(req, res, controller.create));

export default routes;
