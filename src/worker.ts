// @@@SNIPSTART money-transfer-project-template-ts-worker
import { Worker, NativeConnectionOptions, NativeConnection } from "@temporalio/worker";
import * as activities from './activities';
import { namespace, taskQueueName } from './shared';
import { getEnv } from './helpers';

async function run() {
  const { address, namespace, clientCert, clientKey, apiKey } = await getEnv();

  let connectionOptions: NativeConnectionOptions = {
    address: address,
  };

  if (clientCert && clientKey) {
  // Configure mTLS authentication if certificate and key are provided
  connectionOptions.tls = {
      clientCertPair: {
        crt: clientCert,
        key: clientKey,
      },
    };
  } else if (apiKey) {
    // API key authentication
    connectionOptions.tls = true;
    connectionOptions.apiKey = apiKey;
    connectionOptions.metadata = {
      'temporal-namespace': namespace || 'default',
    };
  } else {
    // No authentication
    connectionOptions.tls = false;
  }

  // Create the connection
  const connection = await NativeConnection.connect(connectionOptions);

  // Register Workflows and Activities with the Worker and connect to
  // the Temporal Service.
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
