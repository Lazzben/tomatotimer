import React from 'react'

import './countdown.scss'

interface ICountdownProps {
  timer: number,
  finished: () => void,
  duration: number
}

interface ICountdownState {
  timer: number
}

let timeID:NodeJS.Timeout

class Countdown extends React.Component<ICountdownProps,ICountdownState> {
  constructor(props: any){
    super(props)
    this.state = {
      timer: this.props.timer
    }
  }

  public get countDown (){
    const {timer} = this.state
    let min = Math.floor(timer/1000/60) + ''
    let sec = Math.floor(timer/1000%60) + ''
    min = min.length < 2 ? '0' + min : min
    sec = sec.length < 2 ? '0' + sec : sec
    const time = min + ':' + sec
    return time
  }

  public componentDidMount(){
    timeID = setInterval(() => {
      this.setState({timer: this.state.timer - 1000})
      document.title = `${this.countDown} —小黄番茄时钟`
      if(this.state.timer <= 0){
        clearInterval(timeID)
        this.props.finished()
        document.title = `小黄番茄时钟`
      }
    }, 1000)
  }
  
  public componentWillUnmount(){
    clearInterval(timeID)
  }

  public render(){
    const width =  (1 - this.state.timer/this.props.duration)*100 + '%'
    return(
      <div id="countdown">
        <span className="time">{this.countDown}</span>
        <div className="progress" style={{width: `${width}`}} />
      </div>
    )
  }
}

export default Countdown