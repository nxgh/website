type N = Array<Array<number, number>>

export type WindowFundResponse = typeof globalThis & FundResponse

export interface FundResponse {
  /*基金或股票信息*/
  fS_name: string
  fS_code: string
  /*原费率*/
  fund_sourceRate: string
  /*现费率*/
  fund_Rate: string
  /*最小申购金额*/
  fund_minsg: string
  /*基金持仓股票代码*/
  stockCodes: string[]
  /*基金持仓债券代码*/
  zqCodes: string
  /*基金持仓股票代码(新市场号)*/
  stockCodesNew: string[]
  /*基金持仓债券代码（新市场号）*/
  zqCodesNew: string
  /*收益率*/
  /*近一年收益率*/
  syl_1n: string
  /*近6月收益率*/
  syl_6y: string
  /*近三月收益率*/
  syl_3y: string
  /*近一月收益率*/
  syl_1y: string
  /*股票仓位测算图*/
  Data_fundSharesPositions: Array<Array<number, number>>

  /*单位净值走势 equityReturn-净值回报 unitMoney-每份派送金*/
  Data_netWorthTrend: Array<{ x: number; y: number; enquityReturn: number; unitMoney: string }>

  /*累计净值走势*/
  Data_ACWorthTrend: Array<{ anme: string; data: Array<Array<number, number>> }>
  /*同类排名走势*/
  Data_rateInSimilarType: Array<{ x: number; y: number; sc: string }>

  /*同类排名百分比*/
  Data_rateInSimilarPersent: N
  /*规模变动 mom-较上期环比*/
  Data_fluctuationScale: {
    categories: string[]
    series: { y: number; mom: string }[]
  }
  /*持有人结构*/
  Data_holderStructure: { series: { name: string; data: number }[] }
  /*资产配置*/
  Data_assetAllocation: {
    series: {
      name: string
      type: null | string
      data: number[]
      yAixs: number
    }
  }
  /*业绩评价 ['选股能力', '收益率', '抗风险', '稳定性','择时能力']*/
  Data_performanceEvaluation: Array<any>
  /*申购赎回*/
  Data_buySedemption: {
    series: {
      name: string
      data: number[]
    }
  }
}

export default FundResponse
