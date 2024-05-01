// @@@SNIPSTART money-transfer-project-template-ts-worker-namespace
export const namespace: string = process.env.TEMPORAL_NAMESPACE;
// @@@SNIPEND
export const taskQueueName: string = 'money-transfer';

export type PaymentDetails = {
  amount: number;
  sourceAccount: string;
  targetAccount: string;
  referenceId: string;
};