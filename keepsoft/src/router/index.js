import Vue from 'vue'
import Router from 'vue-router'
import Menu from '@/components/Menu'
import RecuperarSenha from '@/components/RecuperarSenha'
import ConfirmEmail from '@/components/ConfirmEmail'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      redirect: '/'
    },{
    path: '/',
    name: 'Menu',
    component: Menu,
    children: [{
      path: '/senha/:id',
      props: true,
      name: 'RecuperarSenha',
      component: RecuperarSenha,
    }, {
      path: '/confirmEmail/:id',
      props: true,
      name: 'Confirmar Email',
      component: ConfirmEmail,
    }]
  }]
})
