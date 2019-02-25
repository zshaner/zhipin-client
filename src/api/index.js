/* 包 含 n 个 接 口 请 求 函 数 的 模 块
每 个 函 数 返 回 的 都 是 promise对 象
*/

import ajax from './ajax'

//请 求 借口
export const reqRegister = (user) => ajax('/register', user, 'POST')
// 请 求 借口
export const reqLogin = (user) => ajax('/login', user, 'POST')
// 更新用户借口
export const reqUpdateUser = (user) => ajax('/update', user, 'POST')
// 获取用户信息
export const reqUser = () => ajax('/user')

