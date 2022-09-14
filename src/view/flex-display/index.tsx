import { useReducer, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { compressToBase64, decompressFromBase64 } from 'lz-string'

import { StateContext, StateReducer, initialState, CONSTANTS, InitialState } from './store'

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

// const useSearchParamsState = () => {
//   const splitFlag = '@@@'
//   const [style, setStyle] = useRecoilState(StateFlexAttr)

//   let [searchParams, setSearchParams] = useSearchParams()
//   useEffect(() => {
//     const code = searchParams.get('code')
//     if (!code) return
//     if (decompressFromBase64(code)) {
//       const _style = decompressFromBase64(code)!
//         .split('@@@')
//         .map((i) => JSON.parse(i))

//       console.log('_style, _styleItem', _style)

//       setStyle(_style)
//     }
//   }, [searchParams])

//   useEffect(() => {
//     const code = `${JSON.stringify(style)}`
//     setSearchParams({
//       code: compressToBase64(code),
//     })
//   }, [style])
// }

export default function () {
  const [state, dispatch] = useReducer(StateReducer, initialState)

  useLinkStyleSheet(state)
  // useSearchParamsState()

  useEffect(() => {
    console.log('%cstyle:', 'background: #ff0099;color: white;padding: 0 3px;border-radius: 3px;', state)
  }, [state])
  return (
    <>
      <StateContext.Provider value={{ state, dispatch }}>
        <FlexMDX />
      </StateContext.Provider>
    </>
  )
}
