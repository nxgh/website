import BigNumber from 'bignumber.js'
import dayjs from 'dayjs'
import * as echarts from 'echarts'
import { useRef, useEffect } from 'react'
import FundResponse from './api.response'

const Chart = ({
  title = '',
  data,
  loading,
}: {
  title: string
  data?: FundResponse['Data_netWorthTrend']
  loading: boolean
}) => {
  const ref = useRef<HTMLDivElement>(null!)

  useEffect(() => {
    if (!data) return

    const source = data.map((item) => ({ ...item, x: dayjs(item.x).format('YYYY/MM/DD') }))
    const myChart = echarts.init(ref.current)

    console.log(source)
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
        min: (value: {min: number, max: number}) => value.min,
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
            data: [
              {
                name: 'wtf',
                coord: ['2022/10/10', 2.149],
                symbol: 'circle',
                symbolSize: 10,
                itemStyle: {
                  color: '#00ff00',
                },
              },
              {
                name: 'wtf',
                coord: ['2022/01/14', 3.113],
                symbol: 'circle',
                symbolSize: 10,
                itemStyle: {
                  color: '#ff0000',
                },
              },
            ],
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(181, 213, 255)',
            },
            {
                offset: 1,
                color: 'rgb(36, 172, 242)',
              },
            ]),
          },
        },
      ],
    }

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option)
  }, [data])

  return <>{loading ? 'loading...' : <div style={{ width: '100%', height: '300px' }} ref={ref}></div>}</>
}

export default Chart
