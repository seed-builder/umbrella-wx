import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
import CheckAuth from '@/views/auth/CheckAuth'
import Register from '@/views/auth/Register'
import About from '@/views/about/Index'

import Customer from '@/views/customer/Index'
import CustomerEdit from '@/views/customer/Edit'

import Account from '@/views/customer-account/Index'
import AccountDeposit from '@/views/customer-account/Deposit'
import AccountWithdraw from '@/views/customer-account/Withdraw'

import Hire from '@/views/customer-hire/Index'
import HireView from '@/views/customer-hire/View'

import Payment from '@/views/customer-payment/Index'
import PaymentView from '@/views/customer-payment/View'

import Help from '@/views/help/Index'
import HelpView from '@/views/help/View'
import Map from '@/views/map/Index'

import RegisterProtocol from '@/views/protocol/Register'
import RechargeProtocol from '@/views/protocol/Recharge'

import Comment from '@/views/comment/Index'

Vue.use(Router)

export default new Router({
  mode : 'history',
  routes: [
    {
      path: '/',
      component: CheckAuth
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/about',
      component: About
    },
    {
      path: '/comment',
      component: Comment
    },
    {
      path: '/customer',
      component: Customer
    },
    {
      path: '/customer/edit',
      component: CustomerEdit
    },
    {
      path: '/account',
      component: Account
    },
    {
      path: '/account/deposit',
      component: AccountDeposit
    },
    {
      path: '/account/withdraw',
      component: AccountWithdraw
    },
    {
      path: '/hire',
      component: Hire
    },
    {
      path: '/hire/view/:id',
      component: HireView
    },
    {
      path: '/payment',
      component: Payment
    },
    {
      path: '/payment/view/:id',
      component: PaymentView
    },
    {
      path: '/help',
      component: Help
    },
    {
      path: '/help/:id',
      name: 'help-view',
      component: HelpView
    },
    {
      path: '/map',
      component: Map
    },
    {
      path: '/register-protocol',
      component: RegisterProtocol
    },
    {
      path: '/recharge-protocol',
      component: RechargeProtocol
    }
  ]
})
