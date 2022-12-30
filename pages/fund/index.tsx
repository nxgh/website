import { useState } from 'react'
import { DatePicker, Alert, Button, Drawer, Input, InputNumber, notification, Tooltip, Table } from 'antd'
import { useLiveQuery } from 'dexie-react-hooks'

import useJsonP from 'src/fund/useJsonp'
import FundResponse from 'src/fund/api.response'
import style from './index.module.css'
import { db, FundDetail } from 'src/db'
import Chart from 'src/fund/chart'
import dayjs from 'dayjs'

const AddFundDetailTable = ({ fundId }: { fundId: string }) => {
  const dataSource = useLiveQuery(async () => await db.fundDetail.where('fS_code').equals(fundId).toArray(), [fundId])

  dataSource?.sort(({ date: dateA }: FundDetail, { date: dateB }: FundDetail) =>
    dayjs(dateA).isBefore(dayjs(dateB), 'day') ? -1 : dayjs(dateA).isSame(dayjs(dateB), 'day') ? 0 : 1
  )

  console.log(dataSource)

  const columns = [
    {
      title: '日期',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: '净值',
      dataIndex: 'net',
      key: 'net',
    },
    {
      title: '操作',
      dataIndex: 'amount',
      key: 'amount',
      render: (text: string) => {
        return (
          <span
            style={{
              color: Number(text) > 0 ? 'green' : 'red',
            }}
          >
            {Number(text) > 0 ? '买入' : '卖出'}
          </span>
        )
      },
    },
    {
      title: '金额',
      dataIndex: 'amount',
      key: 'amount',
    },
  ]

  return <Table size="small" dataSource={dataSource} columns={columns} />
}

// 基金持仓信息详情
const AddFundDetail = ({ fund }: { fund: FundResponse }) => {
  enum HandleButton {
    BUYIN,
    SELL,
  }

  const [date, setDate] = useState('')
  const [net, setNet] = useState(0)
  const [amount, setAmount] = useState(0)

  const [dateStatus, setDateStatus] = useState<'error' | ''>('')

  const DatePickerOnChange = (_: any, dateString: string) => {
    const dateNet = fund.Data_netWorthTrend.find((item) => dayjs(item.x).format('YYYY/MM/DD') === dateString)?.y
    if (!dateNet) {
      notification.warning({
        message: '非交易日，请重新选择',
        placement: 'topLeft',
        duration: 1.5,
      })
      setDateStatus('error')
      setDate('')
    } else {
      setDate(dateString)
      setDateStatus('')
      setNet(dateNet)
    }
  }

  const handle = async (actionType: HandleButton) => {
    const fundDetail: FundDetail = {
      fS_code: fund.fS_code,
      date,
      net,
      amount: actionType === HandleButton.BUYIN ? amount : -amount,
    }
    await db.fundDetail.put(fundDetail)
    setDate('')
    setNet(0)
    setAmount(0)
  }

  const isDisabled = () => date === '' || amount === 0

  if (Object.keys(fund).length === 0) return <></>
  return (
    <>
      <p>基金名称：{fund.fS_name} </p>
      <p>基金代码： {fund.fS_code}</p>

      <AddFundDetailTable fundId={fund.fS_code} />

      <div className={style.FundDetailForm}>
        <DatePicker placeholder="日期" format={'YYYY/MM/DD'} status={dateStatus} onChange={DatePickerOnChange} />
        <Input placeholder="净值" disabled value={net} />
        <InputNumber
          placeholder="金额"
          value={amount}
          min={0}
          onChange={(value) => {
            setAmount(value === null ? 0 : Number(value))
          }}
        />
        <Button disabled={isDisabled()} onClick={() => handle(HandleButton.BUYIN)}>
          买入
        </Button>
        <Button disabled={isDisabled()} onClick={() => handle(HandleButton.SELL)}>
          卖出
        </Button>
      </div>
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
      <Drawer size="large" title="设置基金持仓详细" placement="left" onClose={() => setOpen(false)} open={open}>
        <AddFundDetail fund={funds.find((item) => item.fS_code === fundId)!} />
      </Drawer>
    </>
  )
}

export default function Fund() {
  const [fundId, setFundId] = useState('002708')

  const markPointData = useLiveQuery(
    async () => await db.fundDetail.where('fS_code').equals(fundId).toArray(),
    [fundId]
  )

  const { data, error, loading } = useJsonP(fundId, {
    onSuccess: (data) => {
      console.log(data)

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
          markPointData={markPointData?.map((item) => [dayjs(item.date).format('YYYY/MM/DD'), item.net, item.amount])!}
        />
      ) : (
        <Alert message={error.message} type="error" />
      )}
    </div>
  )
}
