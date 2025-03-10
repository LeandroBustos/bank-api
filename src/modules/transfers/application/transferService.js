const TransferRepository = require('../infrastructure/transferRepository');

class TransferService {
  constructor() {
    this.transferRepository = new TransferRepository();
  }

  async createTransfer(data) {
    const { amount, company_id, debit_account, credit_account } = data;
    if (!amount || !company_id || !debit_account || !credit_account) {
      throw new Error("Missing required fields");
    }
    return this.transferRepository.create(data);
  }
}

module.exports = TransferService;