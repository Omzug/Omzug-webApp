/**
 * Created by hanwencheng on 1/6/16.
 */

export const GETLIST = 'Nevermind/entities/GETLIST';

export function getList(number) {
  return {
    type: GETLIST,
    number : number
  };
}

const initState = {
  entities:[],
  touched : "bad",
  number : 0
};

export default function reducer(state = initState, action = {}) {
  switch (action.type) {
    case GETLIST :
      const number = state.number + action.number;
      return {
        touched : "good",
        number : number
      };
    default : return state;
  }
}
