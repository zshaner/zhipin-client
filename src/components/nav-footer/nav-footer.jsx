import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {TabBar} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
const Item = TabBar.Item
//希望在非路由组件中使用路由库的api
//withRouter()
class NavFooter extends Component{
    static propTypes = {
        navList: PropTypes.array.isRequired
    }
    render() {
        let {navList} = this.props
        //过滤之后的navList
        navList = navList.filter(nav => !nav.hide==true)
        const pathname = this.props.location.pathname //路由组件才有location这个属性，请求的path
        return(
            <div className='am-tab-bar'>
                <TabBar>
                    {
                        navList.map((nav) => (
                            <Item key={nav.path}
                                  title={nav.text}
                                  icon={{uri:require(`./images/${nav.icon}.png`)}}
                                  selectedIcon={{uri:require(`./images/${nav.icon}-selected.png`)}}
                                  selected={pathname===nav.path}
                                  onPress={()=>this.props.history.replace(nav.path)}
                            />
                        ))
                    }
                </TabBar>
            </div>
        )
    }
}
//向外暴露withRouter()包装的组件
// 内部会向组件中传入一些路由组件特有的属性：history、location、math
export default withRouter(NavFooter)