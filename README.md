# Temporal Money Transfer example in TypeScript

This is the companion code for the tutorial [Run your first Temporal Application with TypeScript](https://learn.temporal.io/getting_started/typescript/first_program_in_typescript).

### Running this sample:

1. Make sure Temporal Server is running locally (see the [quick install guide](https://docs.temporal.io/server/quick-install/)).
1. `npm install` to install dependencies.
1. `npm run worker` to start the Worker.
1. In another shell, `npm run client` to run the Workflow Client.

The Workflow will return:

```bash
Started Workflow workflow-OyIhuWr6X4opgqtYnhxuX with RunID a85055c8-3fce-466e-b4f6-8f66c16614e6
Transfer complete (transaction IDs: w1328871163, d0590412617)
```
