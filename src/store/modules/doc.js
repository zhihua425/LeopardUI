// collection.js
import {
  getKey
} from '@/utils/auth'
import axios from 'axios'
import Urls from '@/utils/urls';
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
  }, docInfo) {
    const key = getKey('acceessKey') + ',' + getKey('secretKey');
    // const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      axios.post(state.getDataUrl.docConvert,
          docInfo, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'SRCKey': key,
              'DestKey': key
            }
          })
        .then((res) => {
          console.log(res)
          if (res.status == 200) {

            const {
              data
            } = res.data;
            if (data.id) {
              setToken(docId, data.id)
              resolve();
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