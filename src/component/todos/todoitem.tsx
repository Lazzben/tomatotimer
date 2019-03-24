import React from 'react'
import {Checkbox, Icon} from 'antd'
import classNames from 'classnames'

import './todoitems.scss'

interface ITodoitemProps {
  id: number,
  description: string,
  completed: boolean,
  editing: boolean,
  updateTodo: (id: number, params: any) => void,
  turnToEdit: (id: number) => void  
}

interface ITodoitemState {
  eidttext: string
}

export default class Todoitem extends React.Component<ITodoitemProps, ITodoitemState> {
  constructor(props: any){
    super(props)
    this.state = {
      eidttext: this.props.description
    }
  }
  
  public updateTodo = (params: any) => {
    this.props.updateTodo(this.props.id, params)
  } 

  public turnToEdit = () => {
    this.props.turnToEdit(this.props.id)
  }

  public onKeyUp = (e:any) => {
    if(e.keyCode === 13 && this.state.eidttext !== ''){
      this.updateTodo({description: this.state.eidttext})
    }
  }

  public render(){
    const editing = (
      <div className="editing">
        <input type="text" 
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
      <span onDoubleClick={this.turnToEdit}>{this.props.description}</span>
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