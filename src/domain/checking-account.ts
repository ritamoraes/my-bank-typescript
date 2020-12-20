import "reflect-metadata"
import { EntryType } from './interfaces/account';
import { TransactionSummary } from './interfaces/transaction-summary';
import {CheckingAccountService} from "../checking-account-service";
import {inject, injectable} from "inversify";

@injectable()
export class CheckingAccount {
  private service: CheckingAccountService;

  constructor(@inject(CheckingAccountService) service: CheckingAccountService) {
    this.service = service;
  }

  transaction(
    originAccountId: string,
    destinationAccountId: string,
    value: number
  ): void {
    const originAccount = this.service.getAccountById(originAccountId);
    const destinationAccount = this.service.getAccountById(destinationAccountId);

    originAccount.entries.push({ value: value, type: EntryType.DEBIT });
    originAccount.balance -= value;

    destinationAccount.entries.push({ value: value, type: EntryType.CREDIT });
    destinationAccount.balance += value;
  }

  transactionSummary(accountId: string): TransactionSummary {
    const account = this.service.getAccountById(accountId);

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
