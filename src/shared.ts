// @@@SNIPSTART hello-world-project-template-ts-constants
export const namespace = 'default';
export const taskQueueName = 'money-transfer';
// @@@SNIPEND

// @@@SNIPSTART hello-world-project-template-ts-shared

export type PaymentDetails = {
  amount: number;
  sourceAccount: string;
  targetAccount: string;
  referenceId: string;
};

// @@@SNIPEND
