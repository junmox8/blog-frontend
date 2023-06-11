import Axios from "./index";
export const getLoginBgc = async () => {
  return Axios.get("/bgc/bingpic");
};
export const getLoginWord = async () => {
  return Axios.get("/word");
};
export const register = async (username, password) => {
  return Axios.post("/api/user/register", {
    username,
    password,
  });
};
export const login = async (username, password) => {
  return Axios.post("/api/user/login", {
    username,
    password,
  });
};