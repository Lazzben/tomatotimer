import React from 'react'
import Todoinput from './todoinput'
import Todoitem from './todoitem'
import axios from 'src/config/axios'

import './todo.scss'

interface ItodosState {
  todos: any[];
}

export default class Todos extends React.Component<any, ItodosState> {
  constructor(props: any){
    super(props)
    this.state = {
      todos: []
    }
  }

  public addTodo = async (params: any) => {
    const {todos} = this.state
    try{
      const response = await axios.post('todos', params)
      this.setState({todos: [response.data.resource,...todos]})
    }catch(e){
      throw new Error(e)
    }
  }

  public componentDidMount(){
    this.getTodo()
  }

  public getTodo = async () => {
    try{
      const response = await axios.get('todos')
      const todos =  response.data.resources.map( (t: any) => {
        return Object.assign({}, t, {editing: false})
      })
      this.setState({todos})
    }catch(e){
      throw new Error(e)
    }
  }

  public updateTodo = async (id: number, params: any) => {
    const {todos} = this.state
    try{
      const response = await axios.put(`todos/${id}`, params)
      const newtodos = todos.map(todo => {
        if(todo.id === id){
          return response.data.resource
        }else{
          return todo
        }
      })
      this.setState({todos: newtodos})
    }catch(e){
      throw new Error(e)
    }
  }

  public turnToEdit = (id: number) => {
    const {todos} = this.state
    const newtodos = todos.map(t => {
      if(t.id === id){
        return Object.assign({}, t, {editing: true})
      }else{
        return Object.assign({}, t , {editing: false})
      }
    })
    this.setState({todos: newtodos})
  }

  public get unDeletedTodos(){
    return this.state.todos.filter((t:any) => !t.deleted)
  }

  public get unCompletedTodos(){
    return this.unDeletedTodos.filter((t:any) => !t.completed)
  }

  public get completedTodos(){
    return this.state.todos.filter((t:any) => t.completed)
  }

  public render(){
    return(
      <div className='todos' id='todos'>
        <Todoinput addTodo={(params) => this.addTodo(params)}/>
        <div className="todolist">
          {
            this.unCompletedTodos.map( (todo:any) => {
              return <Todoitem key={todo.id} {...todo} updateTodo={this.updateTodo} turnToEdit={this.turnToEdit}/>
            })
          }
          {
            this.completedTodos.map( (todo:any) => {
              return <Todoitem key={todo.id} {...todo} updateTodo={this.updateTodo} turnToEdit={this.turnToEdit}/>
            })
          }
        </div>
      </div>
    )
  }
}