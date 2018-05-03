import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/home'
// import Layout from '@/views/layout'
// import Project from '@/views/backend/project'
// import Doc from '@/views/backend/doc'
// import Workbench from '@/views/backend/workbench'
import Login from '@/components/login'
//import Modify from '@/views/backend/modify'
//import Gant from '@/views/backend/gant'
//import pageRouterView from "@/views/adManage/adManage.vue";


//按需加载，懒加载
let Layout = (resolve) =>{
  return require.ensure([], ()=>{
    resolve(require('@/views/layout'))
  })
};

let Doc = (resolve) => {
  return import('@/views/backend/doc')
};
let Table = (resolve) => {
  return import('@/views/backend/table')
};
let Echarts = (resolve) => {
  return import('@/views/backend/echarts')
};
let Editor = (resolve) => {
  return import('@/views/backend/editor')
};

Vue.use(Router)

let router = new Router({
	//去除url上的"#""
	mode: 'history',
  linkActiveClass: 'is-active',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        breadcrumbName: '首页'
      }
    },
    {
    	path: '/',
      name: 'Management',
      component: Layout,
      meta: {
        breadcrumbName: '首页'
      },
      children: [
        {
          path: '/table',
          name: 'Table',
          component: Table,
          meta: {
            login: true,
            breadcrumbName: '我的项目'
          }
        },

        {
          path: '/doc',
          name: 'Doc',
          component: Doc,
          meta: {
            login: false,
            breadcrumbName:'我的文档'
          }
        },{
    	    path: '/table',
          name: 'Table',
          component: Table,
          meta: {
    	      login: true,
            breadcrumbName: '基础表格'
          }
        },{
          path: '/echarts',
          name: 'Echarts',
          component: Echarts,
          meta: {
            login: true,
            breadcrumbName: '图表'
          }
        },{
          path: '/editor',
          name: 'Editor',
          component: Editor,
          meta: {
            login: true,
            breadcrumbName: '编辑器'
          }
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})

/*
to:route:即将要进入的目标路由对象
from:route:当前导航正要离开的路由
next:Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。

*/
router.beforeEach((to, from, next) => {
  console.log(to.matched)
  let bl = to.matched.some(function(item){
    return item.meta.login
  });

  if(to.matched.some((item) => item.meta.login)){

    console.log(router.app)
    let info = router.app.$local.fetch("miaov")

    if(info.login){  // 已经登录
        next()
    }else{
      router.push({
        path: '/login',
        query: {
          redirect: to.path.slice(1)
        }
      })
    }

  }else{
    next()
  }



})




export default router
