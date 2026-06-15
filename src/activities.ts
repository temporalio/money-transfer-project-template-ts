// @@@SNIPSTART money-transfer-project-template-ts-withdraw-activity
import { Context } from '@temporalio/activity';
import { ApplicationFailure } from '@temporalio/common';
import type { PaymentDetails } from './shared';
import { BankingService } from './banking-client';

export async function withdraw(details: PaymentDetails): Promise<string> {
  console.log(
    `Withdrawing $${details.amount} from account ${details.sourceAccount}.\n\n`
  );
  const bank1 = new BankingService('bank1.example.com');
  return await bank1.withdraw(
    details.sourceAccount,
    details.amount,
    details.referenceId
  );
}
// @@@SNIPEND

// @@@SNIPSTART money-transfer-project-template-ts-deposit-activity
export async function deposit(details: PaymentDetails): Promise<string> {
  console.log(
    `Depositing $${details.amount} into account ${details.targetAccount}.\n\n`
  );
  const bank2 = new BankingService('bank2.example.com');

  // Demo-only failure injection, driven by the DEMO_FAILURE env var on the
  // Worker. Unset/off leaves behavior unchanged.
  const demoFailure = (process.env.DEMO_FAILURE ?? '').toLowerCase();
  if (demoFailure === 'transient' && Context.current().info.attempt < 3) {
    // Reuse the always-failing banking path for the first two attempts; the
    // error is retryable, so Temporal retries and the activity succeeds on
    // attempt 3 -> the Workflow recovers and COMPLETEs.
    return await bank2.depositThatFails(
      details.targetAccount,
      details.amount,
      details.referenceId
    );
  }
  if (demoFailure === 'permanent') {
    // Reuse the always-failing banking path, but make it non-retryable so the
    // Workflow's refund compensation (saga rollback) runs instead of retrying.
    try {
      return await bank2.depositThatFails(
        details.targetAccount,
        details.amount,
        details.referenceId
      );
    } catch (err) {
      throw ApplicationFailure.create({ message: `${err}`, nonRetryable: true });
    }
  }

  return await bank2.deposit(
    details.targetAccount,
    details.amount,
    details.referenceId
  );
}
// @@@SNIPEND

// @@@SNIPSTART money-transfer-project-template-ts-refund-activity
export async function refund(details: PaymentDetails): Promise<string> {
  console.log(
    `Refunding $${details.amount} to account ${details.sourceAccount}.\n\n`
  );
  const bank1 = new BankingService('bank1.example.com');
  return await bank1.deposit(
    details.sourceAccount,
    details.amount,
    details.referenceId
  );
}
// @@@SNIPEND
