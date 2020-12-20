import { Account, EntryType } from './interfaces/account';
import { TransactionSummary } from './interfaces/transaction-summary';

export class CheckingAccount {
  private accounts: Account[] = [
    {
      id: 'A',
      balance: 100,
      entries: []
    },
    {
      id: 'B',
      balance: 100,
      entries: []
    }
  ];

  constructor() {}

  transaction(
    originAccountId: string,
    destinationAccountId: string,
    value: number
  ): void {
    const originAccount = this.accounts.find(
      (account) => account.id === originAccountId
    );
    const destinationAccount = this.accounts.find(
      (account) => account.id == destinationAccountId
    );

    originAccount.entries.push({ value: value, type: EntryType.DEBIT });
    originAccount.balance -= value;

    destinationAccount.entries.push({ value: value, type: EntryType.CREDIT });
    destinationAccount.balance += value;
  }

  transactionSummary(accountId: string): TransactionSummary {
    const account = this.accounts.find((account) => account.id === accountId);

    const creditList = account.entries.filter(
      (entry) => entry.type === EntryType.CREDIT
    );
    const debitList = account.entries.filter(
      (entry) => entry.type === EntryType.DEBIT
    );

    let totalCredit = 0;
    let totalDebit = 0;

    if (Object.values(creditList).length !== 0) {
      creditList.forEach((entry) => (totalCredit += entry.value));
    }

    if (Object.values(debitList).length !== 0) {
      debitList.forEach((entry) => (totalDebit += entry.value));
    }

    return {
      accountId: accountId,
      totalCredit: totalCredit,
      totalDebit: totalDebit
    };
  }
}
