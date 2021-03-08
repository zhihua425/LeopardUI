import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'

import doc from '@/store/modules/doc'
import video from '@/store/modules/video'
import picture from '@/store/modules/picture'
import setUp from '@/store/modules/setUp'
Vue.use(Vuex)


let store = new Vuex.Store({
  modules: {
    user,
    doc,
    video,
    picture,
    setUp
    
  },
})
export default store