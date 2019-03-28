import {ADD_TODO, INIT_TODOS, UPDATE_TODOS, EDIT_TODO, ADD_TOMATO, INIT_TOMATO, UPDATE_TOMATO } from '../actiontypes'

export const addTodo = (payload: any) => {
  return {
    type: ADD_TODO,
    payload
  }
}

export const initTodos = (payload: any[]) => {
  return {
    type: INIT_TODOS,
    payload
  }
}

export const updateTodo = (payload: any) => {
  return {
    type: UPDATE_TODOS,
    payload
  }
}

export const editTodo = (payload: any) => {
  return {
    type: EDIT_TODO,
    payload
  }
}

export const addTomato = (payload: any) => {
  return {
    type: ADD_TOMATO,
    payload
  }
}

export const initTomato = (payload: any[]) => {
  return {
    type: INIT_TOMATO,
    payload
  }
}

export const updatetomato = (payload: any) => {
  return {
    type: UPDATE_TOMATO,
    payload
  }
}