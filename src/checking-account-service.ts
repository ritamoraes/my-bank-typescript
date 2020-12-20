import "reflect-metadata"
import {injectable} from "inversify";
import {Account} from "./domain/interfaces/account";

@injectable()
export class CheckingAccountService {

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

    getAccountById(accountId: string): Account {
        return this.accounts.find(
            (account) => account.id === accountId
        );
    }

}