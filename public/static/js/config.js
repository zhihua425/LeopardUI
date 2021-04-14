// export default {
  window.config = {
    /**
     * @description api请求基础路径
     */
    baseUrl: {
      dev: 'http://192.168.50.243:31110',
      pro: 'http://192.168.50.243:31110',
    },
    /**
     * @description cas重定向地址
     */
    redirectUrl: {
      // login:window.location.origin + "/login",
      login:"http://192.168.50.243:21506/login",
      logout:"http://192.168.50.243/logout",
    }
    
  }
  