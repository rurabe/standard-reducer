'use strict';
const Immutable = require('immutable');

const StandardReducer = require('../src/standard_reducer');
const createStandardReducer = StandardReducer.createStandardReducer;

describe('merge',() => {
  describe('flat objects',() => {
    test('does not update attributes not in the action',() => {
      const r = createStandardReducer('user');
      const lastState = Immutable.fromJS({email: 'foo@foo.com'});
      const action = {type: 'user.merge', user: {id: 10, name: 'Standard'}};
      const newState = r(lastState,action);
      expect(newState.get('email')).toEqual('foo@foo.com');
    });

    test('sets attributes in the action when they do not exist',() => {
      const r = createStandardReducer('user');
      const lastState = Immutable.fromJS({id: 4});
      const action = {type: 'user.merge', user: {name: 'Standard'}};
      const newState = r(lastState,action);
      expect(newState.get('name')).toEqual('Standard');
    });

    test('updates attributes in the action',() => {
      const r = createStandardReducer('user');
      const lastState = Immutable.fromJS({name: 'Reducer'});
      const action = {type: 'user.merge', user: {name: 'Standard'}};
      const newState = r(lastState,action);
      expect(newState.get('name')).toEqual('Standard');
    });
  });

  describe('keyed collections',() => {
    test('does not update records not in the action',() => {
      const r = createStandardReducer('widgets');
      const lastState = Immutable.fromJS({
        5: { id: 5, name: 'unchanged'}
      });
      const action = {type: 'widgets.merge', widgets: {
        1: { id: 1, name: 'thingy' }
      }};
      const newState = r(lastState,action);
      expect(newState.get('5')).toEqual(Immutable.fromJS({ id: 5, name: 'unchanged'}));
    });

    test('does not update attributes not in the action',() => {
      const r = createStandardReducer('widgets');
      const lastState = Immutable.fromJS({
        5: { id: 5, name: 'unchanged'}
      });
      const action = {type: 'widgets.merge', widgets: {
        5: { id: 5, status: 'available' }
      }};
      const newState = r(lastState,action);
      expect(newState.getIn(['5','name'])).toEqual('unchanged');
    });

    test('adds records when they do not exist',() => {
      const r = createStandardReducer('widgets');
      const lastState = Immutable.fromJS({
        1: { id: 1, name: 'ringy'},
      });
      const action = {type: 'widgets.merge', widgets: {
        3: { id: 3, name: 'slingy' }
      }};
      const newState = r(lastState,action);
      expect(newState.get('3')).toEqual(Immutable.fromJS({ id: 3, name: 'slingy' }));
    });

    test('adds attributes when they do not exist',() => {
      const r = createStandardReducer('widgets');
      const lastState = Immutable.fromJS({
        1: { id: 1, name: 'ringy'},
      });
      const action = {type: 'widgets.merge', widgets: {
        1: { id: 1, type: 'thinger' }
      }};
      const newState = r(lastState,action);
      expect(newState.get('1')).toEqual(Immutable.fromJS({ id: 1, name: 'ringy', type: 'thinger' }));
    });

    test('updates attributes in existing records',() => {
      const r = createStandardReducer('widgets');
      const lastState = Immutable.fromJS({
        1: { id: 1, name: 'ringy'},
      });
      const action = {type: 'widgets.merge', widgets: {
        1: { id: 1, name: 'ringy redux' }
      }};
      const newState = r(lastState,action);
      expect(newState.get('1')).toEqual(Immutable.fromJS({ id: 1, name: 'ringy redux' }));
    });

    test('deep adds records when they do not exist',() => {
      const r = createStandardReducer('widgets');
      const lastState = Immutable.fromJS({
        1: { id: 1, name: 'ringy'},
      });
      const action = {type: 'widgets.merge', widgets: {
        1: { orders: { 2: {number: "a001"}} }
      }};
      const newState = r(lastState,action);
      expect(newState.get('1')).toEqual(Immutable.fromJS({ id: 1, name: 'ringy', orders: {2: {number: "a001"}} }));
    });

    test('deep adds attributes when they do not exist',() => {
      const r = createStandardReducer('widgets');
      const lastState = Immutable.fromJS({
        1: { id: 1, name: 'ringy', orders: { 2: {number: "a001"}}},
      });
      const action = {type: 'widgets.merge', widgets: {
        1: { orders: { 2: {paid: true}} }
      }};
      const newState = r(lastState,action);
      expect(newState.get('1')).toEqual(Immutable.fromJS({ id: 1, name: 'ringy', orders: {2: {number: "a001", paid: true}} }));
    });

    test('deep updates attributes',() => {
      const r = createStandardReducer('widgets');
      const lastState = Immutable.fromJS({
        1: { id: 1, name: 'ringy', orders: { 2: {paid: true}}},
      });
      const action = {type: 'widgets.merge', widgets: {
        1: { orders: { 2: {paid: false}} }
      }};
      const newState = r(lastState,action);
      expect(newState.get('1')).toEqual(Immutable.fromJS({ id: 1, name: 'ringy', orders: {2: {paid: false}} }));
    });
  });
});