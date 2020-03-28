import axios from 'axios'
import Qs from 'qs'


// axios配置
axios.defaults.baseURL = 'haige'//process.env.API_URL
axios.defaults.timeout = 0  // 响应时间
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'  // 配置POST请求头
axios.defaults.headers.delete['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'  // 配置delete请求头
axios.defaults.withCredentials = true  // 是否允许设置cookie
axios.interceptors.request.use(
    config => { 
        var method = config.method;
        if (method === 'post' || method === 'put' || method === 'delete') {
            config.data = Qs.stringify(config.data, { allowDots: true })
        }
        return config
    },
    err => {
        return Promise.reject(err)
    }           
)

 
  

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */
 function get(url,params={}){
    return new Promise((resolve,reject) => {
      axios({
          url: url,
          method: 'GET',
          params: params,
          transformRequest: [function (data) {
            let ret = ''
            for (let it in data) {
              ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
          }],
          })
          .then(res => {
              if(res.data.code == 1001){
                  this.$Message.warning('登录超时,' + res.data.message);
                  this.$router.push({path:'/'})
                  return
              }
              resolve(res.data);
          })
          .catch(err => {
              reject(err)
          })
    })
  }
  
  
  
   /**
    * from 表单
    */
    function get_from(URL, PARAMS) {
    var p = new Promise((resolve, reject) =>{        //做一些异步操作
      var temp = document.createElement("form");
      temp.action = URL;
      temp.method = "get";
      temp.style.display = "none";
      for (var x in PARAMS) {
        var opt = document.createElement("textarea");
        opt.name = x;
        opt.value = PARAMS[x];
        temp.appendChild(opt);
      }
      document.body.appendChild(temp);
      temp.submit();
      this.$Loading.finish();
      resolve(temp) 
    });
    return p;
  }
  
  /**
   * 上传 excel
   */
  
   function up_excel(URL, PARAMS) {
    return new Promise((resolve,reject) => {
      let token = this.$Cookies.get('token')
      let config = {
          headers: {
          'Content-Type': 'multipart/form-data'
          }
      }
      PARAMS.append('token', token)
  
      axios.post(URL, PARAMS, config)
        .then( res => {
          resolve(res.data)
        })
        .catch(err=>{
          reject(err)
        })
    })
  }


export default axios 