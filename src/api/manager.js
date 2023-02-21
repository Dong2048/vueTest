import axios from '~/axios';
export function login(username,password){
 return axios.post("/admin/login",{
    username,
    password
})
}
//获取用户信息
export function getinfo(){
    return axios.post("admin/getinfo")
}
//退出登录
export function logout(){
    return axios.post("admin/logout")
}
//退出登录
export function rePassword(data){
    return axios.post("admin/updatepassword")
}