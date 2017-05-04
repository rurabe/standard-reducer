'use strict';
const Immutable = require('immutable');

const StandardReducer = require('../src/standard_reducer');
const createStandardReducer = StandardReducer.createStandardReducer;

describe('load',() => {
  describe('flat objects',() => {
    test('replaces the object',() => {
      const r = createStandardReducer('user');
      const lastState = Immutable.fromJS({id: 9, name: 'Standard', email: 'foo@foo.com'});
      const action = {type: 'user.load', user: {id: 9, name: 'Reducer', email: 'baz@foo.com'}};
      const newState = r(lastState,action);
      expect(newState).toEqual(Immutable.fromJS({id: 9, name: 'Reducer', email: 'baz@foo.com'}));
    });
  });

  describe('keyed collections',() => {
    test('replaces the collection',() => {
      const r = createStandardReducer('widgets');
      const lastState = Immutable.fromJS({
        1: { id: 1, name: 'a'},
        2: { id: 2, name: 'b'},
        3: { id: 3, name: 'c'},
      });
      const action = {type: 'widgets.load', widgets: {
        4: { id: 4, name: 'd'},
        5: { id: 5, name: 'e'},
      }};
      const newState = r(lastState,action);
      expect(newState).toEqual(Immutable.fromJS({
        4: { id: 4, name: 'd'},
        5: { id: 5, name: 'e'},
      }));
    });
  });
});