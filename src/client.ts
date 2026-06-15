// @@@SNIPSTART money-transfer-project-template-ts-start-workflow
import { Connection, Client } from '@temporalio/client';
import { loadClientConnectConfig } from '@temporalio/envconfig';
import { moneyTransfer } from './workflows';
import type { PaymentDetails } from './shared';

import { taskQueueName } from './shared';

async function run() {
  // Connect to Temporal Cloud by loading the "cloud-setup" profile from the
  // shared Temporal client config (temporal.toml), which supplies the Cloud
  // address, namespace, TLS settings, and API key.
  const { connectionOptions, namespace } = loadClientConnectConfig({ profile: 'cloud-setup' });
  const connection = await Connection.connect(connectionOptions);
  const client = new Client({ connection, namespace });

  const details: PaymentDetails = {
    amount: 400,
    sourceAccount: '85-150',
    targetAccount: '43-812',
    referenceId: '12345',
  };

  console.log(
    `Starting transfer from account ${details.sourceAccount} to account ${details.targetAccount} for $${details.amount}`
  );

  const handle = await client.workflow.start(moneyTransfer, {
    args: [details],
    taskQueue: taskQueueName,
    workflowId: 'pay-invoice-801',
  });

  console.log(
    `Started Workflow ${handle.workflowId} with RunID ${handle.firstExecutionRunId}`
  );
  console.log(await handle.result());

  connection.close()
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
// @@@SNIPEND
