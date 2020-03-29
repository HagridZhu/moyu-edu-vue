import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import login from '@/view/login/login'
import home from '@/view/home/home'
import paper from '@/view/paper/paper'
import paperDetail from '@/view/paper/paper-detail'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/exam',
      name: 'exam',
      component: HelloWorld
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      children: [
        {
          path: 'paper',
          component: paper
        },
        {
          path: 'paperDetail',
          component: paperDetail
        }
      ]
    }

  ]
})
