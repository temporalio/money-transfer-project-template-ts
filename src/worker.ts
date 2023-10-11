// @@@SNIPSTART money-transfer-project-template-ts-worker
import { Worker } from '@temporalio/worker';
import * as activities from './activities';
import { namespace, taskQueueName } from './shared';

async function run() {
  // Register Workflows and Activities with the Worker and connect to
  // the Temporal server.
  const worker = await Worker.create({
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
