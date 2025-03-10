const TransferRepository = require('./transferRepository');
const Transfer = require('../domain/transferModel');

jest.mock('../domain/transferModel', () => ({
  create: jest.fn()
}));

describe('TransferRepository', () => {
  let repo;

  beforeEach(() => {
    repo = new TransferRepository();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should create a new transfer', async () => {
    const input = {
      amount: 100.50,
      company_id: 1,
      debit_account: "ACC-123",
      credit_account: "ACC-456"
    };
    const createdTransfer = {
      id: 10,
      amount: input.amount,
      company_id: input.company_id,
      debit_account: input.debit_account,
      credit_account: input.credit_account,
      created_at: new Date("2025-03-15T12:00:00Z")
    };
    Transfer.create.mockResolvedValue(createdTransfer);

    const result = await repo.create(input);

    expect(result).toEqual({
      id: createdTransfer.id,
      amount: createdTransfer.amount,
      companyId: createdTransfer.company_id,
      debitAccount: createdTransfer.debit_account,
      creditAccount: createdTransfer.credit_account,
      createdAt: createdTransfer.created_at
    });
  });
});