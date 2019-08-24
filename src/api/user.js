import request from '../utils/request.js'
export const userlist = ({ pagenum = 1, pagesize = 5, query = '' }) => {
  return request({
    url: '/users',
    method: 'GET',
    params: {
      pagenum,
      pagesize,
      query
    }
  })
}

export const adduser = (data) => {
  return request({
    url: '/users',
    method: 'POST',
    data: {
      username: data.username,
      password: data.password,
      email: data.email,
      mobile: data.mobile
    }
  }).then(res => res.data)
}

export const statechange = (item) => request({
  url: `users/${item.id}/state/${item.mg_state}`,
  method: 'PUT'
}).then(res => res.data)

export const handledelete = (id) => request({
  url: `users/${id}`,
  method: 'DELETE'
}).then(res => res.data)

export const showedit = id => request({
  url: `users/${id}`,
  method: 'GET'
}).then(res => res.data)

export const submitEdit = data => request({
  url: `users/${data.id}`,
  method: 'PUT',
  data: {
    email: data.email,
    mobile: data.mobile
  }
}).then(res => res.data)

export const getInfo = (id) => request({
  url: `users/${id}`,
  method: 'GET'
}).then(res => res.data)

export const showrole = () => request({
  url: 'roles',
  method: 'GET'
}).then(res => res.data)

export const handlerole = (id, roleid) => request({
  url: `users/${id}/role`,
  method: 'PUT',
  data: {
    rid: roleid
  }
}).then(res => res.data)
