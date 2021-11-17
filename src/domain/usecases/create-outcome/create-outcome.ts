import { InMemoryOutcomeRepository } from '../../../data/in-memory-outcome-repository';
import { Outcome } from '../../entities';
import { InvalidDescriptionError, InvalidValueError } from '../../errors';
import { ICreateOutcomeDTO } from './create-outcome-dto';

export class CreateOutcomeUseCase {
    constructor(private readonly repository: InMemoryOutcomeRepository) {}

    async execute(outcome: ICreateOutcomeDTO): Promise<Outcome> {
        if(outcome.value <= 0) {
            throw new InvalidValueError();
        }

        if (outcome.description.length <= 0 || outcome.description.length > 50) {
            throw new InvalidDescriptionError();
        }

        let newOutcome = new Outcome(outcome.value, outcome.description, outcome.date, outcome.paid);
        this.repository.create(newOutcome);

        return newOutcome;
    }
}
