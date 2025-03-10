const CompanyRepository = require('../infrastructure/companyRepository');

class CompanyService {
  constructor() {
    this.companyRepository = new CompanyRepository();
  }

  async createCompany({ cuit, razon_social }) {
    return this.companyRepository.create({
      cuit,
      razonSocial: razon_social,
      adhesionDate: new Date()
    });
  }

  async getCompaniesAdheredLastMonth() {
    const now = new Date();
    const startDate = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
    const endDate = now;
    return this.companyRepository.findByAdhesionDateRange(startDate, endDate);
  }

  async getCompaniesWithTransfersLastMonth() {
    const now = new Date();
    const startDate = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
    return this.companyRepository.findCompaniesWithTransfersLastMonth(startDate, now);
  }
}

module.exports = CompanyService;