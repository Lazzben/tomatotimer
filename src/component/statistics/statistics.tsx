import React from 'react'
import {connect} from 'react-redux'
import './statistics.scss'
import Polygon from './polygon'
import {format} from 'date-fns'
import _ from 'lodash'
import Todohistory from './todohistory/todohistory'

interface IStattisticsProps {
  todos: any[]
}

class Statistics extends React.Component<IStattisticsProps> {
  constructor(props: any){
    super(props)
  }

  get finishedTodos(){
    return this.props.todos.filter((t:any) => t.completed && !t.deleted)
  }

  get dailyTodos(){
    const obj = _.groupBy(this.finishedTodos,(todo)=>{
      return format(todo.updated_at, "YYYY-MM-D")
    })
    return obj
  }

  public render(){
    return(
      <div className='statistics' id='statistics'>
        <ul>
          <li>统计</li>
          <li>目标</li>
          <li>番茄历史</li>
          <li>
            任务历史
            累计完成{this.finishedTodos.length}个任务
            <Polygon data={this.dailyTodos} TotalFinishedCount={this.finishedTodos.length}/>
          </li>
        </ul>
        <Todohistory/>
      </div>
    )
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  todos: state.todos,
  ...ownProps
})

export default connect(mapStateToProps)(Statistics)