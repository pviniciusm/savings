import { Outcome } from '@/domain/entities';
import { InvalidValueError, RequiredFieldsError } from '@/domain/errors';
import { IOutcomeRepository } from '@/domain/repositories';
import { IListOutcomeDTO } from './list-outcome-dto';

export class ListOutcomeUseCase {
    constructor(private repository: IOutcomeRepository) {}

    async execute(outcomeFilter: IListOutcomeDTO): Promise<Array<Outcome>> {
        if(!outcomeFilter.id && !outcomeFilter.month && !outcomeFilter.year) {
            throw new RequiredFieldsError('Outcome ID or month/year');
        }

        if(outcomeFilter.month !== undefined && outcomeFilter.month <= 0) {
            throw new InvalidValueError('Month');
        }

        if(outcomeFilter.year !== undefined && outcomeFilter.year <= 0) {
            throw new InvalidValueError('Year');
        }

        return this.repository.list(outcomeFilter);
    }
}
