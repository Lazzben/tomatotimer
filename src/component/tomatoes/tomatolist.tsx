import React from 'react'
import { format } from 'date-fns'

import './tomatolist.scss'

interface ITomatolistProps {
  finishedtomatoes: any
}

class Tomatolist extends React.Component<ITomatolistProps> {
  constructor(props: any){
    super(props)
  }

  public get date(){
    return Object.keys(this.props.finishedtomatoes)
  }

  public tomatoitem = (tomato: any) => {
    return (
      <div className="tomatoitem" key={tomato.id}>
        <span className="time">{format(tomato.started_at,'HH:mm')} - {format(tomato.ended_at,'HH:mm')}</span>
        <span className="description">{tomato.description}</span>
      </div>
    )
  }

  public render(){
    const tomatolist = this.date.map(t => {
      const tomato = this.props.finishedtomatoes[t]
      return (
        <div key={t} className="daliytomato">
          <div className="title">
            <div className="datetime">{format(t, 'M月DD日')}</div>
            <div className="finishcount">完成了{tomato.length}个番茄</div>
          </div>
          <div className="content">
            {tomato.map( (d: any) => this.tomatoitem(d) )}
          </div>
        </div>
      )
    })
    return (
      <div className="tomatolist" id="tomatolist">
        {tomatolist}
      </div>
    )
  }
}

export default Tomatolist