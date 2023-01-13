import { Button, Drawer, Tooltip } from 'antd'
import { useLiveQuery } from 'dexie-react-hooks'
import { useState } from 'react'

import { db } from 'src/db'
import FundDetail from './FundDetail'
import style from './index.module.scss'

const SideBar = ({ onClick }: { onClick: (id: string) => void }) => {
  const funds = useLiveQuery(async () => await db.fund.toArray()) || []

  const [open, setOpen] = useState(false)
  const [fundId, setFundId] = useState('')

  return (
    <>
      {funds?.map((item) => (
        <div key={item.fS_code} className={style.SideBarItem}>
          <span
            onClick={() => {
              onClick(item.fS_code)
            }}
          >
            {item.fS_name} ({item.fS_code})
          </span>
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
        </div>
      ))}
      <Drawer size="large" title="设置基金持仓详细" placement="left" onClose={() => setOpen(false)} open={open}>
        <FundDetail fund={funds.find((item) => item.fS_code === fundId)!} />
      </Drawer>
    </>
  )
}

export default SideBar
