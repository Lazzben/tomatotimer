import React from 'react'
import Starttomato from './starttomato'
import Tomatolist from './tomatolist'
import { connect } from 'react-redux'
import { addTomato, updatetomato} from 'src/redux/reducers/action'
import axios from 'src/config/axios'
import _ from 'lodash'
import {format} from 'date-fns'

import './tomatoes.scss'

class Tomatoes extends React.Component<any> {
  constructor(props:any){
    super(props)
  }

  public startTomato = async () => {
    try{
      const response = await axios.post('tomatoes', {duration: 600000})
      this.props.addTomato(response.data.resource)
    }catch(e){
      throw new Error(e)
    }
  }

  public updatetomato = (payload: any) => {
    this.props.updatetomato(payload)
  }

  public get unfinishedTomatoes (){
    return this.props.tomatoes.filter( (t:any) => !t.description && !t.ended_at && !t.aborted)[0]
  }

  public get finishedTomatoes (){
    const finishedtomatos =  this.props.tomatoes.filter( (t:any) => t.description && t.ended_at && !t.aborted)
    const obj = _.groupBy(finishedtomatos, (tomato)=>{
      return format(tomato.started_at, 'YYYY-MM-D')
    })
    return obj
  }

  public render(){
    return(
      <div className="tomatoes" id="tomatoes">
        <Starttomato startTomato={this.startTomato} unfinishedTomatoes={this.unfinishedTomatoes} updatetomato={this.updatetomato}/>
        <Tomatolist finishedtomatoes={this.finishedTomatoes}/>
      </div>
    )
  }
}

const mapStateToProps = (state:any, ownProps: any) => ({
  tomatoes: state.tomatoes,
  ownProps
})

const mapDispatchToProps = {
  addTomato,
  updatetomato
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tomatoes)