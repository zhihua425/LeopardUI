import Cookies from 'js-cookie'


const TokenKey = 'Admin-Token'
//token
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}


//key
export function getKey(key) {
  return Cookies.get(key)
}

export function setKey(key,newKey) {
  return Cookies.set(key, newKey)
}

export function removeKey(key) {
  return Cookies.remove(key)
}


