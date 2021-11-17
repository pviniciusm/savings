import { InMemoryIncomeRepository } from '../../data/in-memory-income-repository';

export const getRepository = () => new InMemoryIncomeRepository();
