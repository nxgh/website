import { useReducer, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { compressToBase64, decompressFromBase64 } from 'lz-string'

import { StateContext, StateReducer, initialState, CONSTANTS, InitialState } from './store'
import type { DispatchType } from './store'

import FlexMDX from './flex.mdx'
import './index.css'

const { STYLE_SHEET_ID } = CONSTANTS

const ObjectToStr = (style: Record<string, any>) => Object.entries(style).reduce((str, [k, v]) => (str += `#${k}{${Object.entries(v).reduce((s, [k, v]) => (s += `${k}:${v};`), '')}}`), '')

const useLinkStyleSheet = (state: InitialState) => {
  useEffect(() => {
    const styleSheet = document.getElementById(STYLE_SHEET_ID)

    if (!styleSheet) {
      const style = document.createElement('style')
      style.id = STYLE_SHEET_ID
      document.querySelector('head')!.appendChild(style)
    }
    const a = document.getElementById(STYLE_SHEET_ID)

    a!.innerText = ObjectToStr(state.style)
  }, [state])
}

const useSearchParamsState = (state: InitialState, dispatch: DispatchType) => {
  let [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    const code = searchParams.get('code')
    if (!code) return
    try {
      const decompressCode = decompressFromBase64(code)
      if (decompressCode) {
        dispatch({
          type: 'update-style',
          payload: JSON.parse(decompressCode),
        })
      }
    } catch (error) {}
  }, [])

  useEffect(() => {
    const code = `${JSON.stringify(state.style)}`
    setSearchParams({
      code: compressToBase64(code),
    })
  }, [state.style])
}

export default function () {
  const [state, dispatch] = useReducer(StateReducer, initialState)

  useLinkStyleSheet(state)
  useSearchParamsState(state, dispatch)

  return (
    <>
      <StateContext.Provider value={{ state, dispatch }}>
        <FlexMDX />
      </StateContext.Provider>
    </>
  )
}
