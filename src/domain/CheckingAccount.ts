export class CheckingAccount{

    private accounts: any[];

    constructor() {
        this.accounts = [];
        this.accounts.push({
            id:'A',
            balance: 100,
            entries: []
        })
        this.accounts.push({
            id:'B',
            balance: 100,
            entries: []
        })
    }


    transaction(originAccountId: string, destinationAccountId: string, value: number){
        const originAccount = this.accounts.find( (account) => account.id === originAccountId);
        const destinationAccount = this.accounts.find((account) => account.id == destinationAccountId);

        originAccount.entries.push({value: value, type:'DEBIT'});
        originAccount.balance -= value;

        destinationAccount.entries.push({value: value, type:'CREDIT'});
        destinationAccount.balance += value

    }

    getTransaction(accountId: string) {
        const account = this.accounts.find( (account) => account.id === accountId);

        const creditList = account.entries.filter(entry => entry.type === 'CREDIT');
        const debitList = account.entries.filter(entry => entry.type === 'DEBIT');

        let totalCredit = 0;
        let totalDebit = 0;

        if(Object.values(creditList).length !== 0){
             creditList.forEach(entry => totalCredit += entry.value);
        }

        if(Object.values(debitList).length !== 0){
           debitList.forEach(entry => totalDebit += entry.value);
        }

        return {accountId: accountId, totalCredit: totalCredit , totalDebit: totalDebit}
    }
}