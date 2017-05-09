'use strict'
import { createMergeAction } from '../src/index';

describe('createMergeAction',() => {
  test('returns a function',() => {
    expect(createMergeAction('widgets')).toBeInstanceOf(Function);
  });

  test('action type is correct',() => {
    expect(createMergeAction('widgets')({}).type).toEqual('widgets.merge');
  });

  test('action resource data is correct',() => {
    const data = {1: {name: 'Foo'}};
    expect(createMergeAction('widgets')(data).widgets)
      .toEqual(data);
  });
});