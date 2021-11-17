import { InMemoryOutcomeRepository } from '../../../data/in-memory-outcome-repository';
import { Outcome } from '../../entities';
import { IOutcomeRepository } from '../../repositories/outcome-repository';
import { IListOutcomeDTO } from './list-outcome-dto';

class RequiredFieldError extends Error {
    constructor(field: string) {
        super(`${field} is required`);
    }
}

class RequiredFieldsError extends Error {
    constructor(fields: string) {
        super(`${fields} are required`);
    }
}

class ListOutcomeUseCase {
    constructor(private repository: IOutcomeRepository) {}

    async execute(outcomeFilter: IListOutcomeDTO): Promise<Array<Outcome>> {
        if(!outcomeFilter.id && !outcomeFilter.month && !outcomeFilter.year) {
            throw new RequiredFieldsError('Outcome ID or month/year');
        }

        throw new Error();
    }
}

const makeSut = (repository?: InMemoryOutcomeRepository) => {
    let repo = (repository && repository.outcomeList.length > 0) 
        ? repository 
        : new InMemoryOutcomeRepository([
            new Outcome(10, 'Testing', new Date(), true),
            new Outcome(100, 'Testing 2', new Date(), true)
        ]);

    const sut = new ListOutcomeUseCase(repo);

    const idOutcome: IListOutcomeDTO = {
        id: repository?.outcomeList[0]?.getId()
    };

    const dateOutcome: IListOutcomeDTO = {
        year: 2021,
        month: 11
    };

    return {
        sut, idOutcome, dateOutcome
    };
};

describe('List outcome use case tests', () => {
    test('should throw RequiredFieldError if no id or yerar/month is provided', async () => {
        const {sut} = makeSut();
        expect.assertions(1);

        try {
            await sut.execute({});
        } catch(err) {
            expect(err).toBeInstanceOf(RequiredFieldsError);
        }
    });
});
