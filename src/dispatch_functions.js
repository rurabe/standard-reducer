'use strict';

const newAction = function(resourceName,verb,resource){
  let a = {type: `${resourceName}.${verb}`};
  a[resourceName] = resource;
  return a;
}

const dispatchMerge = function(resourceName){
  return (resource) => newAction(resourceName,'merge',resource);
};

const dispatchRemove = function(resourceName){
  return (resource) => newAction(resourceName,'remove',resource);
};

const dispatchLoad = function(resourceName){
  return (resource) => newAction(resourceName,'load',resource);
};

export { dispatchMerge, dispatchRemove, dispatchLoad };