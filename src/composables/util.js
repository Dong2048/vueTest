import { ElNotification,ElMessageBox } from 'element-plus'
import nprogress from "nprogress"
//提示
export function toast(message,type = "success",dangerouslyUseHTMLString =true){
    ElNotification({
        message,
        type,
        duration: 3000
    })
}
// 提示框
export function showModal(content="提示内容",type="warning",title=""){
    return ElMessageBox.confirm(
        content,
          title,
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: title,
          }
        )
}
//开启全屏加载效果
export function startFullLoading(){
  return nprogress.start()
}
//停止全屏加载效果
export function stopFullLoading(){
  return nprogress.done()
}