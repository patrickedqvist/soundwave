import { AxiosError } from "axios";


function isAxiosError(arg: any): arg is AxiosError {
  return arg.response !== undefined;
}

export default isAxiosError;
