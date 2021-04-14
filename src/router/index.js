import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login.vue'
import Layout from '../views/'


// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  
  {
    path: '/login',
    name: 'login',
    component: Login
  },
 
  
  {
    path: '/',
    component: Layout,
    redirect: {name: 'overview'}
    // name: 'storeAnalysisDetail',
    // component: StoreDataAnalysisDetail
  },
 
 
  {
    path: '/home',
    name: 'home',
    component: Layout,
    children: [
      {
        path: 'overview',
        component: () => import('@/views/components/overview'),
        name: 'overview',
        meta: { title: '', icon: 'overview', affix: true }
      },
      {
        path: 'setUp',
        component: () => import('@/views/components/setUp'),
        name: 'setUp',
        meta: { title: '', icon: 'setUp', affix: true }
      },
      {
        path: 'videos',
        component: () => import('@/views/components/video'),//音视频
        name: 'videos',
        meta: { title: '', icon: 'videos', affix: true }
      },
      {
        path: 'doc',
        component: () => import('@/views/components/doc'),//文档
        name: 'doc',
        meta: { title: '', icon: 'doc', affix: true }
      },
      {
        path: 'pictures',
        component: () => import('@/views/components/picture'),//picture
        name: 'pictures',
        meta: { title: '', icon: 'pictures', affix: true }
      },
     
    ]
  },
 
  

]


const router = new VueRouter({
  // mode: 'history',  //去掉url中的#
  routes
})

// router.beforeEach((to, from, next) => {
  // console.log('开始页面切换');
  // console.log(to.fullPath)
  // var tempId = Utils.getCookie('temp-id');
  // var userInfo = sessionStorage.getItem('ssm_u_info');
  // if(to.fullPath != '/login' && (tempId == null || tempId == '' || userInfo == null || userInfo == '')){
    // window.location.href = '/login';
  // }
//   next();
// });

export default router
