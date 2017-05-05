'use strict';
const Immutable = require('immutable');

const StandardReducer = require('../src/standard_reducer');
const createStandardReducer = StandardReducer.createStandardReducer;

describe('StandardReducer',() => {
  describe('createStandardReducer',() => {
    test('gives an inital state of Immutable.Map',() => {
      const r = createStandardReducer('user');
      expect(r(undefined,{type: 'unrelated_resource'})).toBeInstanceOf(Immutable.Map);
    });
  });
});