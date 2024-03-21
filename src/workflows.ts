/* eslint-disable @typescript-eslint/no-unused-vars */
// @@@SNIPSTART money-transfer-project-template-ts-workflow
import { proxyActivities } from '@temporalio/workflow';
import { ApplicationFailure } from '@temporalio/common';

import type * as activities from './activities';
import type { PaymentDetails } from './shared';

export async function moneyTransfer(details: PaymentDetails): Promise<string> {
  // Get the Activities for the Workflow and set up the Activity Options.
  const { withdraw, deposit, refund } = proxyActivities<typeof activities>({
    // RetryPolicy specifies how to automatically handle retries if an Activity fails.
    retry: {
      initialInterval: '1 second',
      maximumInterval: '1 minute',
      backoffCoefficient: 2,
      maximumAttempts: 500,
      nonRetryableErrorTypes: ['InvalidAccountError', 'InsufficientFundsError'],
    },
    startToCloseTimeout: '1 minute',
  });

  // Execute the withdraw Activity
  let withdrawResult: string;
  try {
    withdrawResult = await withdraw(details);
  } catch (withdrawErr) {
    throw new ApplicationFailure(`Withdrawal failed. Error: ${withdrawErr}`);
  }

  //Execute the deposit Activity
  let depositResult: string;
  try {
    depositResult = await deposit(details);
  } catch (depositErr) {
    // The deposit failed; try to refund the money.
    let refundResult;
    try {
      refundResult = await refund(details);
      throw ApplicationFailure.create({
        message: `Failed to deposit money into account ${details.targetAccount}. Money returned to ${details.sourceAccount}. Cause: ${depositErr}.`,
      });
    } catch (refundErr) {
      throw ApplicationFailure.create({
        message: `Failed to deposit money into account ${details.targetAccount}. Money could not be returned to ${details.sourceAccount}. Cause: ${refundErr}.`,
      });
    }
  }
  return `Transfer complete (transaction IDs: ${withdrawResult}, ${depositResult})`;
}
// @@@SNIPEND
