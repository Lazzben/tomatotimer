import React from 'react'
import './todohistorytodoitem.scss'
import _ from 'lodash'
import {format} from 'date-fns'
import {connect} from 'react-redux'
import {updateTodo} from 'src/redux/reducers/action'
import axios from 'src/config/axios'

interface Itodohistorytodoitemprops {
  todo: any,
  itemtype: string,
  updateTodo: (payload:any)=>void
}



class Todohistorytodoitem extends React.Component<Itodohistorytodoitemprops> {
  public updateTodo = async(params:any)=>{
    try{
      const response = await axios.put(`todos/${this.props.todo.id}`,params)
      this.props.updateTodo(response.data.resource)
    }catch(e){
      throw new Error(e)
    }
  }
  public render(){
    let action
    let geshi
    let time
    if (this.props.itemtype === "finished"){
      geshi = "HH:mm"
      time = this.props.todo.updated_at
      action = (
        <div className="action">
          <span onClick={()=>this.updateTodo({completed:false})}>恢复</span>
          <span onClick={()=>this.updateTodo({deleted:true})}>删除</span>
        </div>
      )
    }else if(this.props.itemtype === "deleted"){
      geshi = "YYYY-MM-DD"
      time = this.props.todo.created_at
      action = (
        <div className="action">
          <span onClick={()=>this.updateTodo({deleted:false})}>恢复</span>
        </div>
      )
    }
    return(
      <div className="todohistorytodoitem" id="todohistorytodoitem">
        <div className="text">
          <span className="time">{format(time,geshi)}</span>
          <span className="description">{this.props.todo.description}</span>
        </div>
        <div className="action">
          {action}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state:any, ownProps:any) => ({
  ...ownProps
})

const mapDispatchToProps = {
  updateTodo
}

export default connect(mapStateToProps,mapDispatchToProps)(Todohistorytodoitem)