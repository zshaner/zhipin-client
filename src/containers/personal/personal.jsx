/*个人中心路由容器组件*/
import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Result, List, WhiteSpace, Button,Modal} from 'antd-mobile'
import Cookies from 'js-cookie'
import {resetUser} from '../../redux/actions'

const Item = List.Item
const Brief = Item.Brief

class Personal extends Component{
    Logout= () => {
        Modal.alert('退出','确定退出登录吗？',[
            {
                text:'取消',
            },
            {
                text:'确定',
                onPress: ()=>{
                    //干掉cookie中的userid
                    Cookies.remove('userid')
                    //干掉redux中的user
                    this.props.resetUser()
                }
            }
        ])
    }

    render() {
        const {username,type,header,info,company,post,salary} = this.props.user
        return(
            <div>
                <Result
                    img={<img src={require(`../../assets/images/${header}.png`)} style={{width: 50}} alt="header"/>}
                    title={username}
                    message={company}
                />
                <List renderHeader={() => '相关信息'}>
                    <Item multipleLine>
                        <Brief>职位: {post}</Brief>
                        {info ? <Brief>简介: {info}</Brief> :null}
                        {salary ? <Brief>薪资: {salary}</Brief> :null}
                    </Item>
                </List>
                <WhiteSpace/>
                <List>
                    <Button type='warning' onClick={this.Logout}>退出登录</Button>
                </List>

            </div>
        )
    }
}

export default connect(
    state => ({user:state.user}),
    {resetUser}
)(Personal)