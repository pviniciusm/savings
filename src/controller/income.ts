import { Request, Response } from 'express';
import { Income } from '../domain/entities';
import { CreateIncomeUseCase } from '../domain/usecases/create-income/create-income';
import { ListIncomeUseCase } from '../domain/usecases/list-income/list-income';
import { RequiredFieldError } from './errors/required-field-error';

export class IncomeController {
    constructor(
        private readonly createIncomeUseCase: CreateIncomeUseCase,
        private readonly listIncomeUseCase: ListIncomeUseCase
    ) {}

    async create(request: Request, response: Response): Promise<Response> {

        const { value, description, date, paid } = request.body;

        if (!value) {
            throw new RequiredFieldError('Value');
        }

        if (!description) {
            throw new RequiredFieldError('Description');
        }

        if (!date) {
            throw new RequiredFieldError('Date');
        }

        console.log(date);
        console.log(new Date(date).toLocaleDateString());

        let createdIncome = await this.createIncomeUseCase.execute({
                value, 
                description, 
                date: new Date(date), 
                paid
            });

        return response.status(201).send({
            message: 'ok',
            ok: true,
            data: createdIncome
        });
    }

    async list(request: Request, response: Response): Promise<Response> {
        const id = request.query.id ? request.query.id as string : undefined;

        let listedIncomes = await this.listIncomeUseCase.execute({ id });

        return response.status(200).send({
            message: 'ok',
            ok: true,
            data: listedIncomes
        });
    }
}
