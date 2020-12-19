import {CheckingAccount} from "../src/domain/CheckingAccount";

describe('transaction with success', ()=>{

    it('should return the correct amount of entries and debits', ()=>{

        const checkingAccount = new CheckingAccount();
        checkingAccount.transaction('A', 'B', 10);
        checkingAccount.transaction('A', 'B', 10);

        const {accountId, totalDebit, totalCredit} = checkingAccount.getTransaction('A');

        expect(accountId).toEqual('A');
        expect(totalCredit).toEqual(0);
        expect(totalDebit).toEqual(20);
    })
});