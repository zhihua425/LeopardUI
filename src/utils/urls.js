// let basic = "http://121.36.140.205:10123";
// import config from '@/config';
// import   '../../public/static/config';
const basic = window.config.baseUrl.dev;
console.log(window.config)
let doc = "/api/doc/";
let image = "/api/image/";
let video = "/api/video/";
const uris = {
  // login: basic + user + "login",
  //创建视频转码任务API
  videoConvert: basic + video + 'convert',
  //获取视频转码进度
  videoProgress: basic + video + 'progress',
  //创建图⽚转码任务API
  imageConvert: basic + image + 'convert',
  //创建⽂档转码任务API
  docConvert: basic + doc + 'convert',
};
export default {
  namespaced: true, // 用于在全局引用此文件里的方法时标识这一个的文件名
  uris
};
