import { Outcome } from '../entities';
import { IOutcomeRepository } from '../repositories/outcome-repository';

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

    async list(id?: string): Promise<Array<Outcome>> {
        return id ? this.outcomeList.filter(outcome => outcome.getId() == id) : [...this.outcomeList];
    }
}
