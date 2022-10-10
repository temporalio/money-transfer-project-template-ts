// @@@SNIPSTART hello-world-project-template-ts-withdraw-activity
import type { PaymentDetails } from './shared';
import BankingClient from './banking-client';

export async function withdraw(details: PaymentDetails): Promise<string> {
  console.log(`Withdrawing $${details.amount} from account ${details.sourceAccount}.\n\n`);
  const bank1 = new BankingClient('bank1.example.com');
  return await bank1.withdraw(details.amount, details.sourceAccount);
}
// @@@SNIPEND

// @@@SNIPSTART hello-world-project-template-ts-deposit-activity
export async function deposit(details: PaymentDetails): Promise<string> {
  console.log(`Depositing $${details.amount} into account ${details.targetAccount}.\n\n`);
  // throw new Error;
  const bank2 = new BankingClient('bank2.example.com');
  return await bank2.deposit(details.amount, details.targetAccount);
}
// @@@SNIPEND
