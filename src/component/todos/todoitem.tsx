import React from 'react'
import {Checkbox, Icon} from 'antd'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { editTodo, updateTodo } from 'src/redux/reducers/action'
import axios from 'src/config/axios'

import './todoitems.scss'

interface ITodoitemProps {
  id: number,
  description: string,
  completed: boolean,
  editing: boolean,
  updateTodo: (params: any) => any,
  editTodo: (id: number) => any  
}

interface ITodoitemState {
  eidttext: string
}

class Todoitem extends React.Component<ITodoitemProps, ITodoitemState> {
  constructor(props: any){
    super(props)
    this.state = {
      eidttext: this.props.description
    }
  }
  

  public updateTodo = async (params: any) => {
    if(params.completed){
      params.completed_at = new Date()
    }
    try{
      const response = await axios.put(`todos/${this.props.id}`, params)
      this.props.updateTodo(response.data.resource)
    }catch(e){
      throw new Error(e)
    }
  }

  public editTodo = () => {
    this.props.editTodo(this.props.id)
  }

  public onKeyUp = (e:any) => {
    if(e.keyCode === 13 && this.state.eidttext !== ''){
      this.updateTodo({description: this.state.eidttext})
    }
  }


  public render(){
    const editing = (
      <div className="editing">
        <input
          type="text"
          value={this.state.eidttext} 
          onChange={e => this.setState({eidttext: e.target.value})}
          onKeyUp={this.onKeyUp}
        />
        <div className="option">
          <Icon type="enter" onClick={()=>{
            if(this.state.eidttext !== ''){
              this.updateTodo({description: this.state.eidttext})
            }
          }}/>
          <Icon type="delete" theme="filled" onClick={() => this.updateTodo({deleted: true})}/>
        </div>
      </div>
    )

    const text = (
      <span onDoubleClick={this.editTodo}>{this.props.description}</span>
    )

    const todoitemclass = classNames({
      todoitem: true,
      editing: this.props.editing,
      completed: this.props.completed
    })
    return(
      <div className={todoitemclass} id="todoitem">
        <Checkbox 
          checked={this.props.completed}
          onChange={e => this.updateTodo({completed: e.target.checked})}
        />
        {this.props.editing ? editing : text}
      </div>
    )
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  ...ownProps
})

const mapDispatchToProps = {
  editTodo,
  updateTodo
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Todoitem)