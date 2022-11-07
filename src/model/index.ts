import React, { useContext, createContext } from 'react'

interface Action {
  type?: string
  payload?: any
}
type CountReducer = React.Reducer<InitialState, Action>

interface InitialState {
  sider: string[]
}

export const action_types = {
  SET_SIDER: 'SET_SIDER',
}

/** ----------  initial state ---------- */
export const initialState: InitialState = {
  sider: [],
}

/** ----------  context ---------- */
export const StateContext: React.Context<InitialState> = createContext(initialState)

export const DispatchContext: React.Context<React.Dispatch<Action>> = createContext((value) => {})

export const useStateStore = () => useContext(StateContext)

export const useDispatchStore = () => useContext(DispatchContext)

/** ----------  reducer ---------- */
export const reducer: CountReducer = (state, { type, payload }) => {
  switch (type) {
    case action_types.SET_SIDER:
      return {
        ...state,
        sider: payload,
      }
    default:
      return state
  }
}
