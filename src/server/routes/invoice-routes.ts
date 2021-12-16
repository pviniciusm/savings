import { Request, Response, Router } from 'express';
import { createInvoiceRepository } from '@/server/helpers/repositories-factory';
import { handleExpressRequest } from '@/server/helpers/handle-express-request';
import { InvoiceController } from '@/controller/invoice-controller';
import { CreateInvoiceUseCase } from '@/domain/usecases/create-invoice/create-invoice';

const routes = Router();

// Controller initialization
const controller = new InvoiceController(
    new CreateInvoiceUseCase(createInvoiceRepository()),
);

routes.post('/', (req: Request, res: Response) => handleExpressRequest(res, () => controller.create(req, res)));

export default routes;
