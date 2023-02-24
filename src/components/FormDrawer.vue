<template>
    <el-drawer v-model="showDrawer" :title="title" :size="size" :destroy-on-close="destroyedOnClose" :close-on-click-modal="false">
        <div class="formDrawer">
            <div class="drawerBody">
                <!-- 插槽 -->
                <slot>

                </slot>
            </div>
            <div class="actions">
                <el-button type="primary"  :loading="loading" @click="submit">{{ confirmText }}</el-button>
                <el-button type="default" @click="close()" :loading="loading">取消</el-button>
            </div>
        </div>
    </el-drawer>
</template>
<script setup>
import {ref} from "vue"
const showDrawer = ref(false)
//打开抽屉
const open = ()=>showDrawer.value=true
//关闭抽屉
const close = ()=>showDrawer.value=false

//
const loading=ref(false)
const showloading=()=> loading.value=true;
const hideloading=()=> loading.value=false;
// 抛出事件
const emit=defineEmits(["submit"])
const submit=()=>emit("submit")
// 抛出属性
const props = defineProps({
    title:String,
    size:{
        type:String,
        default:"45%"
    },
    destroyedOnClose:{
        type:Boolean,
        default:false
    },
    confirmText:{
        type:String,
        default:"提交"
    }
});
//暴露方法到父级组件
defineExpose({
    open,close,showloading,hideloading
}) 
</script>
<style>
.formDrawer{
    width: 100%;
    height: 100%;
    position: relative;
    @apply flex flex-col;
}
.formDrawer .drawerBody{
    flex: 1;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 50px;
    right: 0;
    overflow-y: auto;
}
.formDrawer .actions{
    height: 50px;
    @apply flex items-center mt-auto;
}
</style>