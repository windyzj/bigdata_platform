import request from '@/utils/request'

const api_name = '/admin/statistics'

export default {

  getPvData(days,dt) {
    console.log(days)
    if(!days||days<1){
      days=7
    }
    return request({
      url: `/pvCount?days=${days}&dt=${dt}`,
      method: 'get'
    })
  },

  getUvData(days,dt) {
    if(!days||days<1){
      days=7
    }
    return request({
      url: `/uvCount?days=${days}&dt=${dt}`,
      method: 'get'
    })
  },

  
  getNewVisitStats(days,dt) {
    if(!days||days<1){
      days=7
    }
    return request({
      url: `/newVisitStats?days=${days}&dt=${dt}`,
      method: 'get'
    })
  },

  getVisitTotalData(days,dt) {
    if(!days||days<1){
      days=7
    }
    return request({
      url: `/visitTotal?days=${days}&dt=${dt}`,
      method: 'get'
    })
  },

  getChannelPvData(days,dt) {
    if(!days||days<1){
      days=7
    }
    return request({
      url: `/channel?days=${days}&t=pv&dt=${dt}`,
      method: 'get'
    })
  },
  getChannelBounceData(days,dt) {
    if(!days||days<1){
      days=7
    }
    return request({
      url: `/channel?days=${days}&t=br&dt=${dt}`,
      method: 'get'
    })
  },
  getPagePathData(days,dt) {
    if(!days||days<1){
      days=7
    }
    return request({
      url: `/pagePath?days=${days}&dt=${dt}`,
      method: 'get'
    })
  },
  getUserActionConvertData(days,dt) {
    if(!days||days<1){
      days=7
    }
    return request({
      url: `/userActionConvert?days=${days}&dt=${dt}`,
      method: 'get'
    })
  },
  getUserPaidData(days,dt) {
    if(!days||days<1){
      days=7
    }
    return request({
      url: `/userPaid?days=${days}&dt=${dt}`,
      method: 'get'
    })
  },
  getSpuTopNData(days,num,dt) {
    if(!days||days<1){
      days=7
    }
    if(!num||num<1){
      num=7
    }
    return request({
      url: `/spu?days=${days}&num=${num}&dt=${dt}&t=CT`,
      method: 'get'
    })
  },
  getSpuGMVData(days,num,dt) {
    if(!days||days<1){
      days=7
    }
    if(!num||num<1){
      num=7
    }
    return request({
      url: `/spu?days=${days}&num=${num}&dt=${dt}&t=GMV`,
      method: 'get'
    })
  },
  getTmTopNData(days,num,dt) {
    if(!days||days<1){
      days=7
    }
    return request({
      url: `/tm?days=${days}&num=${num}&dt=${dt}`,
      method: 'get'
    })
  },
  getOrderCategoryData(days,num,dt) {
    if(!days||days<1){
      days=7
    }
    return request({
      url: `/category?days=${days}&num=${num}&dt=${dt}`,
      method: 'get'
    })
  },
  getOrderAreaData(days,dt) {
    if(!days||days<1){
      days=7
    }
    return request({
      url: `/area?days=${days}&dt=${dt}`,
      method: 'get'
    })
  },
  getOrderTotalData(days,dt) {
    if(!days||days<1){
      days=7
    }
    return request({
      url: `/orderTotal?days=${days}&dt=${dt}`,
      method: 'get'
    })
  },
  getUserTotalData(days,dt) {
    if(!days||days<1){
      days=7
    }
    return request({
      url: `/userTotal?days=${days}&dt=${dt}`,
      method: 'get'
    })
  },
  getDauRealtimeData (td ) {
    return request({
      url: `/dauRealtime?td=${td} `,
      method: 'get'
    })
  },
  getGenderStatsByItem(date,itemName){
    return request({
      url: `/statsByItem?t=gender&date=${date}&itemName=${itemName} `,
      method: 'get'
    })
  },
  getAgeStatsByItem(date,itemName){
    return request({
      url: `/statsByItem?t=age&date=${date}&itemName=${itemName} `,
      method: 'get'
    })
  },
  getDetailStatsByItem(date,itemName,pageNo,pageSize){
    return request({
      url: `/detailByItem?date=${date}&itemName=${itemName}&pageNo=${pageNo}&pageSize=${pageSize} `,
      method: 'get'
    })
  },
  getUserRetention(date ){
    return request({
      url: `/userRetention?dt=${date}  `,
      method: 'get'
    })
  },
  getActivity(name,date ,curPageNo,pageSize){
    return request({
      url: `/activity?name=${name}&dt=${date}&pageNo=${curPageNo}&pageSize=${pageSize} `,
      method: 'get'
    })
  },
  getCoupon(name,date ,curPageNo,pageSize){
    return request({
      url: `/coupon?name=${name}&dt=${date}&pageNo=${curPageNo}&pageSize=${pageSize} `,
      method: 'get'
    })
  },
  getTmRepeat(days,num,dt){
    if(!days||days<1){
      days=7
    }
    return request({
      url: `/tmRepeat?days=${days}&num=${num}&dt=${dt}`,
      method: 'get'
    })
  }
}
