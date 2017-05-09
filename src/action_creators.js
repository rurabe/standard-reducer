'use strict';

const newAction = function(resourceName,verb,resource){
  let a = {type: `${resourceName}.${verb}`};
  a[resourceName] = resource;
  return a;
}

const createMergeAction = function(resourceName){
  return (resource) => newAction(resourceName,'merge',resource);
};

const createRemoveAction = function(resourceName){
  return (resource) => newAction(resourceName,'remove',resource);
};

const createLoadAction = function(resourceName){
  return (resource) => newAction(resourceName,'load',resource);
};

export { createMergeAction, createRemoveAction, createLoadAction };