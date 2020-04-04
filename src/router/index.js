import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import login from '@/view/login/login'
import home from '@/view/home/home'
import paper from '@/view/paper/paper'
import paperDetail from '@/view/paper/paper-detail'
import paperAnswerTable from '@/view/paper/paper-answer-table'
import answering from '@/view/answer/answering'

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
        },
        {
          path: 'paper/answer',
          component: paperAnswerTable
        }
      ]
    },
    {
      path: '/paper/answering',
      component: answering
    }

  ]
})
