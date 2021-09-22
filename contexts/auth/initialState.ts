import type { State } from "./interface";

const initialState: State = {
    auth: null,
    loggedIn: false,
    SaveAuthentication: () => {}
};

export default initialState;
