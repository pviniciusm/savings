import { Outcome } from '../../entities/outcome';
import { InvalidValueError } from '../../errors';
import {ICreateOutcomeDTO} from './create-outcome-dto';
import {InMemoryOutcomeRepository} from '../../data/in-memory-outcome-repository';

class CreateOutcomeUseCase {
    constructor(private readonly repository: InMemoryOutcomeRepository) {}

    async execute(outcome: ICreateOutcomeDTO): Promise<Outcome> {
        if(outcome.value <= 0) {
            throw new InvalidValueError();
        }

        throw new Error();
    }
}

const makeSut = () => {
    const sut = new CreateOutcomeUseCase(new InMemoryOutcomeRepository());
    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const okOutcome: ICreateOutcomeDTO = {
        value: 20,
        description: 'Purchase at Zaffari',
        date: yesterday,
        paid: false
    };

    return { sut, okOutcome };
};

describe('create outcome use case tests', () => {
    test('should throw InvalidValueError if value is less than 1', async () => {
        const { sut, okOutcome } = makeSut();
        expect.assertions(1);

        try {
            let outcome: ICreateOutcomeDTO = { ...okOutcome, value: 0 };
            await sut.execute(outcome);
        } catch(err) {
            expect(err).toBeInstanceOf(InvalidValueError);
        }
    });
});
