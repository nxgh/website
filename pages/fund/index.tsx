import { Alert, Input } from 'antd'
import dayjs from 'dayjs'
import { useLiveQuery } from 'dexie-react-hooks'
import { useEffect, useState } from 'react'

import { db } from 'src/db'
import { Chart, FundDetailTable, SideBar } from 'src/fund'
import useJsonP from 'src/fund/useJsonp'
import style from './index.module.scss'

import type { FundResponse } from 'src/fund'


export default function Fund() {
  const [fundId, setFundId] = useState('110020')

  useEffect(() => {
    document.querySelector('html')!.dataset.styleCover = 'true'
    return () => {
      document.querySelector('html')!.dataset.styleCover = 'false'
    }
  }, [])

  const markPointData = useLiveQuery(
    async () => await db.fundDetail.where('fS_code').equals(fundId).toArray(),
    [fundId]
  )

  const { data, error, loading } = useJsonP(fundId, {
    onSuccess: (data) => {
      addFund(data)
    },
  })

  async function addFund(data: FundResponse) {
    await db.fund.put(data)
  }

  return (
    <div className={style.FundWrap}>
      <div className={style.Side}>
        <Input onPressEnter={(e) => setFundId((e.target as HTMLInputElement).value)} />
        <SideBar onClick={(id) => setFundId(id)} />
      </div>
      <section className={style.FundDetailMain}>
        {!error ? (
          <Chart
            title={(data as FundResponse).fS_name}
            data={(data as FundResponse).Data_netWorthTrend}
            loading={loading}
            markPointData={
              markPointData?.map((item) => [dayjs(item.date).format('YYYY/MM/DD'), item.net, item.amount])!
            }
          />
        ) : (
          <Alert message={error.message} type="error" />
        )}
        <FundDetailTable fundId={fundId} />
      </section>
    </div>
  )
}
