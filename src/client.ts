import { Connection, WorkflowClient } from '@temporalio/client';
import { moneyTransfer } from './workflows';
import { nanoid } from 'nanoid';
import type PaymentDetails from './shared';

import { namespace, taskQueueName } from './constants';

async function run() {
  const connection = await Connection.connect({
    // // Connect to localhost with default ConnectionOptions.
    // // In production, pass options to the Connection constructor to configure TLS and other settings:
    // address: 'foo.bar.tmprl.cloud', // as provisioned
    // tls: {} // as provisioned
  });

  const client = new WorkflowClient({
    connection,
    namespace,
  });

  const details: PaymentDetails = {
    amount: 400,
    sourceAccount: "100",
    targetAccount: "200",
  };

  const handle = await client.start(moneyTransfer, {
    args: [details],
    taskQueue: taskQueueName,
    workflowId: 'workflow-' + nanoid(),
  });

  console.log(`Started workflow ${handle.workflowId} with RunID ${handle.firstExecutionRunId}`);

  console.log(await handle.result());
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
