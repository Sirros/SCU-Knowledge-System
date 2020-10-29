import Vue from 'vue'
import VueRouter from 'vue-router'
import Menu from '../views/Menu.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Menu',
    component: Menu,
    redirect: '/sys/home',
    children: [
      {
        path: 'sys/home',
        component: () => import('../views/Home.vue'),
        meta: { title: '首页' }
      },
      {
        path: 'sys/about',
        component: () => import('../views/About.vue'),
        meta: { title: '个人中心' }
      },
      {
        path: 'sys/bp',
        component: () => import('../views/mysave/MySave.vue'),
        // meta: { title: '脑图' }
      },
      {
        path: 'sys/repository/:id',
        component: () => import('../views/repository/YaTi.vue'),
        meta: { 
          title: '知识库',
          keepAlive: false
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/register/Register.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
