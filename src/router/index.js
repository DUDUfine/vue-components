import Vue from 'vue'
import Router from 'vue-router'
import duDate from '../components/duDate'
import selectDown from '../components/selectDown'
import carousel from '../components/carousel'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/duDate',
      component: duDate
    },
    {
      path: '/selectDown',
      component: selectDown
    },
    {
      path: '/carousel',
      component: carousel
    }
  ]
})
