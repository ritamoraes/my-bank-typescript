import { CheckingAccount } from '../src/domain/checking-account';

describe('transaction with success', () => {
  it('should return the correct amount of entries and debits', () => {
    const checkingAccount = new CheckingAccount();
    checkingAccount.transaction('A', 'B', 10);
    checkingAccount.transaction('A', 'B', 10);

    const {
      accountId,
      totalDebit,
      totalCredit
    } = checkingAccount.transactionSummary('A');

    expect(accountId).toEqual('A');
    expect(totalCredit).toEqual(0);
    expect(totalDebit).toEqual(20);
  });
});
