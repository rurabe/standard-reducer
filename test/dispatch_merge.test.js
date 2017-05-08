'use strict'
import { dispatchMerge } from '../src/index';

describe('dispatchMerge',() => {
  test('returns a function',() => {
    expect(dispatchMerge('widgets')).toBeInstanceOf(Function);
  });

  test('action type is correct',() => {
    expect(dispatchMerge('widgets')({}).type).toEqual('widgets.merge');
  });

  test('action resource data is correct',() => {
    const data = {1: {name: 'Foo'}};
    expect(dispatchMerge('widgets')(data).widgets)
      .toEqual(data);
  });
});