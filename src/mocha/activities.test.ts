import { MockActivityEnvironment } from '@temporalio/testing';
import { it } from 'mocha';
import assert from 'assert';
import type { PaymentDetails } from '../shared';
import * as activities from '../activities';

describe('money transfer activities', async () => {
  it('successfully withdraws money from the account', async () => {
    const env = new MockActivityEnvironment();
    const validRegex = /^[a-zA-Z0-9]*$/;
    const details: PaymentDetails = {
      amount: 400,
      sourceAccount: '85-150',
      targetAccount: '43-812',
      referenceId: '12345',
    };
    //does not test to see if the exact result is a specific string, because the result gets randomized each time
    const result = await env.run(activities.withdraw, details);
    assert.equal(typeof result, 'string');
    assert.equal((result as string).length, 11);
    assert((result as string).startsWith('W'));
    assert(validRegex.test(result as string));
  });

  it('successfully deposits money into the account', async () => {
    const env = new MockActivityEnvironment();
    const validRegex = /^[a-zA-Z0-9]*$/;
    const details: PaymentDetails = {
      amount: 400,
      sourceAccount: '85-150',
      targetAccount: '43-812',
      referenceId: '12345',
    };
    const result = await env.run(activities.deposit, details);
    assert.equal(typeof result, 'string');
    assert.equal((result as string).length, 11);
    assert((result as string).startsWith('D'));
    assert(validRegex.test(result as string));
  });

  it('successfully refunds money into the account', async () => {
    const env = new MockActivityEnvironment();
    const validRegex = /^[a-zA-Z0-9]*$/;
    const details: PaymentDetails = {
      amount: 400,
      sourceAccount: '85-150',
      targetAccount: '43-812',
      referenceId: '12345',
    };
    const result = await env.run(activities.deposit, details);
    assert.equal(typeof result, 'string');
    assert.equal((result as string).length, 11);
    assert((result as string).startsWith('D'));
    assert(validRegex.test(result as string));
  });
});
