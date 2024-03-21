/* eslint-disable @typescript-eslint/no-unused-vars */
// This code simulates a client for a hypothetical banking service.
// It supports both withdrawals and deposits, and returns a transaction ID.
//
// Tip: You can modify these functions to introduce delays or errors, allowing you to experiment with failures and timeouts.

class Account {
  accountNumber: string;
  accountBalance: number;

  constructor(accountNumber: string, accountBalance: number) {
    this.accountNumber = accountNumber;
    this.accountBalance = accountBalance;
  }
}

class Bank {
  accounts: Account[];

  constructor() {
    this.accounts = [];
  }

  findAccount(accountNumber: string): Account | undefined {
    return this.accounts.find(
      (account) => account.accountNumber == accountNumber
    );
  }

  getAccountBalance(accountNumber: string): number | undefined {
    const account = this.accounts.find(
      (account) => account.accountNumber == accountNumber
    );
    return account ? account.accountBalance : undefined;
  }
}

export class InvalidAccountError extends Error {
  constructor() {
    super('Account number supplied is invalid');
  }
}

export class InsufficientFundsError extends Error {
  constructor() {
    super('Insufficient Funds');
  }
}

// our mock bank
const mockBank = new Bank();
mockBank.accounts = [new Account('85-150', 2000), new Account('43-812', 0)];

// BankingService mocks interaction with a bank API. It supports withdrawals and deposits
export class BankingService {
  // the hostname is to make it more realistic. This code does not actually make any network calls.
  #hostname: string;

  constructor(hostname: string) {
    this.#hostname = hostname;
  }

  generateTransactionID(prefix: string, length: number): string {
    let result = prefix;
    const characters = '0123456789';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  }

  // Withdraw simulates a Withdrawal from a bank.
  // Accepts the sourceAccount (string), amount (number), and a referenceId (string) for idempotent transaction tracking.
  // Returns a transaction id when successful, or throws various errors based on amount and account number.
  async withdraw(
    sourceAccount: string,
    amount: number,
    referenceId: string
  ): Promise<string> {
    const acct = mockBank.findAccount(sourceAccount);
    if (!acct) {
      throw new InvalidAccountError();
    }
    if (amount > acct.accountBalance) {
      throw new InsufficientFundsError();
    }
    return this.generateTransactionID('W', 10);
  }

  // Deposit simulates a deposit into a bank.
  // Accepts the targetAccount (string), amount (number), and a referenceId (string) for idempotent transaction tracking.
  // Returns a transaction id when successful, or throws InvalidAccountError if the account is invalid
  async deposit(
    targetAccount: string,
    amount: number,
    referenceId: string
  ): Promise<string> {
    const acct = mockBank.findAccount(targetAccount);
    if (!acct) {
      throw new InvalidAccountError();
    }
    return this.generateTransactionID('D', 10);
  }

  // depositThatFails simulates an unknown error.
  async depositThatFails(
    targetAccount: string,
    amount: number,
    referenceId: string
  ): Promise<string> {
    throw new Error('This deposit has failed');
  }
}
