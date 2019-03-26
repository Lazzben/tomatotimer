import {ADD_TODO, INIT_TODOS, UPDATE_TODOS, EDIT_TODO } from '../actiontypes'

export default (state:any[], action:any) => {
  state = state || [];
  switch(action.type){
    case ADD_TODO:
      return [action.payload,...state]
    case INIT_TODOS:
      return [...action.payload]
    case UPDATE_TODOS:
      return state.map(t => {
        if(t.id === action.payload.id){
          return action.payload
        }else{
          return t
        }
      })
    case EDIT_TODO:
      return state.map(t => {
        if(t.id === action.payload){
          return Object.assign({}, t, {editing: true})
        }else{
          return Object.assign({}, t, {editing: false})
        }
      })
    default:
      return state
  }
}