import { CheckingAccount } from '../src/domain/checking-account';
import {Container} from "inversify";
import {CheckingAccountService} from "../src/checking-account-service";

describe('transaction with success', () => {

  let checkingAccountMain: CheckingAccount;

  beforeEach(()=>{
    const container = new Container();
    container.bind<CheckingAccountService>(CheckingAccountService).to(CheckingAccountService);
    checkingAccountMain = container.resolve(CheckingAccount);

  })

  it('should return the correct amount of entries and debits', () => {

    checkingAccountMain.transaction('A', 'B', 10);
    checkingAccountMain.transaction('A', 'B', 10);

    const {
      accountId,
      totalDebit,
      totalCredit
    } = checkingAccountMain.transactionSummary('A');

    expect(accountId).toEqual('A');
    expect(totalCredit).toEqual(0);
    expect(totalDebit).toEqual(20);
  });
});
