export enum EntryType {
  CREDIT = 'CREDIT',
  DEBIT = 'DEBIT'
}

export interface Entry {
  value: number;
  type: EntryType;
}

export interface Account {
  id: string;
  balance: number;
  entries: Entry[];
}
