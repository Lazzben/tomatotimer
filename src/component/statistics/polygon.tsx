import React from 'react'

interface IPolygonProps {
  data: any,
  TotalFinishedCount: number
}

class Polygon extends React.Component<IPolygonProps> {
  constructor(props:any){
    super(props)
  }

  public points = () => {
    const dates = Object.keys(this.props.data).sort((a,b)=>{
      return Date.parse(a) - Date.parse(b)
    })
    const firstDay = dates[0]
    let finishedCount = 0
    if(firstDay){
      const lastDay = dates[dates.length - 1]
      const range = Date.parse(lastDay) - Date.parse(firstDay)
      const pointArr = dates.map(date => {
        const x = ( Date.parse(date) - Date.parse(firstDay) )/range * 240
        finishedCount += this.props.data[date].length
        const y = (1 - (finishedCount/this.props.TotalFinishedCount)) * 60
        return `${x},${y}`
      })
      return ["0,60",...pointArr,"240,60"].join(' ')
    }else{
      return "0,60 240,60"
    }
  }

  public render(){
    return(
      <div className="polygon">
        <svg>
          <polygon fill="rgba(215,78,78,0.1)" stroke="rgba(215,78,78,0.5)" strokeWidth="1" points={this.points()}/>
        </svg>
      </div>
    )
  }
}


export default Polygon

