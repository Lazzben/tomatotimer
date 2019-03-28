import React from 'react'
import { Button, Input, Icon, Modal} from 'antd'
import axios from 'src/config/axios'
import Countdown from 'src/component/countdown/countdown'

import './starttomato.scss'

interface ITomatoesActionProps {
  startTomato: ()=>void,
  unfinishedTomatoes: any,
  updatetomato: (payload: any)=> any,
}

interface ITomatoesState {
  description: string
}

const confirm = Modal.confirm;

class Starttomato extends React.Component<ITomatoesActionProps,ITomatoesState> {
  constructor(props: any){
    super(props)
    this.state = {
      description: ''
    }
  }

  public addDescription = (e:any) => {
    if(e.keyCode === 13 && this.state.description !== ''){
      this.updateTomato({
        description: this.state.description,
        ended_at: new Date()
      })
      this.setState({description: ''})
    }
  }

  public updateTomato = async (params: any) => {
    try{
      const response = await axios.put(`tomatoes/${this.props.unfinishedTomatoes.id}`, params)
      this.props.updatetomato(response.data.resource)
    }catch(e){
      throw new Error(e)
    }
  }

  public showConfirm = () => {
    confirm({
      title: '您目前正在一个番茄工作中，要放弃这个番茄吗？',
      onOk: () => {
        this.abortTomato()
      },
      okText: '确认',
      cancelText: '取消'
    });
  }

  public abortTomato = () => {
    this.updateTomato({aborted: true})
    document.title = `小黄番茄时钟`
  }

  public finished = () => {
    this.forceUpdate();
  }

  public render(){
    let html = <div/>
    if(this.props.unfinishedTomatoes === undefined){
      html = <Button onClick={this.props.startTomato}>开始番茄</Button>
    }else{
      const createdAt = Date.parse(this.props.unfinishedTomatoes.created_at)
      const duration = this.props.unfinishedTomatoes.duration
      const now = new Date().getTime()
      if(now - createdAt > duration) {
        html = <div className="inputwrapper">
          <Input placeholder="请输入你刚刚完成的任务"
                 value={this.state.description}
                 onChange={e => this.setState({description: e.target.value})}
             onKeyUp={e => this.addDescription(e)}
          />
          <Icon type="close-circle" className="cancle" onClick={this.showConfirm}/>
        </div>
      }else{
        html = (
          <div className="countdownwrapper">
            <Countdown timer={duration - now + createdAt} finished={this.finished} duration={duration}/>
            <Icon type="close-circle" className="cancle" onClick={this.showConfirm}/>
          </div>
        ) 
      }
    }
    return (
      <div className="starttomato" id="starttomato">
        {html}
      </div>
    )
  }
}

export default Starttomato