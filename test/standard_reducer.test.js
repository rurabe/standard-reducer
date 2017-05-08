'use strict';
import Immutable from 'immutable';

import { createStandardReducer } from '../src/index';

describe('createStandardReducer',() => {
  test('gives an inital state of Immutable.Map',() => {
    const r = createStandardReducer('user');
    expect(r(undefined,{type: 'unrelated_resource'})).toBeInstanceOf(Immutable.Map);
  });
});