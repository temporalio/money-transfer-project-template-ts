// @@@SNIPSTART money-transfer-project-template-ts-constants
export const namespace = 'default';
export const taskQueueName = 'money-transfer';
// @@@SNIPEND

// @@@SNIPSTART money-transfer-project-template-ts-shared

export type PaymentDetails = {
  amount: number;
  sourceAccount: string;
  targetAccount: string;
  referenceId: string;
};

// @@@SNIPEND
