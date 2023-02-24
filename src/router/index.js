import {
    createRouter,
    createWebHashHistory
} from 'vue-router'
import Admin from '~/layouts/admin.vue'
import Index from '~/pages/index.vue'
import GoodsList from '~/pages/goods/list.vue'
import CategoryList from '~/pages/category/list.vue'
import Login from '~/pages/login.vue'
import NotFound from '~/pages/404.vue'

//这是默认路由所有用户共享
const routes = [{
    path: "/",
    name: 'admin',
    component: Admin,
}, {
    path: "/login",
    component: Login,
    meta: {
        title: "登录页"
    }
},
{
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
}
]

//动态路由，用于匹配菜单动态添加路由
const asynRoutes=[
        {
            path:"/",
            name: '/',
            component:Index,
            meta:{
                title:"后台首页"
            }
        },
        {
            path:"/goods/list",
            name: '/goods/list',
            component:GoodsList,
            meta:{
                title:"商品管理"
            }
        },
        {
            path:"/category/list",
            name: '/category/list',
            component:CategoryList,
            meta:{
                title:"分类管理"
            }
        }]

        //动态添加路由方法
        export function AddRoutes(menus){
            //是否有新的路由
            let hasNewRoutes= false
            const findAndAddRoutesByMenus =(array) =>{
                array.forEach(e => {
                    let item = asynRoutes.find(o=>o.path==e.frontpath)

                    //拿到菜单并且没有注册路由
                    if(item && !router.hasRoute(item.path)){
                        //注册路由
                        router.addRoute("admin",item)
                        hasNewRoutes= true
                    }
                    //递归调用注册字路由
                    if(e.child && e.child.length > 0){
                        findAndAddRoutesByMenus(e.child)
                    }
                });
            }
            findAndAddRoutesByMenus(menus);
            return hasNewRoutes
        }
export const router = createRouter({
    history: createWebHashHistory(),
    routes
})
