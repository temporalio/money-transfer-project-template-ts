import fs from 'fs/promises';

export interface Env {
  address: string;
  namespace: string;

  // for mTLS authentication
  clientCert: Buffer | undefined;
  clientKey: Buffer | undefined;

  // for API Key authentication
  apiKey?: string;
}

export async function getEnv(): Promise<Env> {
  return {
    address: getEnvValue('TEMPORAL_ADDRESS', 'localhost:7233'),
    namespace: getEnvValue('TEMPORAL_NAMESPACE', 'default'),

    clientCert: await maybeReadFileAsBuffer(process.env.TEMPORAL_TLS_CERT),
    clientKey: await maybeReadFileAsBuffer(process.env.TEMPORAL_TLS_KEY),

    apiKey: process.env.TEMPORAL_API_KEY,
  };
}

function getEnvValue(key: string, defaultValue: string): string {
  const value = process.env[key];
  return value !== undefined ? value : defaultValue;
}

async function maybeReadFileAsBuffer(path?: string): Promise<Buffer | undefined> {
  if (path === undefined) return undefined;
  return await fs.readFile(path);
}
