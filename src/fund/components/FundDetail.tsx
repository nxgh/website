import { Button, Form, Input, InputNumber } from 'antd'
import dayjs from 'dayjs'

import type { ConfigType } from 'dayjs'

import { DatePicker } from 'src/components/antd'
import type { FundResponse } from 'src/fund'
import { FundDetailTable } from 'src/fund'

import { useState } from 'react'
import type { FundDetail as FundDetailDB } from 'src/db'

// 日期格式化 function
function formatDate(date: ConfigType) {
  return dayjs(date).format('YYYY/MM/DD')
}

enum HandleButton {
  BUYIN,
  SELL,
}

const Show = ({ when, children }: { when: boolean; children: React.ReactNode }) => {
  return when ? <>{children}</> : <></>
}

const layout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 16 },
}

const validateMessages = {
  required: '${label} is required!',
  types: {
    date: '${label} 为非交易日，请重新选择',
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
}

// 基金持仓信息详情
export const FundDetail = ({ fund }: { fund: FundResponse }) => {
  const [isBuying, setIsBuying] = useState(false)

  const [form] = Form.useForm()
  const fundDetail = Form.useWatch('fundDetail', form)

  function checkDate(_: any, dateString: ConfigType) {
    if (!dateString) return Promise.reject(new Error('日期不能为空'))
    const dateNet = fund.Data_netWorthTrend.find((item) => formatDate(item.x) === formatDate(dateString))?.y
    if (!dateNet) return Promise.reject(new Error('非交易日，请重新选择'))
    form.setFieldValue('fundDetail', { ...form.getFieldsValue().fundDetail, net: dateNet })
    return Promise.resolve()
  }

  async function onFinish(values: any) {
    const fundDetail = values['fundDetail']
    const { date, net, amount, remark = '' } = fundDetail

    const result: FundDetailDB = {
      fS_code: fund.fS_code,
      date: formatDate(date),
      net,
      amount: isBuying ? -amount : amount,
      remark,
    }
    // await db.fundDetail.put(f)
  }

  function setAmount(actionType: HandleButton) {
    setIsBuying(actionType === HandleButton.SELL)
    form.submit()
  }

  return (
    <Show when={Object.keys(fund).length !== 0}>
      <p className="text">基金名称：{fund.fS_name} </p>
      <p className="text">基金代码： {fund.fS_code}</p>

      <FundDetailTable fundId={fund.fS_code} />
      <Form {...layout} form={form} onFinish={onFinish} name="nest-messages" validateMessages={validateMessages}>
        <Form.Item
          name={['fundDetail', 'date']}
          label="日期"
          rules={[{ required: true, type: 'date', validator: checkDate }]}
        >
          <DatePicker className="w-full" placeholder="日期" format={'YYYY/MM/DD'} />
        </Form.Item>
        <Form.Item name={['fundDetail', 'net']} label="净值">
          <Input disabled />
        </Form.Item>
        <Form.Item name={['fundDetail', 'amount']} label="金额" rules={[{ required: true }]}>
          <InputNumber className="w-full" />
        </Form.Item>
        <Form.Item name={['fundDetail', 'remark']} label="备注">
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
          <Button style={{ marginRight: '10px' }} type="primary" onClick={() => setAmount(HandleButton.BUYIN)}>
            买入
          </Button>
          <Button
            type="default"
            style={{ background: 'var(--n-primary-3)', color: '#fff' }}
            onClick={() => setAmount(HandleButton.SELL)}
          >
            卖出
          </Button>
        </Form.Item>
      </Form>
    </Show>
  )
}

export default FundDetail
