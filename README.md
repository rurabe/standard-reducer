# Standard Reducer

#### An opinionated but consistent reducer pattern for organizing data in stores.

## Why would I use this?

Using the Standard Reducer makes your reducers consistent and predictable, and eliminates boilerplate. Instead of writing a custom reducer function for each store, just drop a Standard Reducer in and use the standard API. Don't worry, if you have to do something tricky you can always just write a custom reducer instead.

```javascript
  combineReducers({
    posts: createStandardReducer('posts'),
    users: createStandardReducer('users'),
    trickyResource: TrickyResourceReducer,
  })
```

## What opinions make this opinionated?
1. *Stores should hold their data in Immutable collections* This is more a judgment on the benefits of Immutable, but Immutable provides big and easy wins in React apps.

2. *The store's main job is reflecting persistence layer's source of truth.* Because the store is not the ultimate source of truth, it does not worry about order or race conditions and just applies updates in an effort to stay current. The standard actions are all you need to accomplish this.

3. *Collections should be stored in Maps with unique ids as the keys* There are two reasons for this. When consuming the tree, it's easier to pick an element out of the collection by a key rather than iterating through a list. When updating the tree, `mergeDeep` cannot reconcile Lists (arrays), so storing collections in maps allows `mergeDeep` to enact changes anywhere in the tree.


## API
### createStandardReducer(resourceName: string)

Creates a new standard reducer with standard actions namespaced under `${resourceName}`.

```javascript
  const { createStore } = require('redux');
  const { combineReducers } = require('react-redux');
  const { createStandardReducer } = require('standard-reducer');
  const other = require('other-reducer');
  
  // will repond to 'posts.merge','posts.remove', and 'posts.load'
  const posts = createStandardReducer('posts');
  
  
  const store = createStore( combineReducers({
    posts,
    other
  }) );
```

### Standard Actions

These are the three actions that Standard Reducers will respond to. [Actions](http://redux.js.org/docs/basics/Actions.html) are just plain JS objects, with two keys: 
  1. `type`, which should be a string in the following format: `"${resourceName}.(merge|remove|load)"`
  2. the `resourceName` of the Standard Reducer you want to respond to this action (ie `posts` or `users`), which should be an object containing a keyed collection.

#### `${resourceName}.merge`

`${resourceName}.merge` will perform an Immutable [`mergeDeep`](https://facebook.github.io/immutable-js/docs/#/Map/mergeDeep) on the state. This can be used to add data, or update existing data.

```javascript
  dispatch({type: 'posts.merge', posts: {1: {body: 'Hello World!'}}})
```


#### `${resourceName}.remove`

`${resourceName}.remove` takes an array of paths in your state tree, and performs an Immutable [`deleteIn`](https://facebook.github.io/immutable-js/docs/#/Map/deleteIn) on this reducer, removing the data at each path. Paths themselves are arrays of keys which desribe how to to get to the data to be deleted by following the keys in sequence. This is necessary to remove anything from the state, because merge is only additive.

```javascript
  dispatch({type: 'posts.remove' posts: [[1],[2],[3,'comments',14]})
```

#### `${resourceName}.load`

`${resourceName}.load` replaces your state with the return value of Immutable [`fromJS`](https://facebook.github.io/immutable-js/docs/#/fromJS), when it's easier to just replace the state wholesale rather than try to incrementally reconcile it.

```javascript
  dispatch({type: 'posts.load' posts: {2: {body: 'Hello Mars!'}})
```

## Example

```javascript

```

## Conceptually

The standard actions do not map 1:1 to other concepts like CRUD, but you can do all the same things (and more, since load will let you start over from scratch).


| CRUD    | SQL                              | Standard Action      |
|---------|----------------------------------|----------------------|
| Create  | INSERT                           | merge                |
| Read    | SELECT                           | (consume from store) |
| Update  | UPDATE                           | merge                |
| Destroy | DELETE                           | remove               |
|         | DROP TABLE; CREATE TABLE; INSERT | load                 |

## How did we get here?

When Facebook released React, they were very clear that it was just a view layer. It consumed data, but React didn't concern itself with where that data came from or how it was stored.

Eventually they released Flux, which was less of a lib and more of them saying, "Look here's how we deal with storing and mutating data in React." It was still pretty unopinionated, and many of the examples just stored data in JS object.

Then came Redux, and they said we're going to have order here. We will have only one store, one tree, that you can chop into reducers. But we will only mutate data through these reducer functions.

But even Redux is not very opinionated about how to store your data, or how to mutate it in your reducers. Standard Reducer is an attempt to build on these ideas to provide a standard, predictable structure and reduce boilerplate.

## Why did you write this?

I've been searching for a consistent way to store data in stores coming from the server. Flux and Redux do not seem to be very opinionated about this, and I haven't seen a consensus develop in the wider community.

The epiphany (and really, the star behind this lib) was Immutable's `mergeDeep`. By keeping collections in keyed objects, you can just apply patches to your state and keep it in sync. Just added a post? Nest it under it's primary key and `mergeDeep`. Did the title change? Nest that title under the primary key and `mergeDeep`.

Over time, 95% of the reducers I wrote really only had one action, which was essentially a wrapper for `mergeDeep`. The only problem is that `mergeDeep` will never remove anything, so `remove` is a way to delete any arbitrary path in the state tree.

`load` is the final piece, and came from working on real-time apps where staying in sync with the server is important. The way I implemented this was to check the state [`hashCode`](https://facebook.github.io/immutable-js/docs/#/Map/hashCode) against the server's computed `hashCode`, and if they didn't match, the server would send down a current version of the state. `load` was an easy way to accomplish this.




