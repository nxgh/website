/** 基金实时信息 */
export const fundRealTime = (code: string) => `http://fundgz.1234567.com.cn/js/${code}.js?rt=${Date.now()}`

/** 基金详细信息 */
export const fundDetail = (code: string) => `http://fund.eastmoney.com/pingzhongdata/${code}.js?v=${Date.now()}`

/** 基金名称代码 */
export const fundNameCode = () => `http://fund.eastmoney.com/js/fundcode_search.js`