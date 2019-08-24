import Vue from 'vue'
import Router from 'vue-router'
import Login from '..//views/Login/Login.vue'
import Layout from '../views/Layout/Layout.vue'
import Home from '../views/Home/Home.vue'
import UserList from '../views/User/UserList.vue'
import Rights from '../views/Rights/Right.vue'
import Roles from '../views/Rights/Roles.vue'
import Goods from '../views/Goods/Goods.vue'
import addGoods from '../views/Goods/addGoods.vue'
import Params from '../views/Goods/Params.vue'
import OrderManage from '../views/OrderManage/OrderManage.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/login', component: Login },
    {
      path: '/',
      component: Layout,
      children: [
        { path: '', component: Home },
        { path: '/users', component: UserList },
        { path: '/rights', component: Rights },
        { path: '/roles', component: Roles },
        { path: '/goods', component: Goods },
        { path: '/addgoods', component: addGoods },
        { path: '/orders', component: OrderManage },
        { path: '/params', component: Params }
      ]
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    return next()
  }
  if (!window.localStorage.getItem('token')) {
    return router.replace('/login')
  }
  next()
})
export default router
