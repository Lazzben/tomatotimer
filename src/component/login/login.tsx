import React from 'react';
import { Button, Input } from 'antd';
import axios from 'src/config/axios';
import { Link } from 'react-router-dom';

import './login.scss'

interface IStateISomeComponentState {
  account: string,
  password: string,
}

interface IRouter {
  history: any
}

export default class Login extends React.Component<IRouter, IStateISomeComponentState> {
  constructor(props: any) {
    super(props)
    this.state = {
      account: '',
      password: '',
    }
  }

  public onChangeUserName = (e: any) => {
    this.setState({account: e.target.value})
  }

  public emitEmpty = () => {
    this.setState({ account: '' });
  }

  public onChangePassword = (e: any) => {
    this.setState({password: e.target.value})
  }

  public submit = async () => {
    const {account, password,} = this.state
    try{
      await axios.post('sign_in/user', {
        account, 
        password, 
      })
      this.props.history.push('/index')
    }catch(e){
      throw new Error(e)
    }
  }

  public render(){
    const {account, password,} = this.state
    return(
      <div className="login" id="login">
        <h1>小黄闹钟登录</h1>
        <Input 
          placeholder="输入用户名"
          value={account}
          onChange={this.onChangeUserName}
        />
        <Input.Password 
          placeholder="输入密码"
          value={password}
          onChange={this.onChangePassword}
        />
        <Button type="primary" onClick={this.submit} block={true}>登录</Button>
        <p>如果没有账号，请 <Link to="/signUp">注册</Link></p>
      </div>
    )
  }
 
} 