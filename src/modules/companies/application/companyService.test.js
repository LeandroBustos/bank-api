const CompanyService = require('./companyService');
const Company = require('../domain/companyModel');

describe('CompanyService', () => {
  let service;
  let fakeRepository;

  beforeEach(() => {
    service = new CompanyService();
    fakeRepository = {
      create: jest.fn(),
      findByAdhesionDateRange: jest.fn(),
      findCompaniesWithTransfersLastMonth: jest.fn(),
    };
    service.companyRepository = fakeRepository;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should create a new company', async () => {
    const payload = { cuit: "20-12345678-9", razon_social: "Test Company" };
    const expectedCompany = new Company({
      cuit: payload.cuit,
      razon_social: payload.razon_social,
      adhesion_date: new Date(),
    });
    fakeRepository.create.mockResolvedValue({ 
      id: "fake-id",
      cuit: expectedCompany.dataValues.cuit,
      razonSocial: expectedCompany.dataValues.razon_social,
      adhesionDate: expectedCompany.dataValues.adhesion_date
    });

    const company = await service.createCompany(payload);

    expect(company).toHaveProperty('id', "fake-id");
    expect(company).toHaveProperty('cuit', payload.cuit);
    expect(company).toHaveProperty('razonSocial', payload.razon_social);
    expect(company.adhesionDate).toBeInstanceOf(Date);
  });

  test('should get companies adhered last month', async () => {
    const fakeCompanies = [
      {
        id: "1",
        cuit: "20-11111111-1",
        razonSocial: "Empresa A",
        adhesionDate: new Date("2025-03-01")
      }
    ];
    fakeRepository.findByAdhesionDateRange.mockResolvedValue(fakeCompanies);

    const result = await service.getCompaniesAdheredLastMonth();
    expect(result).toEqual(fakeCompanies);
  });

  test('should get companies with transfers last month', async () => {
    const fakeCompanies = [
      {
        id: "2",
        cuit: "20-22222222-2",
        razonSocial: "Empresa B",
        adhesionDate: new Date("2025-03-01")
      }
    ];
    fakeRepository.findCompaniesWithTransfersLastMonth.mockResolvedValue(fakeCompanies);

    const result = await service.getCompaniesWithTransfersLastMonth();
    expect(result).toEqual(fakeCompanies);
  });
});
