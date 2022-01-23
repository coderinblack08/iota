import axios from "axios";
import { API_URL } from "./constants";

export const defaultMutationFn = async ([path, body, method = "POST"]: [
  string,
  any,
  "POST" | "PUT" | "PATCH" | "DELETE"
]) => {
  const r = await axios(API_URL + path, {
    method,
    data: body,
    headers: {
      "content-type": "application/json",
    },
    withCredentials: true,
  });
  if (!(r.status >= 200 && r.status < 300)) {
    throw new Error(r.data);
  }
  return r.data;
};
