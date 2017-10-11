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

var router =  new Router({
  mode : 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      meta: {title: '柒天伞客'},
      component: CheckAuth
    },
    {
      path: '/register',
      name: 'Register',
      meta: {title: '注册'},
      component: Register
    },
    {
      path: '/about',
      name: 'about',
      meta: {title: '关于我们'},
      component: About
    },
    {
      path: '/comment',
      name: 'Comment',
      meta: {title: '我要反馈'},
      component: Comment
    },
    {
      path: '/customer',
      name: 'Customer',
      meta: {title: '个人资料'},
      component: Customer
    },
    {
      path: '/customer/edit',
      component: CustomerEdit
    },
    {
      path: '/account',
      name: 'Account',
      meta: {title: '我的钱包'},
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
      name: 'Hire',
      meta: {title: '用伞记录'},
      component: Hire
    },
    {
      path: '/hire/view/:id',
      component: HireView
    },
    {
      path: '/payment',
      name: 'Payment',
      meta: {title: '资金记录'},
      component: Payment
    },
    {
      path: '/payment/view/:id',
      component: PaymentView
    },
    {
      path: '/help',
      name: 'Help',
      meta: {title: '帮助中心'},
      component: Help
    },
    {
      path: '/help/:id',
      name: 'help-view',
      component: HelpView
    },
    {
      path: '/map',
      name: 'Map',
      meta: {title: '柒天伞客'},
      component: Map
    },
    {
      path: '/register-protocol',
      name: 'RegisterProtocol',
      meta: {title: '注册协议'},
      component: RegisterProtocol
    },
    {
      path: '/recharge-protocol',
      name: 'RechargeProtocol',
      meta: {title: '充值协议'},
      component: RechargeProtocol
    }
  ]
});
router.afterEach((transition) => {
  if( transition.meta.title ){
    document.title = transition.meta.title;
  }
});
export default router;
