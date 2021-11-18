import { Request, Response } from 'express';
import { RequiredFieldError } from '@/controller/errors/required-field-error';
import { CreateOutcomeUseCase } from '@/domain/usecases/create-outcome/create-outcome';

export class OutcomeController {
    constructor(
        private readonly createOutcomeUseCase: CreateOutcomeUseCase,
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
            throw new RequiredFieldError('Date');
        }

        let createdOutcome = await this.createOutcomeUseCase.execute({
                value, 
                description, 
                date: new Date(date), 
                paid
            });

        return response.status(201).send({
            message: 'ok',
            ok: true,
            data: createdOutcome
        });
    }
}
