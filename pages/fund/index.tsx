import { useEffect, useRef, useState } from 'react'
import * as echarts from 'echarts'
import dayjs from 'dayjs'
import { Alert, Input } from 'antd'
import BigNumber from 'bignumber.js'
import { useLiveQuery } from 'dexie-react-hooks'

import useJsonP from 'src/fund/useJsonp'
import FundResponse from 'src/fund/api.response'
import style from './index.module.css'
import { db } from 'src/db'

const filterDataMin = (data: FundResponse['Data_netWorthTrend']) => {}

const Chart = ({ data, loading }: { data?: FundResponse['Data_netWorthTrend']; loading: boolean }) => {
  const ref = useRef<HTMLDivElement>(null!)

  useEffect(() => {
    if (!data) return
    const myChart = echarts.init(ref.current)

    // 指定图表的配置项和数据
    const option = {
      dataset: {
        source: data.map((item) => ({ ...item, x: dayjs(item.x).format('YYYY/MM/DD') })),
      },
      xAxis: {
        type: 'time',
        minInterval: 1,
      },
      dataZoom: [
        {
          type: 'inside',
          start: 95,
          end: 100,
          minValueSpan: 3600 * 24 * 1000 * 7,
        },
      ],
      yAxis: {
        type: 'value',
        min: (value: { min: number; max: number }) => new BigNumber(value.min).minus(0.01).toNumber(),
        // max: 'dataMax',
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params: any) => {
          ;`${params[0].seriesName}: ${params[0].value.y};\n 日期: ${params[0].value.x}`
        },
      },
      series: [
        {
          itemStyle: {
            opacity: 0,
          },
          emphasis: {
            label: {
              show: true,
            },
          },
          type: 'line',
          name: '净值',
          areaStyle: {},
          markPoint: {
            data: [{
              name: 'wtf',
              coord: data.map((item) => ({ ...item, x: dayjs(item.x).format('YYYY/MM/DD') }))[100]
            }],
          },
        },
      ],
    }

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option)
  }, [data])

  return <>{loading ? 'loading...' : <div style={{ width: '100%', height: '300px' }} ref={ref}></div>}</>
}

const SideBar = () => {
  const funds = useLiveQuery(async () => await db.fund.toArray())

  console.log(funds)

  return (
    <>
      {funds?.map((item) => (
        <p key={item.fS_code}>
          {item.fS_name} {item.fS_code}
        </p>
      ))}
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
        <Chart data={(data as FundResponse).Data_netWorthTrend} loading={loading} />
      ) : (
        <Alert message={error.message} type="error" />
      )}
    </div>
  )
}
