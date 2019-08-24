import request from '../utils/request.js'

export const getRightList = type => request({
  method: 'GET',
  url: `rights/${type}`
}).then(res => res.data)

export const getRightsMenu = () => request({
  method: 'GET',
  url: 'menus'
}).then(res => res.data)
