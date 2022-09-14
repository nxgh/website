import { useContext } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { css } from '@codemirror/lang-css'

import { CONSTANTS, StateContext, InitialState } from './store'
import { SliderWithInputNumber, Wrapper } from './flex'

const { FLEX_CONTAINER_ID, FLEX_CONTAINER_ITEM } = CONSTANTS

const stringify = (style: Record<string, any>) => Object.entries(style).reduce((str, [k, v]) => (str += `  ${k}:${v};\n`), '')

const codeMirrorValue = (state: InitialState) => {
  const styleItems = Object.entries(state.style).reduce((str, [k, v]) => (str += `#${k}{\n${stringify(v)}}\n`), '')
  return `${styleItems}`
}

const PreviewDemo = () => {
  const { state, dispatch } = useContext(StateContext)

  return (
    <div className="w-full h-full top flex flex-col">
      <CodeMirror value={codeMirrorValue(state)} height="40vh" width="49vw" editable={false} extensions={[css()]} />
      <div className="w-full h-full flex flex-col justify-center items-center p-20px bg-white rounded-lg">
        <Wrapper label="count">
          <SliderWithInputNumber
            min={0}
            max={100}
            defaultValue={state.count}
            onChange={(v) =>
              dispatch({
                type: 'update-count',
                payload: v,
              })
            }
          />
        </Wrapper>
        <div className="border-1 border-blue-500 w-full h-full bg-white rounded-lg" id={FLEX_CONTAINER_ID}>
          {[...Array(100).keys()].map((item) => (
            <div
              style={{
                backgroundColor: `hsla(${(item + 1) * 36}, 100%, ${state.id === item + 1 ? '60%' : '90%'}, 1)`,
                display: item + 1 > state.count ? 'none' : '',
                color: state.id === item + 1 ? 'white' : 'black'
              }}
              id={FLEX_CONTAINER_ITEM(item + 1)}
              className="ml-2 mt-2 w-10 h-10 flex justify-center items-center cursor-pointer"
              key={item}
              onClick={() =>
                dispatch({
                  type: 'update-id',
                  payload: item + 1,
                })
              }
            >
              {item + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PreviewDemo
