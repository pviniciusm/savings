import { Outcome } from '../entities';

export interface IOutcomeRepository {
    create(outcome: Outcome): Promise<void>;
};
