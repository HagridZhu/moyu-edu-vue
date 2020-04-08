import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import login from '@/view/login/login'
import home from '@/view/home/home'
import paper from '@/view/paper/paper'
import paperDetail from '@/view/paper/paper-detail'
import paperAnswerTable from '@/view/paper/paper-answer-table'
import answering from '@/view/answer/answering'
import answered from '@/view/answer/answered'
import classTable from '@/view/class/class-table'
import classUserTable from '@/view/class/class-user-table'

Vue.use(Router)

const router = new Router({
  base: '/haige/vue/exam/',
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
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
        },
        {
          path: 'paper/answer',
          component: paperAnswerTable
        },
        {
          path: 'class',
          component: classTable
        },
        {
          path: 'class/user',
          component: classUserTable
        }
      ]
    },
    {
      path: '/paper/answering',
      component: answering
    },
    {
      path: '/paper/answered',
      component: answered
    }

  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  } else {
    let token = localStorage.getItem('Authorization')
    if (token === 'null' || token === '') {
      next('/login')
    } else {
      next()
    }
  }
})

export default router
