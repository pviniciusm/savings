import { InvalidDescriptionError, InvalidValueError } from '../../errors';
import { ICreateInvoiceDTO } from './create-invoice-dto';
import { InMemoryInvoiceRepository } from '../../../data/in-memory-invoice-repository';
import { CreateInvoiceUseCase } from './create-invoice';

const makeSut = (repo?: InMemoryInvoiceRepository) => {
    const sut = new CreateInvoiceUseCase(repo ?? new InMemoryInvoiceRepository());
    const validInvoice: ICreateInvoiceDTO = {
        date: new Date(),
        value: 10,
        description: 'testing',
        totalInstallments: 1,
    };

    return {
        sut,
        validInvoice
    };
};

describe('Create invoice use case tests', () => {
    test('should throw InvalidValueError if value is smaller than 1', async () => {
        const { sut, validInvoice } = makeSut();
        expect.assertions(1);

        try {
            await sut.execute({...validInvoice, value: 0});
        } catch (err) {
            expect(err).toBeInstanceOf(InvalidValueError);
        }
    });

    test('should throw InvalidDescriptionError if description length is smaller than 5', async () => {
        const { sut, validInvoice } = makeSut();
        expect.assertions(1);

        try {
            await sut.execute({...validInvoice, description: '1234'});
        } catch (err) {
            expect(err).toBeInstanceOf(InvalidDescriptionError);
        }
    });

    test('should throw InvalidDescriptionError if description length is bigger than 50', async () => {
        const { sut, validInvoice } = makeSut();
        expect.assertions(1);

        try {
            await sut.execute({...validInvoice, description: ''.padStart(51, '0')});
        } catch (err) {
            expect(err).toBeInstanceOf(InvalidDescriptionError);
        }
    });

    test('should throw InvalidValueError if totalInstallments is smaller than 1', async () => {
        const { sut, validInvoice } = makeSut();
        expect.assertions(2);

        try {
            await sut.execute({...validInvoice, totalInstallments: 0});
        } catch (err) {
            expect(err).toBeInstanceOf(InvalidValueError);
            expect((err as InvalidValueError).value).toEqual('Total installments');
        }
    });

    test('should return the number of totalInstallments if invoices are successfully created', async () => {
        const { sut, validInvoice } = makeSut();

        const ret = await sut.execute({...validInvoice});
        expect(ret).toBeGreaterThan(0);
        expect(ret).toEqual(validInvoice.totalInstallments);
    });
});
