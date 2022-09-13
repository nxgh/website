import CodeMirror from '@uiw/react-codemirror'
import { useRecoilValue } from 'recoil'

import { StateFlexContainerAttr, StateFlexItemCount, StateFlexItemAttr, CONSTANTS } from './store'
import { css } from '@codemirror/lang-css'

const { FLEX_CONTAINER_ID, FLEX_CONTAINER_ITEM } = CONSTANTS

const stringify = (style: Record<string, any>) => Object.entries(style).reduce((str, [k, v]) => (str += `  ${k}:${v};\n`), '')

const codeMirrorValue = () => {
  const style = useRecoilValue(StateFlexContainerAttr)
  const styleItem = useRecoilValue(StateFlexItemAttr)

  console.log(style, stringify(style))

  const styleContainer = `#${FLEX_CONTAINER_ID} {\n${stringify(style)}}`
  const styleItems = Object.entries(styleItem).reduce((str, [k, v]) => (str += `#${k}{\n${stringify(v)}}\n`), '')

  return `${styleContainer}\n${styleItems}`
}

const PreviewDemo = () => {
  const flexItemCount = useRecoilValue(StateFlexItemCount)

  return (
    <div className="w-full h-full top flex flex-col">
      <CodeMirror value={codeMirrorValue()} height="40vh" width="49vw" editable={false} extensions={[css()]} />

      <div className="w-full h-full flex justify-center items-center p-20px">
        <div className="border-1 border-blue-500 w-full h-full bg-white rounded-lg" id={FLEX_CONTAINER_ID}>
          {[...Array(flexItemCount).keys()].map((item, index) => (
            <div
              style={{
                backgroundColor: `hsla(${(item + 1) * 36}, 100%, 50%, 1)`,
              }}
              id={FLEX_CONTAINER_ITEM(index + 1)}
              className="ml-2 mt-2 w-10 h-10 flex justify-center items-center"
              key={item}
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
