import React from 'react'
import axios from 'src/config/axios'
import {Menu, Dropdown, Icon} from 'antd'
import history from 'src/config/history'
import Todos from '../todos/todos'

import './home.scss'

interface IState {
  user: {
    account: any
  }
}

interface IRouter {
  history: any
}

const handleCancel = () => {
  localStorage.setItem('x-token', '')
  history.push('/login')
}

const menu = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer"><Icon type="user"/> 个人设置</a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" onClick={handleCancel}><Icon type="logout"/> 注销</a>
    </Menu.Item>
  </Menu>
);

export default class Home extends React.Component<IRouter, IState> {
  constructor(props: any){
    super(props)
    this.state = {
      user: {
        account: ''
      }
    }
  }
  
  public async componentWillMount(){
    await this.getme()
  }

  public getme = async() => {
    try{
      const response = await axios.get('me')
      this.setState({
        user: {
          account: response.data.account
        }
      })
    }catch(e){
      // console.log(e.response)
      // console.error('获取用户失败')
      // if(e.response.status === 401){
      //   this.props.history.push('/login')
      // }
      
    }
  }

  public render(){
    return(
    <div className="home" id="home">
      <header>
        <span className="logo">小黄的番茄时钟</span>
        <Dropdown overlay={menu}>
          <a className="ant-dropdown-link" href="#">
            {this.state.user.account} <Icon type="down" />
          </a>
        </Dropdown>
      </header>
      <main>
        <Todos/>
      </main>
    </div>
    )
  }
  
} 