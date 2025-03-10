const request = require("../../../mocks/appMock");
const TransferService = require("./transferService");

describe("Transfer Routes", () => {
  let createTransferSpy;

  beforeAll(() => {
    createTransferSpy = jest
      .spyOn(TransferService.prototype, "createTransfer")
      .mockResolvedValue({
        id: 30,
        amount: 150.00,
        companyId: 2,
        debitAccount: "ACC-999",
        creditAccount: "ACC-888",
        createdAt: new Date("2025-03-15T12:00:00Z")
      });
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test("POST /transfers should create a new transfer", async () => {
    const payload = {
      amount: 150.00,
      company_id: 2,
      debit_account: "ACC-999",
      credit_account: "ACC-888"
    };
    const res = await request.post("/transfers").send(payload);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id", 30);
    expect(res.body).toHaveProperty("amount", 150.00);
  });
});
