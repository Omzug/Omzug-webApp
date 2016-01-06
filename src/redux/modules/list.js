/**
 * Created by hanwencheng on 1/6/16.
 */

export const GETLIST = 'main/list/GETLIST';

export function getList() {
  return {
    type: GETLIST
  };
}

const initState = {
  list: []
};

export default function reducer(state = initState, action = {}) {
  switch (action.type) {
    case GETLIST :
      return {
        ...state,
        list: {
          a: 'good',
          b: 'bad'
        }
      };
    default : return state;
  }
}
