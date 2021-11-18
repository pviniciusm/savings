import { ICreateInvoiceDTO } from '../usecases/create-invoice/create-invoice-dto';

export interface IInvoiceRepository {
    create(invoice: ICreateInvoiceDTO): Promise<void>;
}
