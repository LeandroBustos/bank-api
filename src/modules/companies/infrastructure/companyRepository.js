const Company = require('../domain/companyModel');
const Transfer = require('../../transfers/domain/transferModel');
const { Op } = require('sequelize');

Company.hasMany(Transfer, { foreignKey: 'company_id', as: 'transfers' });
Transfer.belongsTo(Company, { foreignKey: 'company_id', as: 'company' });

class CompanyRepository {
  async create(companyData) {
    const company = await Company.create({
      cuit: companyData.cuit,
      razon_social: companyData.razonSocial,
      adhesion_date: companyData.adhesionDate
    });

    return {
      id: company.dataValues.id,
      cuit: company.dataValues.cuit,
      razonSocial: company.dataValues.razon_social,
      adhesionDate: company.dataValues.adhesion_date
    };
  }

  async findByAdhesionDateRange(startDate, endDate) {
    const companies = await Company.findAll({
      where: {
        adhesion_date: {
          [Op.between]: [startDate, endDate]
        }
      }
    });
    return companies.map(c => ({
      id: c.id,
      cuit: c.cuit,
      razonSocial: c.razon_social,
      adhesionDate: c.adhesion_date
    }));
  }

  async findCompaniesWithTransfersLastMonth(startDate, endDate) {
    const companies = await Company.findAll({
      include: [{
        model: Transfer,
        as: 'transfers',
        where: {
          created_at: {
            [Op.between]: [startDate, endDate]
          }
        },
        required: true
      }]
    });
    return companies.map(c => ({
      id: c.id,
      cuit: c.cuit,
      razonSocial: c.razon_social,
      adhesionDate: c.adhesion_date
    }));
  }
}

module.exports = CompanyRepository;