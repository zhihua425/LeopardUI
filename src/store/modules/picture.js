// collection.js
import {
  getKey,setToken
} from '@/utils/auth'
import axios from 'axios'
import Urls from '@/utils/urls'
const state = {
  getDataUrl: Urls.uris,
  

}
const getters = {

}
const mutations = {

 


}
const actions = {

  convert({
    commit
  }, imageInfo) {
    const key = getKey('acceessKey') + ',' + getKey('secretKey');
    return new Promise((resolve, reject) => {
      axios.post(state.getDataUrl.imageConvert,
          imageInfo, {
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
              setToken('imageId', data.id)
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