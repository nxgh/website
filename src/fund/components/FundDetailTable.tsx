import { Table } from 'antd'
import { useLiveQuery } from 'dexie-react-hooks'

import dayjs from 'dayjs'
import { db, FundDetail } from 'src/db'

const FundDetailTable = ({ fundId }: { fundId: string }) => {
  const dataSource = useLiveQuery(async () => await db.fundDetail.where('fS_code').equals(fundId).toArray(), [fundId])

  dataSource?.sort(({ date: dateA }: FundDetail, { date: dateB }: FundDetail) =>
    dayjs(dateA).isBefore(dayjs(dateB), 'day') ? -1 : dayjs(dateA).isSame(dayjs(dateB), 'day') ? 0 : 1
  )
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
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
    },
  ]

  return <Table style={{ padding: '0 5vw'}} size="small" dataSource={dataSource} columns={columns} />
}

export default FundDetailTable
