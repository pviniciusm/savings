import { InMemoryInvoiceRepository } from '@/data/in-memory-invoice-repository';
import { InMemoryOutcomeRepository } from '@/data/in-memory-outcome-repository';
import { InMemoryIncomeRepository } from '../../data/in-memory-income-repository';

export const createIncomeRepository = () => new InMemoryIncomeRepository();
export const createOutcomeRepository = () => new InMemoryOutcomeRepository();
export const createInvoiceRepository = () => new InMemoryInvoiceRepository();
