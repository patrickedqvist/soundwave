export enum ActionTypes {
    SaveAuthState = 'Auth/SaveAuthState',
    UpdateAccessToken = 'Auth/UpdateAccessToken',
    Logout = 'Auth/Logout'    
}

export interface AuthState {
  access_token: string;
  token_type: 'Bearer';
  expires_in: number;
  refresh_token: string;
  scope: string;
  expired_at: string;
}

export interface State {
  auth: AuthState | null;
  loggedIn: boolean;
  SaveAuthentication: (auth: AuthState) => void;
}

export interface SaveAuthStateAction {
  type: ActionTypes.SaveAuthState;
  payload: { auth: AuthState };
}

export interface LogoutAction {
  type: ActionTypes.Logout;
}

export type Action = SaveAuthStateAction | LogoutAction;