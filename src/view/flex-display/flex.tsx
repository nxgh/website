import React, { useEffect, useState, useContext, FC } from 'react'
import { Col, Radio, InputNumber, Row, Slider, Switch } from 'antd'
import type { RadioChangeEvent } from 'antd'

import type { FlexContainerAttrKeys } from './store'
import { StateContext, CONSTANTS, flexContainerAttr, getStateStyleItem } from './store'

const FlexContainerItem = (props: { actionType: FlexContainerAttrKeys }) => {
  const { actionType } = props
  const { state, dispatch } = useContext(StateContext)

  const onChange = (e: RadioChangeEvent) => {
    dispatch({
      type: 'flex-container',
      payload: {
        [actionType]: e.target.value,
      },
    })
  }

  return (
    <Row className="inline-flex items-center w-full m-10px my-5px" key={JSON.stringify(state.style[CONSTANTS.FLEX_CONTAINER_ID])}>
      <Col span={6} className="text-16px mb-0">
        {actionType}
      </Col>
      <Col span={18}>
        <Radio.Group onChange={onChange} defaultValue={state.style[CONSTANTS.FLEX_CONTAINER_ID][actionType]} size="small">
          {flexContainerAttr[actionType].map((i) => (
            <Radio.Button key={i} value={i}>
              {i}
            </Radio.Button>
          ))}
        </Radio.Group>
      </Col>
    </Row>
  )
}
interface SliderWithInputNumberProps {
  min?: number
  max?: number
  defaultValue?: number
  disabled?: boolean
  onChange?: (value: number) => void
  onAfterChange?: (value: number) => void
}
export const SliderWithInputNumber: React.FC<SliderWithInputNumberProps> = (props) => {
  const { min, max, defaultValue, disabled = false, onAfterChange } = props
  const [inputValue, setInputValue] = useState(defaultValue)

  const onChange = (newValue: number) => {
    setInputValue(newValue)
    props.onChange && props.onChange(newValue)
  }
  return (
    <Row className="w-full" gutter={8}>
      <Col span={4}>
        <InputNumber className="rounded-none border-b border-red-300 w-full" bordered={false} min={min} max={max} value={inputValue} onChange={onChange} style={{ padding: 0 }} disabled={disabled} />
      </Col>
      <Col span={20}>
        <Slider disabled={disabled} min={min} max={max} onChange={onChange} onAfterChange={onAfterChange} value={typeof inputValue === 'number' ? inputValue : 0} />
      </Col>
    </Row>
  )
}

export const FlexItemBasis: FC = (props) => {
  const { state, dispatch } = useContext(StateContext)

  const initChecked = !getStateStyleItem(state)?.['flex-basis'] || getStateStyleItem(state)?.['flex-basis'] === 'auto'

  const [checked, setChecked] = useState(initChecked)
  const [value, setValue] = useState(0)
  const [unit, setUnit] = useState('%')

  useEffect(() => {
    dispatch({
      type: 'flex-items',
      payload: {
        'flex-basis': checked ? 'auto' : `${value}${unit}`,
      },
    })
  }, [checked, value, unit])

  return (
    <div className="inline-flex w-full content-center items-center">
      <span className={`${checked ? 'font-600' : 'text-gray-300'} mr-5px`}>auto</span>
      <Switch onChange={(v) => setChecked(!v)} />
      <div className="inline-flex w-full">
        <SliderWithInputNumber disabled={checked} min={1} max={Infinity} defaultValue={1} onChange={(v) => setValue(v)} />
        <div className="inline-flex ">
          <span className={`${unit === 'px' ? 'font-700 ' : 'text-gray-300'} mr-5px`}>px</span>
          <Switch disabled={checked} defaultChecked onChange={(v) => setUnit(v ? '%' : 'px')} />
          <span className={`${unit === '%' ? 'font-700' : 'text-gray-300'} ml-5px`}>%</span>
        </div>
      </div>
    </div>
  )
}

export const FlexItemAlign = () => {
  const { dispatch } = useContext(StateContext)
  const onChange = (e: RadioChangeEvent) => {
    dispatch({
      type: 'flex-items',
      payload: {
        'align-content': e.target.value,
      },
    })
  }
  return (
    <Radio.Group onChange={onChange} defaultValue="a" size="small">
      {['auto', ...flexContainerAttr['align-content']].map((i) => (
        <Radio.Button key={i} value={i}>
          {i}
        </Radio.Button>
      ))}
    </Radio.Group>
  )
}

export const Wrapper: React.FC<React.PropsWithChildren<{ label: string }>> = (props) => {
  return (
    <Row className="w-full" gutter={8}>
      <Col span={4}>{props.label}</Col>
      <Col span={20}>{props.children}</Col>
    </Row>
  )
}

const FlexContainerDemo = () => {
  return (
    <div className="bg-white px-10px py-20px rounded-lg">
      {Object.keys(flexContainerAttr).map((type) => (
        <FlexContainerItem actionType={type as FlexContainerAttrKeys} key={type} />
      ))}
    </div>
  )
}

const FlexItemBySlider: FC<{
  payloadKey: string
}> = (props) => {
  const { state, dispatch } = useContext(StateContext)

  const { payloadKey } = props
  const onChange = (v: number) => {
    dispatch({
      type: 'flex-items',
      payload: {
        [payloadKey]: v,
      },
    })
  }
  const defaultValue = getStateStyleItem(state)?.['order'] || 0
  return <SliderWithInputNumber min={-10} max={10} defaultValue={Number(defaultValue)} onChange={(v) => onChange(v)} />
}

const ComponentLists = {
  order: <FlexItemBySlider payloadKey="order" />,
  'flex-basis': <FlexItemBasis />,
  'align-items': <FlexItemAlign />,
  'flex-grow': <FlexItemBySlider payloadKey="flex-grow" />,
  'flex-shrink': <FlexItemBySlider payloadKey="flex-shrink" />,
}
const FlexItemAttrDemo = () => {
  return (
    <div className="bg-white px-10px py-20px rounded-lg">
      {Object.entries(ComponentLists).map(([id, component]) => {
        return (
          <Wrapper label={id} key={id}>
            {component}
          </Wrapper>
        )
      })}
    </div>
  )
}

export { FlexContainerDemo, FlexItemAttrDemo }
