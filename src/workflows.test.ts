import { TestWorkflowEnvironment } from '@temporalio/testing';
import { Worker, Runtime, DefaultLogger, LogEntry } from '@temporalio/worker';
import { moneyTransfer } from './workflows';
import type { PaymentDetails } from './shared';

let testEnv: TestWorkflowEnvironment;

beforeAll(async () => {
  // Use console.log instead of console.error to avoid red output
  // Filter INFO log messages for clearer test output
  Runtime.install({
    logger: new DefaultLogger('WARN', (entry: LogEntry) => console.log(`[${entry.level}]`, entry.message)),
  });

  testEnv = await TestWorkflowEnvironment.createTimeSkipping();
});

afterAll(async () => {
  await testEnv?.teardown();
});

test('moneyTransfer workflows with mock activities', async () => {
  const { client, nativeConnection } = testEnv;
  const worker = await Worker.create({
    connection: nativeConnection,
    taskQueue: 'test',
    workflowsPath: require.resolve('./workflows'),
    activities: {
      withdraw: async () => 'w1234567890',
      deposit: async () => 'd1234567890',
    },
  });

  const details: PaymentDetails = {
    amount: 400,
    sourceAccount: '100',
    targetAccount: '200',
  };

  await worker.runUntil(async () => {
    const result = await client.workflow.execute(moneyTransfer, {
      args: [details],
      workflowId: 'money-transfer-test-workflow',
      taskQueue: 'test',
    });

    expect(result).toEqual('Transfer complete (transaction IDs: w1234567890, d1234567890)');
  });
});
