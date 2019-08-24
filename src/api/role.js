import request from '../utils/request.js'

export const handledelete = roleId => request({
  url: `roles/${roleId}`,
  method: 'DELETE'
}).then(res => res.data)

export const handleAddRole = data => request({
  url: 'roles',
  method: 'POST',
  data: {
    roleName: data.roleName,
    roleDesc: data.roleDesc
  }
}).then(res => res.data)

export const getEditRole = roleId => request({
  url: `roles/${roleId}`,
  method: 'GET'
}).then(res => res.data)

export const submitEditRole = item => request({
  url: `roles/${item.roleId}`,
  method: 'PUT',
  data: {
    roleName: item.roleName,
    roleDesc: item.roleDesc
  }
}).then(res => res.data)

export const submitRoleRights = (roleId, temp) => request({
  url: `roles/${roleId}/rights`,
  method: 'POST',
  data: {
    rids: temp
  }
}).then(res => res.data)

export const deleteRoleRight = (role, rid) => request({
  url: `roles/${role.id}/rights/${rid.id}`,
  method: 'DELETE'
}).then(res => res.data)
