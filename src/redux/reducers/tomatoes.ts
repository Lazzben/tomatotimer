import { ADD_TOMATO, INIT_TOMATO, UPDATE_TOMATO } from '../actiontypes'

export default (state:any[], action: any) => {
  state = state || []
  switch(action.type){
    case ADD_TOMATO:
      return [action.payload,...state]
    case INIT_TOMATO:
      return [...action.payload]
    case UPDATE_TOMATO:
      return state.map(t => {
        if(t.id === action.payload.id){
          return action.payload
        }else{
          return t
        }
      })
    default:
      return state
  }
}