// collection.js
import axios from 'axios'
// import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import common from '../../utils/urls'
const state = {
  getDataUrl: common.uris,
  activeIndex:"overview",
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  
}
const getters = {
  
}
const mutations = {
  changeActive: (state, token) => {
    state.activeIndex = token
  },
 

}
const actions = {
   // user login
   login({ commit }, userInfo) {
     const { username, password } = userInfo
     return new Promise((resolve, reject) => {
      axios.post(state.getDataUrl.login, JSON.stringify({
        username: username.trim(), password: password 
      }),
      {headers:{'Content-Type':'application/json'}})
      .then((res)=>{
        const { data } = res;
        if(data.resultCode == 1000){
          const tokens = data.resultData.token.value;
          setToken(tokens)
          commit('SET_TOKEN', tokens)
          resolve();
        }else{
          reject(data.resultMsg)
        }
      })
      .catch((err)=>{
        console.log(err)
      })
    })
 
  },

}
export default {
  namespaced: true, // 用于在全局引用此文件里的方法时标识这一个的文件名
  state,
  getters,
  mutations,
  actions
}
