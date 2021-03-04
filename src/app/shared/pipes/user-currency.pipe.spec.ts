import { UserCurrencyPipe } from './user-currency.pipe';

describe('UserCurrencyPipe', () => {
  it('create an instance', () => {
    const pipe = new UserCurrencyPipe();
    expect(pipe).toBeTruthy();
  });
});
