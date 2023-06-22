import createAxios from "../index";
export const getLoginBgc = async () => {
  return createAxios({
    url: '/bgc/bingpic',
    method: 'get'
  })
};
export const getLoginWord = async () => {
  return createAxios({
    url: '/word',
    method: 'get'

  })
};
export const register = async (username, password) => {
  return createAxios({
    url: '/api/user/register',
    method: 'post',
    data: {
      username,
      password,
    }
  })
};
export const login = async (username, password) => {
  return createAxios({
    url: '/api/user/login',
    method: 'post',
    data: {
      username,
      password,
    }
  })
};