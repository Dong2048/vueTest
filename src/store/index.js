import { createStore } from 'vuex'
import { login, getinfo } from '~/api/manager'
import {setToken,removeToken} from '~/composables/auth'
// 创建一个新的 store 实例
const store = createStore({
    state () {
      return {
        //用户信息
       user:{},
       //侧边菜单宽度
       asidewidth:"250px",
       //菜单
       menus:[],
       //权限
       rulesNames:[]
      }
    },
    mutations: {
        //记录用户信息
     SET_USERINFO(state,user){
        state.user=user 
     },
        //展开/收缩菜单
        handleAsideWidth(state){
            state.asidewidth = state.asidewidth == "250px" ? "64px" : "250px"
        },
        //获取菜单
        SET_MENUS(state,menus){
            state.menus=menus
        },
        //获取权限
        SET_RULESNAMES(state,rulesNames){
            state.rulesNames=rulesNames
        }
    },
    actions:{
        //登录
        login({commit},{username,password}){
            return new Promise((resolve,reject)=>{
                login(username,password).then(res=>{
                    // 设置cookie的token
                    setToken(res.token);
                    resolve(res)
                }).catch(err=>reject(err))
            })
        },
        //获取当前用户登录信息
        getinfo({commit}){
            return new Promise((resolve,reject)=>{
                getinfo().then(res=>{
                    commit("SET_USERINFO",res)
                    commit("SET_MENUS",res.menus)
                    commit("SET_RULESNAMES",res.rulesNames)
                    resolve(res)
                }).catch(err=>reject(err))
            })

        },
        //  退出登录
        logout({commit}){
            // 移除cookie里的token
            removeToken()
            //清除当前用户状态VUEX
            commit("SET_USERINFO",{})
        }
    }
  })
  
 export default store