import { createContext } from "react";

import initialState from "./initialState";

const authContext = createContext(initialState)

export default authContext;