import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'

import { Col, Radio, InputNumber, Row, Slider, Switch } from 'antd'

import type { RadioChangeEvent } from 'antd'

import { flexContainerAttr, StateFlexItemCount, StateFlexItemAttr, CONSTANTS } from './store'

const { FLEX_CONTAINER_ITEM } = CONSTANTS

const FlexItemOrderDemo = (props: { min?: number; max?: number; defaultValue?: number; disabled?: boolean; onChange?: (value: number) => void }) => {
  const { min, max, defaultValue, disabled = false } = props
  const [inputValue, setInputValue] = useState(defaultValue)

  const onChange = (newValue: number) => {
    setInputValue(newValue)
    props.onChange && props.onChange(newValue)
  }
  return (
    <Row className="w-full" gutter={8}>
      <Col span={4}>
        <InputNumber
          className="rounded-none border-b border-red-300 w-full"
          bordered={false}
          min={min}
          max={max}
          value={inputValue}
          onChange={onChange}
          style={{ padding: 0 }}
          disabled={disabled}
        />
      </Col>
      <Col span={20}>
        <Slider disabled={disabled} min={min} max={max} onChange={onChange} value={typeof inputValue === 'number' ? inputValue : 0} />
      </Col>
    </Row>
  )
}

const FlexItemBasisDemo = (props: { defaultValue: string | 'auto'; onChange: (value: string) => void }) => {
  const [checked, setChecked] = useState(props.defaultValue === 'auto')
  const [value, setValue] = useState(0)
  const [unit, setUnit] = useState('%')

  useEffect(() => {
    props.onChange(checked ? 'auto' : `${value}${unit}`)
  }, [checked, value, unit])

  return (
    <div className="inline-flex w-full content-center items-center">
      <span className={`${checked ? 'font-600': 'text-gray-300'} mr-5px`}>auto</span>
      <Switch onChange={(v) => setChecked(!v)} />

      <div className="inline-flex w-full">
        <FlexItemOrderDemo disabled={checked} min={1} max={Infinity} defaultValue={1} onChange={(v) => setValue(v)} />
        <div className="inline-flex ">
          <span className={`${unit === 'px' ? 'font-700 ' : 'text-gray-300'} mr-5px`}>px</span>
          <Switch disabled={checked} defaultChecked onChange={(v) => setUnit(v ? '%' : 'px')} />
          <span className={`${unit === '%' ? 'font-700' : 'text-gray-300'} ml-5px`}>%</span>
        </div>
      </div>
    </div>
  )
}

const FlexItemAlignDemo = (props: { onChange: (value: string) => void }) => {
  const onChange = (e: RadioChangeEvent) => {
    props.onChange(e.target.value)
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

const Wrapper: React.FC<
  React.PropsWithChildren<{
    label: string
  }>
> = (props) => {
  return (
    <>
      <Row className="w-full" gutter={8}>
        <Col span={4}>
          <p>{props.label}</p>
        </Col>
        <Col span={20}>{props.children}</Col>
      </Row>
    </>
  )
}

const FlexItemAttrDemo = () => {
  const [count, setCount] = useRecoilState(StateFlexItemCount)
  const [flexItemAttr, setFlexItemAttr] = useRecoilState(StateFlexItemAttr)
  const [id, setId] = useState(1)

  const updateFlexItem = (id: number, key: string, value: string | number) => {
    setFlexItemAttr({
      ...flexItemAttr,
      [FLEX_CONTAINER_ITEM(id)]: {
        ...flexItemAttr[FLEX_CONTAINER_ITEM(id)],
        [key]: value,
      },
    })
  }

  return (
    <div className="bg-white px-10px py-20px rounded-lg">
      <Wrapper label="count">
        <FlexItemOrderDemo min={1} max={100} defaultValue={count} onChange={(v) => setCount(v)} />
      </Wrapper>
      <Wrapper label="id">
        <FlexItemOrderDemo min={1} max={count} defaultValue={1} onChange={(v) => setId(v)} />
      </Wrapper>
      <Wrapper label="order">
        <FlexItemOrderDemo
          min={-10}
          max={10}
          defaultValue={flexItemAttr?.[FLEX_CONTAINER_ITEM(id)]?.order || 0}
          onChange={(v) => updateFlexItem(id, 'order', v)}
        />
      </Wrapper>

      <Wrapper label="flex-basis">
        <FlexItemBasisDemo
          defaultValue={flexItemAttr?.[FLEX_CONTAINER_ITEM(id)]?.flexBasis || 'auto'}
          onChange={(v) => updateFlexItem(id, 'flex-basis', v)}
        />
      </Wrapper>
      <Wrapper label="flex-grow">
        <FlexItemOrderDemo min={0} max={count} defaultValue={1} onChange={(v) => updateFlexItem(id, 'flex-grow', v)} />
      </Wrapper>
      <Wrapper label="flex-shrink">
        <FlexItemOrderDemo min={0} max={count} defaultValue={1} onChange={(v) => updateFlexItem(id, 'flex-shrink', v)} />
      </Wrapper>
      <Wrapper label="align-items">
        <FlexItemAlignDemo onChange={(v) => updateFlexItem(id, 'align-items', v)} />
      </Wrapper>
    </div>
  )
}

export default FlexItemAttrDemo
