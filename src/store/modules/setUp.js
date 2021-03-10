// collection.js
import { getKey, setKey, removeKey } from '@/utils/auth'
import axios from 'axios'
import Urls from '@/utils/urls'
const state = {
  getDataUrl: Urls,
  // setForm:{
  //   ipPort:'',
  //   acceessKey:'',
  //   secretKey:''
  // }
  setForm:{
    acceessKey: getKey('acceessKey') ?  getKey('acceessKey') :"",
    secretKey:getKey('secretKey') ?  getKey('secretKey') :""
  }

}
const getters = {

}
const mutations = {
  setKey(state, data) {
    state.setForm = data;
    setKey('acceessKey',data.acceessKey)
    setKey('secretKey',data.secretKey)
  },


}
const actions = {

  


}
export default {
  namespaced: true, // 用于在全局引用此文件里的方法时标识这一个的文件名
  state,
  getters,
  mutations,
  actions
}