import React from 'react'
import { Input, Icon } from 'antd'
import { connect } from 'react-redux'
import { addTodo } from 'src/redux/reducers/action'
import axios from 'src/config/axios'

interface ITodeInputState {
  description: string
}

interface ITodeInputProps {
  addTodo: (params: any) => {}
}

class TodoInput extends React.Component<ITodeInputProps, ITodeInputState> {
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
      this.postTodo()
    }
  }

  public postTodo = async () => {
    try{
      const response = await axios.post('/todos', {description: this.state.description})
      this.props.addTodo(response.data.resource)
      this.setState({description: ''})
    }catch(e){
      throw new Error(e)
    }
  }

  public render(){
    const { description } = this.state;
    const suffix = description ? <Icon type="enter" onClick={this.postTodo}/> : <span />;
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

const mapStateToProps = (state: any, ownProps: any) => ({
  ...ownProps
})

const mapDispatchToProps = {
  addTodo
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoInput)
