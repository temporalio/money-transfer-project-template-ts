import { proxyActivities } from '@temporalio/workflow';
import type * as activities from './activities';
import type PaymentDetails from './shared'

const { withdraw, deposit} = proxyActivities<typeof activities>({
retry: {
  initialInterval: '1 second',
  maximumInterval: '1 minute',
  backoffCoefficient: 2,
  maximumAttempts: 500,
},
startToCloseTimeout: '1 minute',
});

export async function moneyTransfer(details: PaymentDetails): Promise<string> {

  const withDrawOutput = await withdraw(details);
  const depositOutput = await deposit(details);

  return `Transfer complete (trasaction IDs: ${withDrawOutput}, ${depositOutput}`;

}


