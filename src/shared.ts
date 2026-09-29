// @@@SNIPSTART money-transfer-project-template-ts-constants
export const namespace = 'default';
// Reads TEMPORAL_TASK_QUEUE when set — e.g. a test harness isolating each run on its
// own queue — otherwise the shared default, so a copy-paste user is unaffected.
export const taskQueueName = process.env.TEMPORAL_TASK_QUEUE || 'money-transfer';
// @@@SNIPEND

// @@@SNIPSTART money-transfer-project-template-ts-shared

export type PaymentDetails = {
  amount: number;
  sourceAccount: string;
  targetAccount: string;
  referenceId: string;
};

// @@@SNIPEND
