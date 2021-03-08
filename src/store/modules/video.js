// collection.js
import axios from 'axios'
import Urls from '@/utils/urls'
const state = {
  getDataUrl: Urls,
 

}
const getters = {

}
const mutations = {

  setTop10Xl(state, data) {
    state.top10Xl = data;
  },


}
const actions = {

  async getSpeechAnalysisTable(context, item) {
    try {
      const response = await axios.get(state.getDataUrl.create, {
        params: {
          sort: item,
        }
      });
      let data = response.data
      if (data.code === 200) {
      }
    } catch (error) {
      console.error(error);
    }

  },



}
export default {
  namespaced: true, // 用于在全局引用此文件里的方法时标识这一个的文件名
  state,
  getters,
  mutations,
  actions
}