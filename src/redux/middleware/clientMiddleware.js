/**
 * The function of this file
 *
 * 1.To allow the action creators access to the client API facade.
 *  Remember this is the same on both the client and the server,
 *  and cannot simply be imported because it holds the cookie
 *  needed to maintain session on server-to-server requests.
 *
 * 2.To allow some actions to pass a "promise generator",
 *  a function that takes the API client and returns a promise.
 *  Such actions require three action types, the REQUEST action
 *  that initiates the data loading, and a SUCCESS and FAILURE action
 *  that will be fired depending on the result of the promise.
 *  There are other ways to accomplish this, some discussed here,
 *  which you may prefer, but to the author of this example,
 *  the middleware way feels cleanest.
 **/
export default function clientMiddleware(client) {
  return ({dispatch, getState}) => {
    return next => action => {
      if (typeof action === 'function') {
        return action(dispatch, getState);
      }

      // then action is an array
      const { promise, types, ...rest } = action; // eslint-disable-line no-redeclare
      if (!promise) {
        return next(action);
      }

      const [REQUEST, SUCCESS, FAILURE] = types;
      next({...rest, type: REQUEST});
      return promise(client).then(
        (result) => next({...rest, result, type: SUCCESS}),
        (error) => next({...rest, error, type: FAILURE})
      ).catch((error)=> {
        console.error('MIDDLEWARE ERROR:', error);
        next({...rest, error, type: FAILURE});
      });
    };
  };
}
