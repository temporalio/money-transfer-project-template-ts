// @@@SNIPSTART money-transfer-project-template-ts-worker-promises
import fs from "fs/promises";
// @@@SNIPEND
// @@@SNIPSTART money-transfer-project-template-ts-worker-nativeconnection
import { Worker, NativeConnection } from "@temporalio/worker";
// @@@SNIPEND
import * as activities from "./activities";
import { namespace, taskQueueName } from './shared';
async function run() {
  // @@@SNIPSTART money-transfer-project-template-ts-worker-connect-to-cloud
  const connection = await NativeConnection.connect({
    address: process.env.TEMPORAL_ADDRESS!,
    tls: {
      clientCertPair: {
        crt: await fs.readFile(process.env.TEMPORAL_MTLS_TLS_CERT!),
        key: await fs.readFile(process.env.TEMPORAL_MTLS_TLS_KEY!),
      },
    },
  });
// @@@SNIPEND
  const worker = await Worker.create({
    connection,
    namespace: process.env.TEMPORAL_NAMESPACE!,
    taskQueue: taskQueueName,,
    workflowsPath: require.resolve("./workflows"),
    activities,
  });

  await worker.run();
  await connection.close();
}