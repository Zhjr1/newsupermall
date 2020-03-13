import axios from 'axios'

export function request(config) {
    //创建一个实例
        const instance = axios.create({
        baseURL:'http://123.207.32.32:8000/api/wh',
        timeout:10000
    })
    //2.axios的拦截器
    //发送成功与否
    instance.interceptors.request.use(config =>{
        // console.log(config);
        //这里可以加入动画(请求图标)
        return config
    },err =>{
        console.log(err);
    })
    //响应拦截
    instance.interceptors.response.use(res =>{
        // console.log(res);
        return res.data
    },err=>{
        console.log(err);
    })
    return instance(config);  //instance本身就是一个promise，第二个好理解
}