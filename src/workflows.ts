// @@@SNIPSTART hello-world-project-template-ts-workflow
import { proxyActivities } from "@temporalio/workflow";
import { ApplicationFailure } from "@temporalio/common";

import type * as activities from "./activities";
import type { PaymentDetails } from "./shared";

export async function moneyTransfer(details: PaymentDetails): Promise<string> {
  // Get the Activities for the Workflow and set up the Activity Options.
  const { withdraw, deposit, refund } = proxyActivities<typeof activities>({
    // RetryPolicy specifies how to automatically handle retries if an Activity fails.
    retry: {
      initialInterval: "1 second",
      maximumInterval: "1 minute",
      backoffCoefficient: 2,
      maximumAttempts: 500,
      nonRetryableErrorTypes: ["InvalidAccountError", "InsufficientFundsError"],
    },
    startToCloseTimeout: "1 minute",
  });

  // Execute the Withdraw Activity
  let withdrawOutput: string | Error;
  try {
    withdrawOutput = await withdraw(details);
  } catch (withdrawErr) {
    throw new ApplicationFailure(`Withdrawal failed. Error: ${withdrawErr}`);
  }

  //Execute the Deposit Activity
  let depositOutput: string | Error;
  try {
    depositOutput = await deposit(details);
  } catch (depositErr) {
    // The deposit failed; try to refund the money.
    let refundSuccessful;
    try {
      await refund(details);
      refundSuccessful = true;
    } catch (refundErr) {
      refundSuccessful = false;
    }
    if (refundSuccessful) {
      throw new ApplicationFailure(
        `Failed to deposit money into account ${details.targetAccount}. Money returned to ${details.sourceAccount}. Error during deposit: ${depositErr}.`
      );
    } else {
      throw new ApplicationFailure(
        `Failed to deposit money into account ${details.targetAccount}. Money could not be returned to ${details.sourceAccount}.`
      );
    }
  }
  return `Transfer complete (transaction IDs: ${withdrawOutput}, ${depositOutput})`;
}
