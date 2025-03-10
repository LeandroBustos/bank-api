const express = require('express');
const TransferService = require('./transferService');

const router = express.Router();
const transferService = new TransferService();

router.post('/', async (req, res) => {
  try {
    const { amount, company_id, debit_account, credit_account } = req.body;
    if (!amount || !company_id || !debit_account || !credit_account) {
      return res.status(400).json({ error: "amount, company_id, debit_account and credit_account are required" });
    }
    const transfer = await transferService.createTransfer({
      amount,
      company_id,
      debit_account,
      credit_account,
    });
    res.status(201).json(transfer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;