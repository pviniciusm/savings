import { Request, Response } from 'express';
import { CreateInvoiceUseCase } from '@/domain/usecases/create-invoice/create-invoice';
import { RequiredFieldError } from '@/controller/errors/required-field-error';

export class InvoiceController {
    constructor(
        private readonly createInvoiceUseCase: CreateInvoiceUseCase,
    ) {}

    async create(request: Request, response: Response): Promise<Response> {

        const { value, description, date, paid, totalInstallments } = request.body;

        if (!value) {
            throw new RequiredFieldError('Value');
        }

        if (!description) {
            throw new RequiredFieldError('Description');
        }

        if (!date) {
            throw new RequiredFieldError('Date');
        }
        
        if (!totalInstallments) {
            throw new RequiredFieldError('Total installments');
        }

        let createdInvoice = await this.createInvoiceUseCase.execute({
                value, 
                description, 
                date: new Date(date), 
                paid,
                totalInstallments
            });

        return response.status(201).send({
            message: 'ok',
            ok: true,
            data: createdInvoice
        });
    }
}
