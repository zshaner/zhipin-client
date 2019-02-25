/*
使用axios封装的ajax请求函数
函数返回的是promise对象
*/

import axios from 'axios'

export default function ajax(url = '', data = {}, type = 'GET') {
    if (type==='GET'){
        //准 备 url query 参 数 数 据
        let dataStr = '' // 数 据 拼 接 字 符 串
        Object.keys(data).forEach(key => {
            dataStr += key + '=' + data[key] + '&'
        })
        if (dataStr !== '') {
            dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
            url = url + '?' + dataStr
        }
    // 发 送 get 请 求
        return axios.get(url)
    }else {
        //发 送 post 请 求
        return axios.post(url, data) // data:包 含 请 求 体 数 据 的 对 象
    }
}