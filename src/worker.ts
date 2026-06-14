// @@@SNIPSTART money-transfer-project-template-ts-worker
import { NativeConnection, Worker } from '@temporalio/worker';
import * as activities from './activities';
import { namespace, taskQueueName } from './shared';

async function run() {
  // Connect to Temporal Cloud using the gRPC endpoint and API key supplied via
  // environment variables, with TLS enabled.
  const connection = await NativeConnection.connect({
    address: process.env.TEMPORAL_ADDRESS,
    tls: true,
    apiKey: process.env.TEMPORAL_API_KEY,
  });

  // Register Workflows and Activities with the Worker and connect to
  // the Temporal server.
  const worker = await Worker.create({
    connection,
    workflowsPath: require.resolve('./workflows'),
    activities,
    namespace,
    taskQueue: taskQueueName,
  });

  // Start accepting tasks from the Task Queue.
  await worker.run();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
// @@@SNIPEND
