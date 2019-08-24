import request from '../utils/request.js'

export const getAllGoods = ({ pagenum = 1, pagesize, query = '' }) => request({
  url: 'goods',
  method: 'GET',
  params: {
    pagenum,
    pagesize,
    query
  }
}).then(res => res.data)

export const getcategories = (type = 3) => request({
  url: 'categories',
  method: 'GET',
  params: {
    type
  }
}).then(res => res.data)

export const getcategoriesArrs = (attrid, sel = 'many') => request({
  url: `categories/${attrid}/attributes`,
  method: 'GET',
  params: {
    sel: sel
  }
}).then(res => res.data)

export const upload = files => {
  const formData = new window.FormData()
  formData.append('file', files)
  return request({
    url: 'upload',
    method: 'POST',
    data: formData
  }).then(res => res.data)
}

// export const handleSubmit = ({
//   goods_name,
//   goods_cat,
//   goods_price,
//   goods_number,
//   goods_weight,
//   goods_introduce,
//   arrs,
//   pics
// }) => request({
//   url: 'goods',
//   method: 'POST',
//   data: {
//     goods_name,
//     goods_cat,
//     goods_price,
//     goods_number,
//     goods_weight,
//     goods_introduce,
//     arrs,
//     pics
//   }.then(res => res.data)
// })
export const handlesubmit = (form, arrs, pics) => request({
  url: 'goods',
  method: 'POST',
  data: {
    goods_name: form.goods_name,
    goods_cat: form.goods_cat.join(','),
    goods_price: form.goods_price,
    goods_number: form.goods_number,
    goods_weight: form.goods_weight,
    goods_introduce: form.goods_introduce,
    arrs: arrs,
    pics: pics
  }
}).then(res => res.data)
