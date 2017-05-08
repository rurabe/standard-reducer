'use strict';
import Immutable from 'immutable';

import { createStandardReducer } from '../src/index';

describe('remove',() => {
  describe('flat objects',() => {
    test('removes paths in the action',() => {
      const r = createStandardReducer('user');
      const lastState = Immutable.fromJS({id: 9, name: 'Standard', email: 'foo@foo.com'});
      const action = {type: 'user.remove', user: [['name'],['email']]};
      const newState = r(lastState,action);
      expect(newState).toEqual(Immutable.fromJS({id: 9}));
    });

    test('does not remove paths not in the action',() => {
      const r = createStandardReducer('user');
      const lastState = Immutable.fromJS({id: 9, name: 'Standard', email: 'foo@foo.com'});
      const action = {type: 'user.remove', user: [['email']]};
      const newState = r(lastState,action);
      expect(newState).toEqual(Immutable.fromJS({id: 9, name: 'Standard'}));
    });

    test('does not remove paths not in the action',() => {
      const r = createStandardReducer('user');
      const lastState = Immutable.fromJS({id: 9, name: 'Standard', email: 'foo@foo.com'});
      const action = {type: 'user.remove', user: [['email']]};
      const newState = r(lastState,action);
      expect(newState).toEqual(Immutable.fromJS({id: 9, name: 'Standard'}));
    });
  });

  describe('keyed collections',() => {
    test('does not remove records not in the action',() => {
      const r = createStandardReducer('widgets');
      const lastState = Immutable.fromJS({
        5: { id: 5, name: 'unchanged'}
      });
      const action = {type: 'widgets.remove', widgets: [['1']]};
      const newState = r(lastState,action);
      expect(newState.get('5')).toEqual(Immutable.fromJS({ id: 5, name: 'unchanged'}));
    });

    test('does not remove attributes not in the action',() => {
      const r = createStandardReducer('widgets');
      const lastState = Immutable.fromJS({
        5: { id: 5, name: 'unchanged', type: 'special'}
      });
      const action = {type: 'widgets.remove', widgets: [['5','type']]};
      const newState = r(lastState,action);
      expect(newState.getIn(['5','name'])).toEqual('unchanged');
    });

    test('removes records in the action',() => {
      const r = createStandardReducer('widgets');
      const lastState = Immutable.fromJS({
        5: { id: 5, name: 'unchanged'}
      });
      const action = {type: 'widgets.remove', widgets: [['5']]};
      const newState = r(lastState,action);
      expect(newState.has('5')).toBeFalsy();
    });

    test('removes attributes in the action',() => {
      const r = createStandardReducer('widgets');
      const lastState = Immutable.fromJS({
        5: { id: 5, name: 'unchanged', type: 'special'}
      });
      const action = {type: 'widgets.remove', widgets: [['5','type']]};
      const newState = r(lastState,action);
      expect(newState.getIn(['5','type'])).toBeUndefined()
    });

    test('removes multiple paths',() => {
      const r = createStandardReducer('widgets');
      const lastState = Immutable.fromJS({
        1: { id: 1, name: 'a'},
        2: { id: 2, name: 'b'},
        3: { id: 3, name: 'c'},
        4: { id: 4, name: 'd'},
        5: { id: 5, name: 'e'},
      });
      const action = {type: 'widgets.remove', widgets: [['1'],['2'],['3']]};
      const newState = r(lastState,action);
      expect(newState.has('1')).toBeFalsy();
      expect(newState.has('2')).toBeFalsy();
      expect(newState.has('3')).toBeFalsy();
    });

    test('removes numeric paths',() => {
      const r = createStandardReducer('widgets');
      const lastState = Immutable.fromJS({
        1: { id: 1, name: 'a'},
        2: { id: 2, name: 'b'},
        3: { id: 3, name: 'c'},
        4: { id: 4, name: 'd'},
        5: { id: 5, name: 'e'},
      });
      const action = {type: 'widgets.remove', widgets: [[1],[3]]};
      const newState = r(lastState,action);
      expect(newState.has('1')).toBeFalsy();
      expect(newState.has('3')).toBeFalsy();
    });
  });
});