import authContext from "@/contexts/auth/context";
import { useContext } from "react";

const useAuth = () => {
    const context = useContext(authContext);
    return context;
}

export default useAuth;