import { createContext } from 'react'
import produce from 'immer'

const FLEX_CONTAINER_ITEM_PREFIX = 'item-'

export const CONSTANTS = {
  FLEX_CONTAINER_ITEM: (id: number | string) => `${FLEX_CONTAINER_ITEM_PREFIX}${id}`,
  FLEX_CONTAINER_ID: 'flex-demo-container',
  STYLE_SHEET_ID: 'style-sheet-flex-demo',
}
export const flexContainerAttr = {
  display: ['flex', 'inline-flex'],
  'flex-direction': ['row', 'row-reverse', 'column', 'column-reverse'],
  'flex-wrap': ['nowrap', 'wrap', 'wrap-reverse'],
  'justify-content': ['flex-start', 'flex-end', 'center', 'space-between', 'space-around'],
  'align-items': ['flex-start', 'flex-end', 'center', 'baseline', 'stretch'],
  'align-content': ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'stretch'],
} as const

export type FlexContainerAttrKeys = keyof typeof flexContainerAttr

export interface InitialState {
  count: number
  id: number
  style: Record<string, Record<string, string | number>>
}

type ActionType =
  | {
      type: 'flex-container'
      payload: Record<string, string>
    }
  | {
      type: 'flex-items'
      payload: Record<string, string | number>
    }
  | {
      type: 'update-count'
      payload: number
    }
  | {
      type: 'update-id'
      payload: number
    }
export const initialState: InitialState = {
  count: 30,
  id: 1,
  style: {
    [CONSTANTS.FLEX_CONTAINER_ID]: {
      display: 'flex',
      'flex-direction': 'row',
      'flex-wrap': 'wrap',
      'justify-content': 'flex-start',
      'align-items': 'flex-start',
      'align-content': 'flex-start',
    },
  },
}

export const StateContext = createContext<{ state: InitialState; dispatch: React.Dispatch<ActionType> }>({ state: initialState, dispatch: () => {} })

export const getStateStyleItem = (state: InitialState) => state.style[CONSTANTS.FLEX_CONTAINER_ITEM(state.id)]

export const StateReducer = produce((state: any, { type, payload }: ActionType) => {
  switch (type) {
    case 'flex-container':
      Object.entries(payload).forEach(([k, v]) => {
        state.style[CONSTANTS.FLEX_CONTAINER_ID][k] = v
      })
      return state
    case 'flex-items':
      Object.entries(payload).forEach(([k, v]) => {
        if (state.style[CONSTANTS.FLEX_CONTAINER_ITEM(state.id)]) {
          state.style[CONSTANTS.FLEX_CONTAINER_ITEM(state.id)][k] = v
        } else {
          state.style[CONSTANTS.FLEX_CONTAINER_ITEM(state.id)] = {
            [k]: v,
          }
        }
      })
      return state
    case 'update-count':
      state.count = payload

      Object.keys(state.style).forEach((item) => {
        if (item.startsWith(FLEX_CONTAINER_ITEM_PREFIX)) {
          if (Number(item.split(FLEX_CONTAINER_ITEM_PREFIX)[1]) > payload) {
            delete state.style[item]
          }
        }
      })
      return state
    case 'update-id':
      state.id = payload
      return state
    default:
      return state
  }
})
