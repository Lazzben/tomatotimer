import React from 'react'
import { Button, Input } from 'antd';
import axios from '../config/axios'

interface IStateISomeComponentState {
  account: string,
  password: string,
  password_conformation: string
}

export default class Signup extends React.Component<{}, IStateISomeComponentState> {
  constructor(props: any) {
    super(props)
    this.state = {
      account: '',
      password: '',
      password_conformation: ''
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

  public onChangePasswordConformation = (e: any) => {
    this.setState({password_conformation: e.target.value})
  }

  public submit = async () => {
    const {account, password, password_conformation} = this.state
    try{
      await axios.post('sign_up/user', {
        account, 
        password, 
        password_confirmation: password_conformation
      })
    }catch(e){
      throw new Error(e)
    }
  }

  public render(){
    const {account, password, password_conformation} = this.state
    return(
      <div>
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
        <Input.Password 
          placeholder="重复密码"
          value={password_conformation}
          onChange={this.onChangePasswordConformation}
        />
        <Button type="primary" onClick={this.submit}>注册</Button>
      </div>
    )
  }
 
} 