import React from 'react'
import axios from 'src/config/axios'
import {Menu, Dropdown, Icon} from 'antd'
import history from 'src/config/history'
import Todos from '../todos/todos'
import { initTodos, initTomato } from 'src/redux/reducers/action' 
import { connect } from 'react-redux'

import './home.scss'
import Tomatoes from '../tomatoes/tomatoes'
import Statistics from '../statistics/statistics'



interface IState {
  user: {
    account: any
  }
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

class Home extends React.Component<any, IState> {
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
    await this.getTodo()
    await this.getTomatoes()
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


  public getTodo = async () => {
    try{
      const response = await axios.get('todos')
      const todos =  response.data.resources.map( (t: any) => {
        return Object.assign({}, t, {editing: false})
      })
      this.props.initTodos(todos)
    }catch(e){
      throw new Error(e)
    }
  }

  public getTomatoes = async () => {
    try{
      const response = await axios.get('tomatoes')
      this.props.initTomato(response.data.resources)
    }catch(e){
      throw new Error(e)
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
        <Tomatoes/>
        <Todos/>
      </main>
      <Statistics/>
    </div>
    )
  }
  
} 

const mapDispatchToProps = {
  initTodos,
  initTomato
}

const mapStateToProps = (state:any, ownProps:any) => ({
  ...ownProps
})

export default connect(mapStateToProps,mapDispatchToProps)(Home)