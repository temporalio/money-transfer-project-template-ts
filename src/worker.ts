// @@@SNIPSTART money-transfer-project-template-ts-worker
import { NativeConnection, Worker } from '@temporalio/worker';
import { loadClientConnectConfig } from '@temporalio/envconfig';
import * as activities from './activities';
import { taskQueueName } from './shared';

async function run() {
  // Connect to Temporal Cloud by loading the "cloud-setup" profile from the
  // shared Temporal client config (temporal.toml), which supplies the Cloud
  // address, namespace, TLS settings, and API key.
  const { connectionOptions, namespace } = loadClientConnectConfig({ profile: 'cloud-setup' });
  const connection = await NativeConnection.connect(connectionOptions);

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
