// collection.js
import {
  getKey,setToken
} from '@/utils/auth'
import axios from 'axios'
import Urls from '@/utils/urls'
const state = {
  getDataUrl:  Urls.uris,
 

}
const getters = {

}
const mutations = {


}
const actions = {
  convert({
    commit
  }, videoInfo) {
    const key = getKey('acceessKey') + ',' + getKey('secretKey');
    console.log(key,videoInfo)
    return new Promise((resolve, reject) => {
      axios.post(state.getDataUrl.videoConvert,
          videoInfo, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'SRCKey': key,
              'DestKey': key
            }
          })
        .then((res) => {
          if (res.status == 200) {
            const data = res.data;
           
            if (data.id) {
              resolve();
              setToken('videoId', data.id)
            } else {
              reject(data.error)
            }
          }

        })
        .catch((err) => {
          console.log(err)
        })
    })

  }
  



}
export default {
  namespaced: true, // 用于在全局引用此文件里的方法时标识这一个的文件名
  state,
  getters,
  mutations,
  actions
}