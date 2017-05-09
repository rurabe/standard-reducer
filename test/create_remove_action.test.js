'use strict'
import { createRemoveAction } from '../src/index';

describe('createRemoveAction',() => {
  test('returns a function',() => {
    expect(createRemoveAction('widgets')).toBeInstanceOf(Function);
  });

  test('action type is correct',() => {
    expect(createRemoveAction('widgets')({}).type).toEqual('widgets.remove');
  });

  test('action resource data is correct',() => {
    const data = [[1]];
    expect(createRemoveAction('widgets')(data).widgets)
      .toEqual(data);
  });
});