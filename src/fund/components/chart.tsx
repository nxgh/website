import dayjs from 'dayjs'
import * as echarts from 'echarts'
import { useEffect, useRef } from 'react'

import type { FundResponse } from 'src/fund'

type DateString = string
type Net = number
type Amount = number

const Chart = ({
  title = '',
  data,
  loading,
  markPointData = [],
}: {
  title: string
  data?: FundResponse['Data_netWorthTrend']
  loading: boolean
  markPointData: [DateString, Net, Amount][]
}) => {
  const ref = useRef<HTMLDivElement>(null!)

  useEffect(() => {
    if (!data) return

    const source = data.map((item) => ({ ...item, x: dayjs(item.x).format('YYYY/MM/DD') }))
    const myChart = echarts.init(ref.current)

    const option = {
      dataset: {
        source,
      },
      tooltip: {
        trigger: 'axis',
      },
      title: {
        left: 'center',
        text: `『${title}』历史净值`,
      },

      toolbox: {
        feature: {
          dataZoom: {
            yAxisIndex: 'none',
          },
          restore: {},
          saveAsImage: {},
        },
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
      },
      yAxis: {
        type: 'value',
        min: (value: { min: number; max: number }) => value.min,
      },
      dataZoom: [
        {
          type: 'inside',
          start: 90,
          end: 100,
          minValueSpan: 10,
        },
        {
          start: 90,
          end: 100,
        },
      ],
      series: [
        {
          name: '净值',
          type: 'line',
          showSymbol: false,
          sampling: 'lttb',
          itemStyle: {
            color: 'rgb(181, 213, 255)',
          },
          markPoint: {
            label: '买入',
            data: markPointData?.map(([date, net, amount]) => ({
              name: amount > 0 ? '买入' : '卖出',
              coord: [date, net],
              symbol: 'circle',
              symbolSize: 10,
              itemStyle: {
                color: amount < 0 ? '#00ff00' : '#ff0000',
              },
            })),
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(181, 213, 255)',
              },
              {
                offset: 1,
                // color: 'rgb(36, 172, 242)',
                color: '#aaddd5'
              },
            ]),
          },
        },
      ],
    }

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option)
  }, [data, markPointData])

  return <>{loading ? 'loading...' : <div style={{ width: '100%', height: '300px' }} ref={ref}></div>}</>
}

export default Chart
