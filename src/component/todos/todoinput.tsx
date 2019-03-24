import React from 'react'
import { Input, Icon} from 'antd'

interface ITodeInputState {
  description: string
}

interface ITodeInputProps {
  addTodo: (params: any) => void
}

export default class TodoInput extends React.Component<ITodeInputProps, ITodeInputState> {
  constructor(props: any){
    super(props)
    this.state = {
      description: ''
    }
  }

  public input = (e: any) => {
    this.setState({
      description: e.target.value
    })
  }

  public onKeyUp = (e: any) => {
    if(e.keyCode === 13 && this.state.description !== ''){
      this.addTodo()
      console.log('enter')
    }
  }

  public addTodo = () => {
    this.props.addTodo({description: this.state.description})
    this.setState({description: ''})
  }

  public render(){
    const { description } = this.state;
    const suffix = description ? <Icon type="enter" onClick={this.addTodo}/> : <span />;
    return (
      <Input
        placeholder="开始一项新计划"
        suffix={suffix}
        onChange={this.input}
        value={description}
        onKeyUp={this.onKeyUp}
      />
    )
  }
}