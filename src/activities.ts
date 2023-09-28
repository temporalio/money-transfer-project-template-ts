import type { PaymentDetails } from "./shared";
import { BankingService } from "./banking-client";

export async function withdraw(
  details: PaymentDetails
): Promise<string | Error> {
  console.log(
    `Withdrawing $${details.amount} from account ${details.sourceAccount}.\n\n`
  );
  const bank1 = new BankingService("bank1.example.com");
  return await bank1.withdraw(
    details.sourceAccount,
    details.amount,
    details.referenceId
  );
}

export async function deposit(
  details: PaymentDetails
): Promise<string | Error> {
  console.log(
    `Depositing $${details.amount} into account ${details.targetAccount}.\n\n`
  );
  const bank2 = new BankingService("bank2.example.com");
  // Uncomment the next line and comment the one after that to simulate an unknown failure
  // return await bank2.depositThatFails(details.targetAccount, details.amount, details.referenceId);
  return await bank2.deposit(
    details.targetAccount,
    details.amount,
    details.referenceId
  );
}

export async function refund(details: PaymentDetails): Promise<string | Error> {
  console.log(
    `Refunding $${details.amount} to account ${details.sourceAccount}.\n\n`
  );
  const bank3 = new BankingService("bank3.example.com");
  return await bank3.deposit(
    details.sourceAccount,
    details.amount,
    details.referenceId
  );
}
