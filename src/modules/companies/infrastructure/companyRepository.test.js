const CompanyRepository = require('./companyRepository');
const Company = require('../domain/companyModel');

jest.mock('../domain/companyModel', () => ({
  create: jest.fn(),
  findAll: jest.fn(),
  hasMany: jest.fn(),
}));

jest.mock('../../transfers/domain/transferModel', () => ({
  belongsTo: jest.fn(),
}));

describe('CompanyRepository', () => {
  let repository;

  beforeEach(() => {
    repository = new CompanyRepository();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a company and return mapped result', async () => {
      const input = {
        cuit: '20-123',
        razonSocial: 'Test Company',
        adhesionDate: new Date('2025-03-01'),
      };

      const createdCompany = {
        dataValues: {
          id: 1,
          cuit: '20-123',
          razon_social: 'Test Company',
          adhesion_date: new Date('2025-03-01'),
        }
      };

      Company.create.mockResolvedValue(createdCompany);

      const result = await repository.create(input);

      expect(result).toEqual({
        id: 1,
        cuit: '20-123',
        razonSocial: 'Test Company',
        adhesionDate: new Date('2025-03-01'),
      });
    });
  });

  describe('findByAdhesionDateRange', () => {
    it('should return companies within the date range', async () => {
      const startDate = new Date('2025-02-01');
      const endDate = new Date('2025-03-01');

      const companiesData = [
        { id: 1, cuit: '20-123', razon_social: 'Test Company', adhesion_date: new Date('2025-02-15') },
      ];

      Company.findAll.mockResolvedValue(companiesData);

      const result = await repository.findByAdhesionDateRange(startDate, endDate);

      expect(result).toEqual(companiesData.map(c => ({
        id: c.id,
        cuit: c.cuit,
        razonSocial: c.razon_social,
        adhesionDate: c.adhesion_date,
      })));
    });
  });

  describe('findCompaniesWithTransfersLastMonth', () => {
    it('should return companies that have transfers in the given date range', async () => {
      const startDate = new Date('2025-02-01');
      const endDate = new Date('2025-03-01');

      const companiesData = [
        { id: 2, cuit: '20-456', razon_social: 'Another Company', adhesion_date: new Date('2025-02-20') },
      ];

      Company.findAll.mockResolvedValue(companiesData);

      const result = await repository.findCompaniesWithTransfersLastMonth(startDate, endDate);

      expect(result).toEqual(companiesData.map(c => ({
        id: c.id,
        cuit: c.cuit,
        razonSocial: c.razon_social,
        adhesionDate: c.adhesion_date,
      })));
    });
  });
});
