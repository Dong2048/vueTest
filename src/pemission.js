//权限验证相关
import {router,AddRoutes} from '~/router'
import { getToken } from '~/composables/auth';
import{toast,startFullLoading,stopFullLoading} from "~/composables/util"
import store from './store';

// 全局前置守卫(路由发生变化就触发)
let hasGetInfo =false //防止重复加载getinfo
router.beforeEach(async(to,from,next)=>{
    const token= getToken();
    //  显示全屏loading
    startFullLoading();
    //没有登录，跳转登录页
    if(!token && to.path !="/login"){
        toast("请先登录","error")
        return next({path:"/login"})
    }
    let hasNewRoutes =false
    //如果用户登录了，自动获取用户信息，并存储在vuex当中
    if(token && !hasGetInfo){
      let{menus} = await store.dispatch("getinfo")
      hasGetInfo =true
      hasNewRoutes= AddRoutes(menus)
    }
    //设置页面title
    let title ="Lolita-"+(to.meta.title ?to.meta.title :"")
    document.title=title
    //放行,如果有新路由走next(to.fullpath)，否则走next()
    hasNewRoutes ? next(to.fullPath) : next()
    //全局后置守卫
    router.afterEach((to, from) =>stopFullLoading())
    //防止重复登录
    if(token && to.path =="/login"){
        toast("请勿重复登录","error")
        return next({path:from.path ? from.path : "/"})
    }
})