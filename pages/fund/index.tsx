import { useEffect, useRef, useState } from 'react'
import Script from 'next/script'
import * as echarts from 'echarts'
import dayjs from 'dayjs'
import { Input } from 'antd'

const FundApi = (id) => `https://fund.eastmoney.com/pingzhongdata/${id}.js`

interface IData_netWorthTrend {
  x: number
  y: number
  equityReturn: number
  unitMoney: string
}

const Chart = ({ data }: { data: IData_netWorthTrend[] }) => {
  const ref = useRef<HTMLDivElement>(null!)

  useEffect(() => {
    const myChart = echarts.init(ref.current)

    // 指定图表的配置项和数据
    const option = {
      dataset: {
        source: data.map((item) => ({ ...item, x: dayjs(item.x).format('YYYY/MM/DD') })),
      },
      xAxis: {
        type: 'time',
      },
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

const useJsonP = (fundId) => {
  // useEffect(() => {

  const jsonp = () => {
    const script = document.createElement('script')
    script.src = FundApi(fundId)
    script.defer = true
    script.id = 'fund-script'
    document.body.appendChild(script)

    return new Promise((resolve, reject) => {
      try {
        script.onload = () => {
          resolve(window.fS_name)
        }
      } catch (error) {
        script.onerror = () => {
          reject()
        }
      } finally {
        document.querySelector('#fund-script')?.remove()
      }
    })
  }

  useEffect(() => {
    if (!fundId) return
    jsonp(fundId).then((res) => {
      console.log(res)
    })
  }, [fundId])

  // }, [fundId])
}

export default function Fund() {
  const [fundId, setFundId] = useState('002708')

  // const [fundData, setFundData] = useState<any>([])

  useJsonP(fundId)

  return (
    <div>
      <Input
        defaultValue={fundId}
        onPressEnter={(e) => {
          setFundId(e.target.value)
        }}
      />
      {/* <AddScript fundId={fundId} /> */}
      {/* <Chart data={fundData} /> */}
    </div>
  )
}
