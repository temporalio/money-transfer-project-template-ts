// @@@SNIPSTART hello-world-project-template-ts-workflow
import { proxyActivities } from '@temporalio/workflow';
import type * as activities from './activities';
import type { PaymentDetails } from './shared';

export async function moneyTransfer(details: PaymentDetails): Promise<string> {
  // Get the Activities for the Workflow and set up the Activity Options.
  const { withdraw, deposit } = proxyActivities<typeof activities>({
    retry: {
      initialInterval: '1 second',
      maximumInterval: '1 minute',
      backoffCoefficient: 2,
      maximumAttempts: 500,
    },
    startToCloseTimeout: '1 minute',
  });

  // Execute the Activities
  const withdrawOutput = await withdraw(details);
  const depositOutput = await deposit(details);

  return `Transfer complete (transaction IDs: ${withdrawOutput}, ${depositOutput})`;
}
// @@@SNIPEND
