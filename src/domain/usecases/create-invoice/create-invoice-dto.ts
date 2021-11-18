export interface ICreateInvoiceDTO {
    value: number;
    description: string;
    date: Date;
    totalInstallments: number;   
    paid?: boolean;   
}
