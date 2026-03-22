// @@@SNIPSTART money-transfer-project-template-ts-worker
import { NativeConnection, Worker } from '@temporalio/worker';
import { loadClientConnectConfig } from '@temporalio/envconfig';
import * as activities from './activities';
import { namespace, taskQueueName } from './shared';

async function run() {
  // Create the Temporal Client that connects to the Temporal Service.
  // By default, it will connect to one running locally, on the standard
  // port, and use the default Namespace. You can override this by setting
  // the TEMPORAL_PROFILE environment variable to the name of a specific
  // profile that you've set up using the Temporal CLI.
  const config = loadClientConnectConfig();
  const connection = await NativeConnection.connect(config.connectionOptions);

  try {
    // Register Workflows and Activities with the Worker and connect to
    // the Temporal Service
    const worker = await Worker.create({
      connection,
      workflowsPath: require.resolve('./workflows'),
      activities,
      namespace: config.namespace,
      taskQueue: taskQueueName,
    });

    // Start accepting tasks from the Task Queue
    await worker.run();
  } finally {
    await connection.close();
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
// @@@SNIPEND
