import { FC, useCallback, useMemo, useReducer } from 'react';
import authContext from './context';
import initialState from './initialState';
import { ActionTypes } from './interface';
import authReducer from './reducer';

const AuthProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const SaveAuthentication = useCallback((auth) => {
    dispatch({ type: ActionTypes.SaveAuthState, payload: { auth } });
  }, []);

  const value = useMemo(
    () => ({
      ...state,
      SaveAuthentication,
    }),
    [state, SaveAuthentication]
  );

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

export default AuthProvider;
