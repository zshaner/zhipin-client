//主界面组件路由
import React,{Component} from 'react'
import {Route,Switch,Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import Cookies from 'js-cookie'  //可以操作前端cookie的对象  set()/get()/remove()
import {NavBar} from 'antd-mobile'

import {getRedirectTo} from '../../utils'
import {getUser} from '../../redux/actions'

import LaobanInfo from "../laoban-info/laoban-info";
import DashenInfo from "../dashen-info/dashen-info";
import Laoban from "../laoban/laoban"
import Dashen from "../dashen/dashen"
import Message from "../message/message"
import Personal from "../personal/personal"
import Notfound from "../../components/not-found/not-found"
import NavFooter from "../../components/nav-footer/nav-footer"



class Main extends Component{
    //给组件对象添加属性  static给组件类添加属性
    navList = [//包含所有导航组件的相关信息数据
        {
            path: '/laoban',
            component: Laoban,
            title: '大神列表',//标题
            icon: 'dashen',//图标
            text: '大神',//底部文本
        },
        {
            path: '/dashen',
            component: Dashen,
            title: '老板列表',
            icon: 'laoban',
            text: '老板',
        },
        {
            path: '/message', //路 由 路 径
            component: Message,
            title: '消息列表',
            icon: 'message',
            text: '消息',
        },
        {
            path: '/personal', //路 由 路 径
            component: Personal,
            title: '用户中心',
            icon: 'personal',
            text: '个人',
        }
    ]

    componentDidMount() {
        //登陆过（cookie中有userid），但没有登录(reduxe管理的user中没有_id)  发请求获取对应的user
        const userid = Cookies.get('userid')
        const {_id} = this.props.user
        if (userid && !_id){
            //console.log('发送ajax获取user');
            this.props.getUser()
        }
    }

    render() {
        //读取cookie中的userid
        const userid = Cookies.get('userid')
        //如果没有，自动重定向到登录界面
        if (!userid){
            return <Redirect to='/login'/>
        }
        //如果有，读取redux中的user状态
        const {user} = this.props
        //如果user没有_id，返回null（不做任何显示）
        if (!user._id){
            return null
        } else {
            //如果有_id，显示对应的界面
            //如果请求根路径，根据user的type和header来计算出一个重定向路由路径，并自动重定向
            let path = this.props.location.pathname
            if (path==='/'){
                path = getRedirectTo(user.type,user.header)
                return <Redirect to={path}/>
            }
        }

        const {navList} = this
        const pathname = this.props.location.pathname
        const currentNav = navList.find(nav => nav.path === pathname)

        if (currentNav){
            if (user.type == 'laoban'){
                //隐藏list的第2个
                navList[1].hide = true
            } else {
                //隐藏list的第1个
                navList[0].hide = true
            }
        }

        return(
            <div>
                {currentNav ? <NavBar className='stick-top'>{currentNav.title}</NavBar>:null}
                <Switch>
                    {
                        navList.map(nav => <Route path={nav.path} component={nav.component}></Route>)
                    }
                    <Route path="/laobaninfo" component={LaobanInfo}></Route>
                    <Route path="/dasheninfo" component={DashenInfo}></Route>
                    <Route component={Notfound}></Route>
                </Switch>
                {currentNav ? <NavFooter navList = {navList}/> :null}
            </div>
        )
    }
}

export default connect(
    state => ({user: state.user}),
    {getUser}
)(Main)

/*
1.实现自动登录
    1 componentDidMount()
    1) 登陆过（cookie中有userid），但没有登录(reduxe管理的user中没有_id)  发请求获取对应的user，

    2 render()
    2) 如果cookie中没有userID，自动进入login界面
    3) 判断redux管理的user中是否有_id，如果没有，暂时不做任何显示
    4) 如果有，说明已经登录，显示对应的界面
    5) 如果已经登录，如果请求根路径  根据user的type和header来计算出一个重定向路由路径，并自动重定向

*/