import { KeyboardEventHandler, useEffect, useRef, useState } from 'react'
import * as echarts from 'echarts'
import dayjs from 'dayjs'
import { Input } from 'antd'
import useJsonP from 'src/fund/useJsonp'
import FundResponse from 'src/fund/api.response'
import BigNumber from 'bignumber.js'

const filterDataMin = (data: FundResponse['Data_netWorthTrend']) => {}

const Chart = ({ data }: { data?: FundResponse['Data_netWorthTrend'] }) => {
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
        minInterval: 1
      },
      dataZoom: [
        {
          type: 'slider',
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
        formatter: (params: any) => { `${params[0].seriesName}: ${params[0].value.y};\n 日期: ${params[0].value.x}` }, 
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
        },
      ],
    }

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option)
  }, [data])

  return (
    <>
      <div style={{ width: '100%', height: '300px' }} ref={ref}></div>
    </>
  )
}

const useIndexedDB = () => {
  const [db, setDB] = useState()

  useEffect(() => {
    const request = window.indexedDB.open('fund', 2)
    request.onerror = (event) => {
      console.log('数据库打开报错')
    }
    request.onsuccess = (event) => {
      console.log('数据库打开成功')
    }
    request.onupgradeneeded = (event) => {
      const _db = event.target.result
      const objectStore = _db.createObjectStore('fund', { keyPath: 'id', autoIncrement: true })
      objectStore.createIndex('id', 'id', { unique: true })
      objectStore.createIndex('code', 'code', { unique: true })
      objectStore.createIndex('name', 'name', { unique: false })

      setDB(db)
    }
  }, [])

  return db
}

export default function Fund() {
  const [fundId, setFundId] = useState('002708')

  const data = useJsonP(fundId)

  console.log({ data })

  const db = useIndexedDB()

  return (
    <div>
      <Input
        defaultValue={fundId}
        onPressEnter={(e) => {
          setFundId(e.target.value)
        }}
      />
      <Chart data={data?.Data_netWorthTrend} />
    </div>
  )
}
