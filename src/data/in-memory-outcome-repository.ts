import { Outcome } from '../domain/entities';
import { IOutcomeRepository } from '../domain/repositories/outcome-repository';
import { IListOutcomeDTO } from '../domain/usecases/list-outcome/list-outcome-dto';

export class InMemoryOutcomeRepository implements IOutcomeRepository {
    public outcomeList: Array<Outcome>;

    constructor(initialOutcomeList?: Array<Outcome>) {
        if(initialOutcomeList) {
            this.outcomeList = initialOutcomeList;
        } else {
            this.outcomeList = [
                new Outcome(5000, 'Salário', new Date('2021-11-07'), true),
                new Outcome(20000, 'Growdev', new Date('2021-11-07'), true),
                new Outcome(100, 'Freela #1', new Date('2021-11-07'), true),
                new Outcome(500, 'Pix do cliente', new Date('2021-11-07'), true),
            ];
        }
    }

    async create(outcome: Outcome): Promise<void> {
        this.outcomeList.push(outcome);
    }

    async list(filter: IListOutcomeDTO): Promise<Array<Outcome>> {
        return this.outcomeList
            .filter(outcome => filter.id ? outcome.getId() === filter.id : true)
            .filter(outcome => filter.month && filter.year 
                    ? outcome.date.getMonth() + 1 === filter.month && outcome.date.getFullYear() === filter.year
                    : true
            );
    }
}
