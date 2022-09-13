import { useRecoilState } from 'recoil'

import { flexContainerAttr, StateFlexContainerAttr } from './store'
import type { FlexContainerAttrKeys } from './store'

import type { RadioChangeEvent } from 'antd'
import { Radio, Row, Col } from 'antd'

export const FlexContainerItem = (props: { actionType: FlexContainerAttrKeys }) => {
  const { actionType } = props
  const [style, setStyle] = useRecoilState(StateFlexContainerAttr)

  const onChange = (e: RadioChangeEvent) => {
    setStyle({ ...style, [actionType]: e.target.value })
  }

  return (
    <div className="inline-flex items-center w-full m-10px my-5px">
      <Row className="w-full">
        <Col span={6}>
          <p className="text-16px mb-0 mr-20px">{actionType}</p>
        </Col>
        <Col span={18}>
          <Radio.Group onChange={onChange} defaultValue="a" size="small">
            {flexContainerAttr[actionType].map((i) => (
              <Radio.Button key={i} value={i}>
                {i}
              </Radio.Button>
            ))}
          </Radio.Group>
        </Col>
      </Row>
    </div>
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

export default FlexContainerDemo
