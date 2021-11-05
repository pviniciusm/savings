import { Outcome } from './outcome';

class Invoice extends Outcome {
    constructor(
        value: number,
        description: string,
        date: Date,
        public installment: number,
        public totalInstallments: number,
        paid?: boolean
    ) {
        super(value, description, date, paid);
    }
}

export { Invoice };
