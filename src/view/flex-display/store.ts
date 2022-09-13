import { atom, selector } from 'recoil'

export interface IFlexItemAttr {
  order: number
  flexBasis: string | 'auto'
  flexGrow: number
  flexShrink: number
  flex: '0 1 auto' | string
  alignSelf: 'auto' | 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch'
}

export const flexContainerAttr = {
  display: ['flex', 'inline-flex'],
  'flex-direction': ['row', 'row-reverse', 'column', 'column-reverse'],
  'flex-wrap': ['nowrap', 'wrap', 'wrap-reverse'],
  // 'flex-flow': [''],
  'justify-content': ['flex-start', 'flex-end', 'center', 'space-between', 'space-around'],
  'align-items': ['flex-start', 'flex-end', 'center', 'baseline', 'stretch'],
  'align-content': ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'stretch'],
} as const

type GetTypeByObject<T extends Record<string, any>> = {
  [k in keyof T]: T[k][number]
}

export type IFlexContainer = GetTypeByObject<typeof flexContainerAttr>
export type FlexContainerAttrKeys = keyof typeof flexContainerAttr

export const StateFlexContainerAttr = atom<IFlexContainer>({
  key: 'flex-style',
  default: {
    display: 'flex',
    'flex-direction': 'row',
    'flex-wrap': 'wrap',
    'justify-content': 'flex-start',
    'align-items': 'flex-start',
    'align-content': 'flex-start',
  },
})

export const StateFlexItemCount = atom({
  key: 'flex-item-count',
  default: 30,
})

export const StateFlexItemAttr = atom<Record<string, IFlexItemAttr>>({
  key: 'flex-item-style',
  default: {},
})

export const CONSTANTS = {
  FLEX_CONTAINER_ITEM: (id: number | string) => `item-${id}`,
  FLEX_CONTAINER_ID: 'flex-demo-container',
  STYLE_SHEET_ID: 'style-sheet-flex-demo',
}
