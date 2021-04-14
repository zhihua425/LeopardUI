// collection.js
import {
  getKey,
  setKey
} from '@/utils/auth'
import axios from 'axios'
import Urls from '@/utils/urls'

const state = {
  getDataUrl: Urls.uris,
  percentage: 0,

}
const getters = {

}
const mutations = {
  setProgress(state, pro) {
    state.percentage = pro.substr(0, pro.length -1) * 1;
  }

}
const actions = {
  convert({
    commit
  }, videoInfo) {
    const key = getKey('acceessKey') + ',' + getKey('secretKey');
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
              resolve(data.id);
              setKey('videoId', data.id)
            } else {
              reject(data.error)
            }
          }

        })
        .catch((err) => {
          console.log(err)
        })
    }).catch((e) => {})

  },
  //进度
  progress({
    commit
  }, item) {
    // return new Promise((resolve, reject) => {
    axios.get(state.getDataUrl.videoProgress + '/' + item)
      // axios.get(state.getDataUrl.videoProgress ,{params:{id:item}})
      .then((res) => {
        if (res.status == 200) {
          const data = res.data;
          commit("setProgress", data.progress);
          // if (data.progress) {
          //   resolve(data.progress);
          // } else {
          //   reject(res.data.error)
          // }
        }

      })
      .catch((err) => {
        console.log(err)
      })
    // }).catch((e) => {})
  }



}
export default {
  namespaced: true, // 用于在全局引用此文件里的方法时标识这一个的文件名
  state,
  getters,
  mutations,
  actions
}