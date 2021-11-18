import { IInvoiceRepository } from '@/domain/repositories';
import { InvalidDescriptionError, InvalidValueError } from '@/domain/errors';
import { ICreateInvoiceDTO } from './create-invoice-dto';

export class CreateInvoiceUseCase {
    constructor(private repository: IInvoiceRepository) {}

    async execute(invoice: ICreateInvoiceDTO): Promise<number> {
        if(invoice.value <= 0) {
            throw new InvalidValueError('Value');
        }
        
        if(invoice.description.length < 5 || invoice.description.length > 50) {
            throw new InvalidDescriptionError();
        }

        if(invoice.totalInstallments <= 0) {
            throw new InvalidValueError('Total installments');
        }

        let counter = 0;

        for(let i = 0; i < invoice.totalInstallments; i++) {
            await this.repository.create(invoice);
            counter++;
        }

        return counter;
    }
}
