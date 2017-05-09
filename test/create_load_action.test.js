'use strict'
import { createLoadAction } from '../src/index';

describe('createLoadAction',() => {
  test('returns a function',() => {
    expect(createLoadAction('widgets')).toBeInstanceOf(Function);
  });

  test('action type is correct',() => {
    expect(createLoadAction('widgets')({}).type).toEqual('widgets.load');
  });

  test('action resource data is correct',() => {
    const data = {1: {name: 'Foo'}};
    expect(createLoadAction('widgets')(data).widgets)
      .toEqual(data);
  });
});