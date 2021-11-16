import { InMemoryIncomeRepository } from '../../domain/data/in-memory-income-repository';

export const getRepository = () => new InMemoryIncomeRepository();
