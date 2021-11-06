import { Income } from '../domain/entities';
import { CreateIncomeUseCase } from '../domain/usecases/createIncome';
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
    async create(value: number, description: string, date: number, paid?: boolean): Promise<ICreateIncomeResponse> {
        if (!value) {
            throw new RequiredFieldError('Value');
        }

        if (!description) {
            throw new RequiredFieldError('Description');
        }

        if (!date) {
            throw new RequiredFieldError('Date');
        }

        let createdIncome = await new CreateIncomeUseCase()
            .execute(value, description, new Date(date), paid);

        return {
            message: 'ok',
            ok: true,
            data: createdIncome
        };
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
