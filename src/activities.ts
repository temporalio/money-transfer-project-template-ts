// @@@SNIPSTART hello-world-project-template-ts-withdraw-activity
import type { PaymentDetails } from './shared';
import { BankingService } from './banking-client';

export async function withdraw(details: PaymentDetails): Promise<string> {
  console.log(
    `Withdrawing $${details.amount} from account ${details.sourceAccount}.\n\n`
  );
  const bank1 = new BankingService('bank1.example.com');
  try {
    const result = await bank1.withdraw(
      details.sourceAccount,
      details.amount,
      details.referenceId
    );
    return result;
  } catch (error) {
    throw new Error('Unexpected error occurred');
  }
}

export async function deposit(details: PaymentDetails): Promise<string> {
  console.log(
    `Depositing $${details.amount} into account ${details.targetAccount}.\n\n`
  );
  const bank2 = new BankingService('bank2.example.com');
  // Uncomment the next line and comment lines 27-38 to simulate an unknown failure
  return await bank2.depositThatFails(
    details.targetAccount,
    details.amount,
    details.referenceId
  );
  try {
    const result = await bank2.deposit(
      details.sourceAccount,
      details.amount,
      details.referenceId
    );
    return result;
  } catch (error) {
    throw new Error('Unexpected error occurred');
  }
}

export async function refund(details: PaymentDetails): Promise<string> {
  console.log(
    `Refunding $${details.amount} to account ${details.sourceAccount}.\n\n`
  );
  const bank1 = new BankingService('bank1.example.com');
  try {
    const result = await bank1.deposit(
      details.sourceAccount,
      details.amount,
      details.referenceId
    );
    return result;
  } catch (error) {
    throw new Error('Unexpected error occurred');
  }
}
