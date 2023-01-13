import { useEffect, useState } from 'react'
import { FundResponse, WindowFundResponse } from './api.response.d'

const FormatFundResponse = (w: WindowFundResponse): FundResponse => ({
  fS_name: w.fS_name,
  fS_code: w.fS_code,
  fund_sourceRate: w.fund_sourceRate,
  fund_Rate: w.fund_Rate,
  fund_minsg: w.fund_minsg,
  stockCodes: w.stockCodes,
  zqCodes: w.zqCodes,
  stockCodesNew: w.stockCodesNew,
  zqCodesNew: w.zqCodesNew,
  syl_1n: w.syl_1n,
  syl_6y: w.syl_6y,
  syl_3y: w.syl_3y,
  syl_1y: w.syl_1y,
  Data_fundSharesPositions: w.Data_fundSharesPositions,
  Data_netWorthTrend: w.Data_netWorthTrend,
  Data_ACWorthTrend: w.Data_ACWorthTrend,
  Data_rateInSimilarType: w.Data_rateInSimilarType,
  Data_rateInSimilarPersent: w.Data_rateInSimilarPersent,
  Data_fluctuationScale: w.Data_fluctuationScale,
  Data_holderStructure: w.Data_holderStructure,
  Data_assetAllocation: w.Data_assetAllocation,
  Data_performanceEvaluation: w.Data_performanceEvaluation,
  Data_buySedemption: w.Data_buySedemption,
})

const FundApi = (id: string) => `https://fund.eastmoney.com/pingzhongdata/${id}.js`

const jsonp = (fundId: string): Promise<FundResponse> => {
  const script = document.createElement('script')
  script.src = FundApi(fundId)
  script.defer = true
  script.id = 'fund-script'
  document.body.appendChild(script)

  return new Promise((resolve, reject) => {
    try {
      script.onload = () => {
        resolve(FormatFundResponse(window as unknown as WindowFundResponse))
      }
      script.onerror = (error) => {
        reject(new Error('fundId is not match'))
      }
    } finally {
      document.querySelector('#fund-script')?.remove()
    }
  })
}

export const useJsonP = (
  fundId: string,
  config?: {
    onSuccess?: (data: FundResponse) => void
    onError?: (error: Error) => void
  }
) => {
  const [response, setResponse] = useState<{
    data?: FundResponse | {}
    loading: boolean
    error: Error | null
  }>({
    data: {},
    loading: false,
    error: null,
  })

  useEffect(() => {
    if (!fundId) return

    jsonp(fundId)
      .then((res) => {
        setResponse({ data: res, loading: false, error: null })
        config?.onSuccess && config.onSuccess(res)
      })
      .catch((error) => {
        setResponse({ data: {}, loading: false, error: error })
        config?.onError && config.onError(error)
      })
  }, [fundId])

  return response
}

export default useJsonP
