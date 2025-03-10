const TransferService = require('./transferService');
const Transfer = require('../domain/transferModel')

describe('TransferService', () => {
  let service;
  let fakeRepository;

  beforeEach(() => {
     service = new TransferService();
     fakeRepository = {
      create: jest.fn(),
      findByAdhesionDateRange: jest.fn(),
      findCompaniesWithTransfersLastMonth: jest.fn(),
     };
     service.transferRepository = fakeRepository
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should create a new transfer', async () => {
    const input = {
      amount: 200.00,
      company_id: 1,
      debit_account: "ACC-789",
      credit_account: "ACC-101"
    };
    const fakeTransfer = new Transfer({
      id: 20,
      ...input,
      createdAt: new Date("2025-03-15T12:00:00Z")
    });
    const fakeTransferResult = {
      id: fakeTransfer.dataValues.id,
      amount: fakeTransfer.dataValues.amount,
      companyId: fakeTransfer.dataValues.company_id,
      debitAccount: fakeTransfer.dataValues.debit_account,
      creditAccount: fakeTransfer.dataValues.credit_account,
      createdAt: fakeTransfer.dataValues.created_at,
    }
    fakeRepository.create.mockResolvedValue(fakeTransferResult);

    const result = await service.createTransfer(input);
    expect(result).toEqual(fakeTransferResult);
  });

  test('should throw error if required fields are missing', async () => {
    const input = { amount: 100 };
    await expect(service.createTransfer(input)).rejects.toThrow("Missing required fields");
  });
});