const request = require("../../../mocks/appMock");
const CompanyService = require("./companyService");

describe("Company Routes", () => {
  let createCompanySpy, getAdheredSpy, getTransfersSpy;

  beforeAll(() => {
    createCompanySpy = jest
      .spyOn(CompanyService.prototype, "createCompany")
      .mockResolvedValue({
        _id: "fake-id",
        cuit: "20-12345678-9",
        razonSocial: "Fake Company",
        adhesionDate: new Date("2025-03-01")
      });

    getAdheredSpy = jest
      .spyOn(CompanyService.prototype, "getCompaniesAdheredLastMonth")
      .mockResolvedValue([
        { _id: "1", cuit: "20-11111111-1", razonSocial: "Empresa A", adhesionDate: new Date("2025-03-01") }
      ]);

    getTransfersSpy = jest
      .spyOn(CompanyService.prototype, "getCompaniesWithTransfersLastMonth")
      .mockResolvedValue([
        { _id: "2", cuit: "20-22222222-2", razonSocial: "Empresa B", adhesionDate: new Date("2025-03-01") }
      ]);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test("POST /companies should create a new company", async () => {
    const payload = { cuit: "20-12345678-9", razon_social: "Test Company" };
    const res = await request.post("/companies").send(payload);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("_id", "fake-id");
    expect(res.body).toHaveProperty("cuit", "20-12345678-9");
  });

  test("GET /companies/adhesions-last-month should return companies", async () => {
    const res = await request.get("/companies/adhesions-last-month");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toHaveProperty("razonSocial", "Empresa A");
  });

  test("GET /companies/transfers-last-month should return companies with transfers", async () => {
    const res = await request.get("/companies/transfers-last-month");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toHaveProperty("razonSocial", "Empresa B");
  });
});
