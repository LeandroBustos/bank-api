const express = require('express');
const CompanyService = require('../application/companyService');

const router = express.Router();
const companyService = new CompanyService();

router.get('/adhesions-last-month', async (req, res) => {
  try {
    const companies = await companyService.getCompaniesAdheredLastMonth();
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/transfers-last-month', async (req, res) => {
  try {
    const companies = await companyService.getCompaniesWithTransfersLastMonth();
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { cuit, razon_social } = req.body;
    if (!cuit || !razon_social) {
      return res.status(400).json({ error: "cuit and razon_social are required" });
    }
    const company = await companyService.createCompany({ cuit, razon_social });
    res.status(201).json(company);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
