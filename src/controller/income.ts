import { Request, Response } from 'express';
import { Income } from '../domain/entities';
import { CreateIncomeUseCase } from '../domain/usecases/create-income/create-income';
import { ListIncomeUseCase } from '../domain/usecases/listIncome';
import { RequiredFieldError } from './errors/required-field-error';

interface IResponse<T> {
    message: string,
    ok: boolean,
    data?: T,
    exception?: any
}

interface ICreateIncomeResponse extends IResponse<Income> { }
interface IListIncomeResponse extends IResponse<Array<Income>> { }

export class IncomeController {
    constructor(
        private readonly createIncomeUseCase: CreateIncomeUseCase
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

    async list(id?: string): Promise<IListIncomeResponse> {
        let listedIncomes = await new ListIncomeUseCase()
            .execute(id);

        return {
            message: 'ok',
            ok: true,
            data: listedIncomes
        };
    }
}
