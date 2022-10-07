// @@@SNIPSTART hello-world-project-template-ts-withdraw-activity
import type {PaymentDetails} from './shared';
import BankingClient from './banking-client';

export async function withdraw(details: PaymentDetails):Promise<string> {
  console.log(`Withdrawing ${details.amount} from account ${details.sourceAccount}.\n\n`)
  return new BankingClient("bank1.example.com").withdraw(details.amount, details.sourceAccount);
}
// @@@SNIPEND

// @@@SNIPSTART hello-world-project-template-ts-deposit-activity
export async function deposit(details: PaymentDetails):Promise<string> {
  console.log(`Depositing ${details.amount} into account ${details.targetAccount}.\n\n`)
  // throw new Error;
  return new BankingClient("bank2.example.com").deposit(details.amount, details.targetAccount);
}
// @@@SNIPEND
