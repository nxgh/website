import { useEffect, useRef, useState } from 'react'
import { Alert, Button, DatePicker, Drawer, Input, InputNumber, Tooltip } from 'antd'
import { useLiveQuery } from 'dexie-react-hooks'

import useJsonP from 'src/fund/useJsonp'
import FundResponse from 'src/fund/api.response'
import style from './index.module.css'
import { db } from 'src/db'
import Chart from 'src/fund/chart'

// 基金持仓信息详情
const AddFundDetail = ({ fund }: { fund: FundResponse }) => {
  const onChange = () => {}
  if (Object.keys(fund).length === 0) return <></>
  return (
    <>
      <p>基金名称：{fund.fS_name} </p>
      <p>基金代码： {fund.fS_code}</p>

      <table>
        <thead>
          <tr>
            <th>买入日期</th>
            <th>买入净值</th>
            <th>买入金额</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>
              <DatePicker format={'YYYY/MM/DD'} onChange={onChange} />
            </th>
            <th>
              <InputNumber stringMode />
            </th>
            <th>
              <InputNumber />
            </th>
          </tr>
        </tbody>
      </table>
      {/* <p>
        买入日期: <DatePicker format={'YYYY/MM/DD'} onChange={onChange} />
      </p>
      <p>
        买入净值: <InputNumber stringMode />{' '}
      </p>
      <p>
        买入金额: <InputNumber />
      </p> */}
    </>
  )
}

const SideBar = () => {
  const funds = useLiveQuery(async () => await db.fund.toArray()) || []

  const [open, setOpen] = useState(false)
  const [fundId, setFundId] = useState('')

  return (
    <>
      {funds?.map((item) => (
        <p key={item.fS_code}>
          {item.fS_name} {item.fS_code}
          <Tooltip title="买入/卖出记录">
            <Button
              type="link"
              onClick={() => {
                setOpen(true)
                setFundId(item.fS_code)
              }}
              style={{ fontSize: '22px' }}
            >
              +
            </Button>
          </Tooltip>
        </p>
      ))}
      <Drawer title="设置基金持仓详细" placement="left" onClose={() => setOpen(false)} open={open}>
        <AddFundDetail fund={funds.find((item) => item.fS_code === fundId)!} />
      </Drawer>
    </>
  )
}

export default function Fund() {
  const [fundId, setFundId] = useState('002708')

  const { data, error, loading } = useJsonP(fundId, {
    onSuccess: (data) => {
      addFund(data)
    },
  })

  async function addFund(data: FundResponse) {
    await db.fund.put(data)
  }

  return (
    <div className={style.fundWrap}>
      <div className={style.side}>
        <Input defaultValue={fundId} onPressEnter={(e) => setFundId((e.target as HTMLInputElement).value)} />
        <SideBar />
      </div>
      {!error ? (
        <Chart
          title={(data as FundResponse).fS_name}
          data={(data as FundResponse).Data_netWorthTrend}
          loading={loading}
        />
      ) : (
        <Alert message={error.message} type="error" />
      )}
    </div>
  )
}
