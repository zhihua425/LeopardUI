// let basic = "http://121.36.140.205:10123";
// import config from '@/config';
import config from '../../public/config';
const basic = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro
let doc = "/api/doc/";
let image = "/api/image/";
let video = "/api/video/";
const uris = {
  // login: basic + user + "login",
  //创建视频转码任务API
  videoConvert: basic + video + 'convert',
  //创建图⽚转码任务API
  imageConvert: basic + image + 'convert',
  //创建⽂档转码任务API
  docConvert: basic + doc + 'convert',
};
export default {
  namespaced: true, // 用于在全局引用此文件里的方法时标识这一个的文件名
  uris
};
