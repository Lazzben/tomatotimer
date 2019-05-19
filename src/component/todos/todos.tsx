import React from 'react'
import Todoinput from './todoinput'
import Todoitem from './todoitem'
import axios from 'src/config/axios'
import { connect } from 'react-redux'
import { updateTodo } from 'src/redux/reducers/action'

import './todo.scss'

class Todos extends React.Component<any> {
  constructor(props: any){
    super(props)
  }

  public updateTodo = async (id: number, params: any) => {
    try{
      const response = await axios.put(`todos/${id}`, params)
      this.props.updateTodo(response.data.resource)
    }catch(e){
      throw new Error(e)
    }
  }

  public get unDeletedTodos(){
    return this.props.todos.filter((t:any) => !t.deleted)
  }

  public get unCompletedTodos(){
    return this.unDeletedTodos.filter((t:any) => !t.completed)
  }

  public get completedTodos(){
    return this.props.todos.filter((t:any) => t.completed)
  }

  public render(){
    return(
      <div className='todos' id='todos'>
        <Todoinput/>
        <div className="todolist">
          {
            this.unCompletedTodos.map( (todo:any) => {
              return <Todoitem key={todo.id} {...todo}/>
            })
          }
          {
            this.completedTodos.map( (todo:any) => {
              return <Todoitem key={todo.id} {...todo}/>
            })
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  todos: state.todos,
  ...ownProps
})

const mapDispatchToProps = {
  updateTodo
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Todos)