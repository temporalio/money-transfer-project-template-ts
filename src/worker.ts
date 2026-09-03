// @@@SNIPSTART money-transfer-project-template-ts-worker
import { NativeConnection, Worker } from '@temporalio/worker';
import { loadClientConnectConfig } from '@temporalio/envconfig';
import * as activities from './activities';
import { taskQueueName } from './shared';

async function run() {
  const config = loadClientConnectConfig();
  config.connectionOptions.address ||= 'localhost:7233';
  const namespace = config.namespace || 'default';
  const connection = await NativeConnection.connect(config.connectionOptions);

  // Register Workflows and Activities with the Worker and connect to
  // the Temporal server.
  try {
    const worker = await Worker.create({
      connection,
      workflowsPath: require.resolve('./workflows'),
      activities,
      namespace,
      taskQueue: taskQueueName,
    });

    // Start accepting tasks from the Task Queue.
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
