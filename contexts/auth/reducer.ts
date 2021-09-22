import type { State, Action } from './interface';
import { ActionTypes } from './interface';

const authReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionTypes.SaveAuthState:
      return {
        ...state,
        auth: {
          ...action.payload.auth,
        },
        loggedIn: true
      };

    default:
      return state;
  }
};

export default authReducer;
