import axios from '~/axios';
//获取主控台统计数据
export function getStatistics1(){
    return axios.get("/admin/statistics1")
}