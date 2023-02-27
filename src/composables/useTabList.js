import { ref } from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router';
import { useCookies } from '@vueuse/integrations/useCookies'
import { router } from '~/router';
export function useTabList() {
    const cookie = useCookies()
    const route = useRoute()
    const activeTab = ref(route.path)
    const tabList = ref([
        {
            title: '后台首页',
            path: '/',
        }
    ])
    //添加标题导航
    function addTab(tab) {
        let noTab = tabList.value.findIndex(t => t.path == tab.path) == -1
        if (noTab) {
            tabList.value.push(tab)
        }
        cookie.set("tabList", tabList.value)
    }
    //初始化标签导航列表
    function initTabList() {
        let tbs = cookie.get("tabList")
        if (tbs) {
            tabList.value = tbs
        }
    }
    initTabList()
    //路由监听
    onBeforeRouteUpdate((to, from) => {
        activeTab.value = to.path
        addTab({
            title: to.meta.title,
            path: to.path
        })
    })
    //变化事件
    const changeTab = (t) => {
        activeTab.value = t
        router.push(t)
    }
    //关闭事件
    const removeTab = (t) => {
        let tabs = tabList.value
        let a = activeTab.value
        //关闭的是当前页
        if (a == t) {
            tabs.forEach((tab, index) => {
                //移动标签的index
                if (tab.path == t) {
                    const nextTab = tabs[index + 1] || tabs[index - 1]
                    if (nextTab) {
                        a = nextTab.path
                    }
                }
            })
        }
        activeTab.value = a
        tabList.value = tabList.value.filter(tab => tab.path != t)
        cookie.set("tabList", tabList.value)
    }
    //下拉菜单事件
    const handleClose = (c) => {
        if (c == "clearAll") {
            //标签激活状态切换回首页
            activeTab.value = "/"
            //过滤标签只剩首页
            tabList.value = [
                {
                    title: '后台首页',
                    path: '/',
                }
            ]
        } else if (c == "clearOther") {
            //过滤只剩下首页和当前页
            tabList.value = tabList.value.filter(tab => tab.path == "/" || tab.path == activeTab.value)
        }
        cookie.set("tabList", tabList.value)
    }
    return{
        activeTab,tabList,changeTab,removeTab,handleClose
    }
}