// @@@SNIPSTART hello-world-project-template-ts-activity
import type PaymentDetails from './shared';
import BankingClient from './banking-client';

export async function withdraw(details: PaymentDetails):Promise<string> {
  return new BankingClient("bank1.example.com").withdraw(details.amount, details.sourceAccount);
}

export async function deposit(details: PaymentDetails):Promise<string> {
  // throw new Error;
  return new BankingClient("bank2.example.com").deposit(details.amount, details.targetAccount);
}
// @@@SNIPEND
