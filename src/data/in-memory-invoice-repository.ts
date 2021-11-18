import { Invoice } from '../domain/entities';
import { IInvoiceRepository } from '../domain/repositories';


export class InMemoryInvoiceRepository implements IInvoiceRepository {
    public invoiceList: Array<Invoice>;

    constructor(initialInvoiceList?: Array<Invoice>) {
        if(initialInvoiceList) {
            this.invoiceList = initialInvoiceList;
        } else {
            this.invoiceList = [
                new Invoice(5000, 'Carro', new Date('2021-11-07'), 2, 1, true),
                new Invoice(5000, 'Carro', new Date('2021-11-07'), 2, 2, true),
                new Invoice(200, 'Tenis', new Date('2021-10-10'), 3, 1, true),
                new Invoice(200, 'Tenis', new Date('2021-11-10'), 3, 2, true),
                new Invoice(200, 'Tenis', new Date('2021-12-10'), 3, 3, true),
            ];
        }
    }

    async create(invoice: Invoice): Promise<void> {
        this.invoiceList.push(invoice);
    }
}
