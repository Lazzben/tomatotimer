import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import {format} from 'date-fns'
import { Tabs } from 'antd';
import './todohistory.scss'
import Todohistorytodoitem from './todohistorytodoitem'

const TabPane = Tabs.TabPane


class Todohistory extends React.Component<any> {
  get finishedTodos(){
    return this.props.todos.filter((t:any)=> t.completed && !t.deleted)
  }

  get deletedTodos(){
    return this.props.todos.filter((t:any) => t.deleted)
  }

  get dailyFinishedTodos(){
    return _.groupBy(this.finishedTodos, (todo)=>{
      return format(todo.updated_at, "YYYY-MM-D")
    })
  }

  
  get finisheddates(){
    return Object.keys(this.dailyFinishedTodos).sort( (a,b) => Date.parse(b) - Date.parse(a) )
  }

  public render (){
    const finishedTodoList = this.finisheddates.map(date => {
      return(
        <div key={date} className="dailytodo">
          <div className="summary">
            <p className="date">
              <span>{date}</span>
              <span>周五</span>
            </p>
            <p className="finishedcount">完成了{this.dailyFinishedTodos[date].length}个任务</p>
          </div>
          <div className="todolist">
            {
              this.dailyFinishedTodos[date].map(todo => <Todohistorytodoitem key={todo.id} todo={todo} itemtype="finished"/>)
            }
          </div>
        </div>
      )
            
    })

    const deletedTodoList = this.deletedTodos.map((todo:any) => {
      return(
          <Todohistorytodoitem key={todo.id} todo={todo} itemtype="deleted"/>
      )
            
    })
    return (
      <Tabs defaultActiveKey="1">
        <TabPane tab="已完成任务" key="1">
          <div className="todohistory" id="todohistory">
            {
              finishedTodoList
            }
          </div>
        </TabPane>
        <TabPane tab="已删除任务" key="2">
          <div className="todohistory" id="todohistory">
            {
              deletedTodoList
            }
          </div>
        </TabPane>
      </Tabs>
    )
  }
}

const mapStateToProps = (state:any, ownProps:any) => ({
  todos: state.todos,
  ...ownProps
})

export default connect(mapStateToProps)(Todohistory)
