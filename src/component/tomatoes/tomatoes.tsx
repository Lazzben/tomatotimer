import React from 'react'
import Starttomato from './starttomato'
import { connect } from 'react-redux'
import { addTomato, initTomato, updatetomato} from 'src/redux/reducers/action'
import axios from 'src/config/axios'

import './tomatoes.scss'

class Tomatoes extends React.Component<any> {
  constructor(props:any){
    super(props)
  }

  public componentDidMount(){
    this.getTomatoes()
  }

  public startTomato = async () => {
    try{
      const response = await axios.post('tomatoes', {duration: 600000})
      this.props.addTomato(response.data.resource)
    }catch(e){
      throw new Error(e)
    }
  }

  public getTomatoes = async () => {
    try{
      const response = await axios.get('tomatoes')
      this.props.initTomato(response.data.resources)
      console.log(response.data.resources)
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

  public render(){
    return(
      <div className="tomatoes" id="tomatoes">
        <Starttomato startTomato={this.startTomato} unfinishedTomatoes={this.unfinishedTomatoes} updatetomato={this.updatetomato}/>
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
  initTomato,
  updatetomato
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tomatoes)