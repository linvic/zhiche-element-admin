//获得用户的cookie，export出去
import Cookies from 'js-cookie';

const TokenKey = 'Admin-Token';

const userName='userName';

const pwd='pwd';
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

//记住用户名

export function getUserName() {
  return Cookies.get(userName)
}

export function setUserName(name) {
  return Cookies.set(userName, name)
}

export function removeUserName() {
  return Cookies.remove(userName)
}

//记住密码

export function getPwd() {
  return Cookies.get(pwd)
}

export function setPwd(name) {
  return Cookies.set(pwd, name)
}

export function removePwd() {
  return Cookies.remove(pwd)
}