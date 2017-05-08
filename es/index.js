import Immutable from 'immutable';

const createStandardReducer = (resourceName) => {
  return (state=Immutable.Map(),action) => {
    switch(action.type){
    case `${resourceName}.merge`:
      return state.mergeDeep(action[resourceName]);
    case `${resourceName}.remove`:
      switch(action[resourceName].length){
      case 0:
        return state;
      case 1:
        return state.deleteIn(action[resourceName][0].map(seg => seg.toString()))
      default: 
        return state.withMutations(s => {
          for(let i=0;i<action[resourceName].length;i++){
            const path = action[resourceName][i].map(seg => seg.toString());
            s.deleteIn(path);
          }
        });
      }
    case `${resourceName}.load`:
      return Immutable.fromJS(action[resourceName]);
    default: 
      return state;
    }
  };
};

const newAction = function(resourceName,verb,resource){
  let a = {type: `${resourceName}.${verb}`};
  a[resourceName] = resource;
  return a;
};

const dispatchMerge = function(resourceName){
  return (resource) => newAction(resourceName,'merge',resource);
};

const dispatchRemove = function(resourceName){
  return (resource) => newAction(resourceName,'remove',resource);
};

const dispatchLoad = function(resourceName){
  return (resource) => newAction(resourceName,'load',resource);
};

var index = {
  createStandardReducer,
  dispatchMerge,
  dispatchRemove,
  dispatchLoad
};

export default index;
