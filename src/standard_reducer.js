'use strict';
var Immutable = require('immutable');

module.exports = {
  createStandardReducer: (resourceName,initialState={}) => {
    return (state=Immutable.fromJS(initialState),action) => {
      switch(action.type){
      case `${resourceName}.merge`:
        return state.mergeDeep(action[resourceName]);
      case `${resourceName}.remove`:
        if(action[resourceName].length > 1){
          return state.withMutations(s => {
            for(let i=0;i<action[resourceName].length;i++){
              s.deleteIn(action[resourceName][i]);
            }
          });
        } else {
          let s = state;
          for(let i=0;i<action[resourceName].length;i++){
            s = s.deleteIn(action[resourceName][i]);
          }
          return s;
        }
      case `${resourceName}.load`:
        return Immutable.fromJS(action[resourceName]);
      default: 
        return state;
      }
    };
  }
};