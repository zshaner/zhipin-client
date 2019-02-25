/*
包含n个action creator
异步action
同步action
*/
import {reqRegister,reqLogin,reqUpdateUser,reqUser} from '../api'
import {
    AUTH_SUCCESS,
    ERROR_MSG,
    RECEIVE_USER,
    RESET_USER
} from './action-types'

//授权成功的同步action
const authSuccess = (user) => ({type:AUTH_SUCCESS, data:user})
//错误提示的同步action
const errorMsg = (msg) => ({type:ERROR_MSG, data:msg})
//接受用户的同步action
const receiveUser = (user) => ({type:RECEIVE_USER, data:user})
//重置用户的同步action
export const resetUser = (msg) => ({type:RESET_USER, data:msg})

//注册异步action
export const register = (user) =>{
    const {username,password,password2,type} = user
    //表单提交前验证
    if (!username){
        return errorMsg('用户名不能为空')
    } else if(password!==password2){
        return errorMsg('2次密码不一致')
    }
    return async dispatch => {
        //发送注册的异步ajax请求
        const response = await reqRegister({username,password,type})
       /* const promise = reqRegister(user)
        promise.then(response => {
            const result = response.data //{code:0/1,data:user,msg:''}
        })*/
       const result = response.data
       if (result.code===0){//成功
            //分发成功的action
           dispatch(authSuccess(result.data))
       }else{
           dispatch(errorMsg(result.msg))
       }
    }
}

//登录异步action
export const login = (user) =>{
    const {username,password} = user
    //表单提交前验{username,password,type} 证
    if (!username){
        return errorMsg('用户名不能为空')
    } else if(!password){
        return errorMsg('密码不能为空')
    }
    return async dispatch => {
        //发送注册的异步ajax请求
        const response = await reqLogin({username,password} )
        /* const promise = reqLogin(user)
         promise.then(response => {
             const result = response.data //{code:0/1,data:user,msg:''}
         })*/
        const result = response.data
        if (result.code===0){//成功
            //分发成功的action
            dispatch(authSuccess(result.data))
        }else{
            dispatch(errorMsg(result.msg))
        }
    }
}


//更新用户异步action
export const updateUser = (user) => {
    return async dispatch => {
        const response = await reqUpdateUser(user)
        const result = response.data
        if (result.code===0) {//更新成功
            dispatch(receiveUser(result.data))
        }else {
            dispatch(resetUser(result.msg))
        }
    }

}

//获取用户异步action
export const getUser = () => {
    return async dispatch => {
        const response = await reqUser()
        const result = response.data
        if (result.code===0) {//成功
            dispatch(receiveUser(result.data))
        }else {
            dispatch(resetUser(result.msg))
        }
    }
}