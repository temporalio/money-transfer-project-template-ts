// @@@SNIPSTART money-transfer-project-template-ts-start-workflow
import { Connection, ConnectionOptions, WorkflowClient } from '@temporalio/client';
import { moneyTransfer } from './workflows';
import type { PaymentDetails } from './shared';
import { getEnv } from './helpers';

import { namespace, taskQueueName } from './shared';

async function run() {
  const { address, namespace, clientCert, clientKey, apiKey } = await getEnv();


  let connectionOptions: ConnectionOptions = {
    address: address,
  };

  // Configure mTLS authentication if certificates are provided
  if (clientCert && clientKey) {
    connectionOptions.tls = {
      clientCertPair: {
        crt: clientCert,
        key: clientKey,
      },
    };
  } else if (apiKey) {
    // Configure API key authentication
    connectionOptions.tls = true;
    connectionOptions.apiKey = apiKey;
    connectionOptions.metadata = {
      'temporal-namespace': namespace,
    };
  } else {
    // No authentication
    connectionOptions.tls = false;
  }

  // Create the connection
  const connection = await Connection.connect(connectionOptions);

  const client = new WorkflowClient({ connection, namespace });

  const details: PaymentDetails = {
    amount: 400,
    sourceAccount: '85-150',
    targetAccount: '43-812',
    referenceId: '12345',
  };

  console.log(
    `Starting transfer from account ${details.sourceAccount} to account ${details.targetAccount} for $${details.amount}`
  );

  const handle = await client.start(moneyTransfer, {
    args: [details],
    taskQueue: taskQueueName,
    workflowId: 'pay-invoice-801',
  });

  console.log(
    `Started Workflow ${handle.workflowId} with RunID ${handle.firstExecutionRunId}`
  );
  console.log(await handle.result());
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
// @@@SNIPEND
