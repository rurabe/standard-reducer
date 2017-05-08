'use strict'
import { dispatchRemove } from '../src/index';

describe('dispatchRemove',() => {
  test('returns a function',() => {
    expect(dispatchRemove('widgets')).toBeInstanceOf(Function);
  });

  test('action type is correct',() => {
    expect(dispatchRemove('widgets')({}).type).toEqual('widgets.remove');
  });

  test('action resource data is correct',() => {
    const data = [[1]];
    expect(dispatchRemove('widgets')(data).widgets)
      .toEqual(data);
  });
});