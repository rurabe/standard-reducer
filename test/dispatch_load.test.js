'use strict'
import { dispatchLoad } from '../src/index';

describe('dispatchLoad',() => {
  test('returns a function',() => {
    expect(dispatchLoad('widgets')).toBeInstanceOf(Function);
  });

  test('action type is correct',() => {
    expect(dispatchLoad('widgets')({}).type).toEqual('widgets.load');
  });

  test('action resource data is correct',() => {
    const data = {1: {name: 'Foo'}};
    expect(dispatchLoad('widgets')(data).widgets)
      .toEqual(data);
  });
});