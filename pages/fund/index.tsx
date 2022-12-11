import { useEffect, useRef, useState } from 'react'
import Script from 'next/script'
import * as echarts from 'echarts'
import dayjs from 'dayjs'
import { Input } from 'antd'
import useJsonP from 'src/fund/useJsonp'
import FundResponse from 'src/fund/api.response'

interface IData_netWorthTrend {
  x: number
  y: number
  equityReturn: number
  unitMoney: string
}

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
        boundaryGap: false,
        type: 'time',
      },
      dataZoom: [
        {
          type: 'inside',
          start: 0,
          end: 10
        },
        {
          start: 0,
          end: 10
        }
      ],
      yAxis: {
        type: 'value',
      },
      tooltip: {
        trigger: 'axis',
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
          areaStyle: {}
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

export default function Fund() {
  const [fundId, setFundId] = useState('002708')

  const data = useJsonP(fundId)

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
