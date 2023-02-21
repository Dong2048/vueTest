//权限验证相关
import router from '~/router'
import { getToken } from '~/composables/auth';
import{toast,startFullLoading,stopFullLoading} from "~/composables/util"
import store from './store';
// 全局前置守卫(路由发生变化就触发)
router.beforeEach(async(to,from,next)=>{
    const token= getToken();
    //  显示全屏loading
    startFullLoading();
    //没有登录，跳转登录页
    if(!token && to.path !="/login"){
        toast("请先登录","error")
        return next({path:"/login"})
    }
    //如果用户登录了，自动获取用户信息，并存储在vuex当中
    if(token){
       await store.dispatch("getinfo")
    }

    //设置页面title
    let title ="Lolita-"+(to.meta.title ?to.meta.title :"")
    document.title=title
    next() //放行
    //全局后置守卫
    router.afterEach((to, from) =>stopFullLoading())
    //防止重复登录
    if(token && to.path =="/login"){
        toast("请勿重复登录","error")
        return next({path:from.path ? from.path : "/"})
    }
})