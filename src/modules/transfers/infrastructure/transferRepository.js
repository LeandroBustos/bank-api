const Transfer = require('../domain/transferModel');

class TransferRepository {
  async create(transferData) {
    const transfer = await Transfer.create({
      amount: transferData.amount,
      company_id: transferData.company_id,
      debit_account: transferData.debit_account,
      credit_account: transferData.credit_account,
      created_at: new Date()
    });
    return {
      id: transfer.id,
      amount: transfer.amount,
      companyId: transfer.company_id,
      debitAccount: transfer.debit_account,
      creditAccount: transfer.credit_account,
      createdAt: transfer.created_at
    };
  }
}

module.exports = TransferRepository;