import { Request, Response } from 'express';
import { RequiredFieldError } from '@/controller/errors/required-field-error';
import { CreateOutcomeUseCase } from '@/domain/usecases/create-outcome/create-outcome';
import { ListOutcomeUseCase } from '@/domain/usecases/list-outcome/list-outcome';

export class OutcomeController {
    constructor(
        private readonly createOutcomeUseCase: CreateOutcomeUseCase,
        private readonly listOutcomeUseCase: ListOutcomeUseCase,
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

    async list(request: Request, response: Response): Promise<Response> {
        const id = request.query.id ? request.query.id as string : undefined;

        const month = request.query.month ? Number(request.query.month) : undefined;
        const year = request.query.year ? Number(request.query.year) : undefined;

        let listedOutcomes = await this.listOutcomeUseCase.execute({ id, year, month });

        return response.status(200).send({
            message: 'ok',
            ok: true,
            data: listedOutcomes
        });
    }
}
