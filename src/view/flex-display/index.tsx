import { useEffect } from 'react'
import { useRecoilValue } from 'recoil'

import { StateFlexContainerAttr, StateFlexItemAttr, CONSTANTS } from './store'
import FlexMDX from './flex.mdx'
import './index.css'

const { STYLE_SHEET_ID, FLEX_CONTAINER_ID } = CONSTANTS

const ObjectToStr = (style: Record<string, any>, splitFlag: string = ';') =>
  Object.entries(style)
    .map(([k, v]) => `${k}:${v || ''}`)
    .join(splitFlag)

const useLinkStyleSheet = () => {
  const style = useRecoilValue(StateFlexContainerAttr)
  const styleItem = useRecoilValue(StateFlexItemAttr)

  useEffect(() => {
    const styleSheet = document.getElementById(STYLE_SHEET_ID)

    if (!styleSheet) {
      const style = document.createElement('style')
      style.id = STYLE_SHEET_ID
      document.querySelector('head')!.appendChild(style)
    }
    const a = document.getElementById(STYLE_SHEET_ID)

    const flexStyle = ObjectToStr(style)

    const itemStyle = Object.entries(styleItem)
      .map(([k, v]) => [k, ObjectToStr(v)])
      .reduce((str, [k, v]) => (str += `#${FLEX_CONTAINER_ID} #${k}{${v}}`), '')

    a!.innerText = `#${FLEX_CONTAINER_ID}{${flexStyle}}${itemStyle}`
  }, [style, styleItem])
}

export default function () {
  useLinkStyleSheet()
  return (
    <>
      <FlexMDX />
    </>
  )
}
