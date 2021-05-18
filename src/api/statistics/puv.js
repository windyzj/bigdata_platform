import request from '@/utils/request'

const api_name = '/admin/statistics'

export default {

  getPuvData() {
    return request({
      url: `${api_name}/getPuvData`,
      method: 'get'
    })
  }
}
