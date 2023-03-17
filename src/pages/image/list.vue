<template>
    <div>
        <el-container class="bg-white rounded" :style="{height:(h+'px')}">
            <el-header class="image-header">
                <el-button type="primary" size="small" @click="handleOpenCreate">
                新增分类 
                </el-button>
                <el-button type="warning" size="small" @click="handleOpenUpload">
                上传图片 
                </el-button>
            </el-header>
                <el-container>
                    <image-aside ref="ImageAsideRef" @change="handleAsideChange"/>
                    <image-main ref="ImageMainRef"/>
                </el-container>
        </el-container>
    </div>
</template>
<script setup>
import imageAside from "~/components/imageAside.vue"
import imageMain from "~/components/imageMain.vue"
import { ref } from "vue";
//获取可视的高度
const windowHeight = window.innerHeight || document.body.clientHeight
const h = windowHeight - 64 -44 -40
const ImageMainRef =ref(null)
const ImageAsideRef =ref(null)
const handleOpenCreate =()=>ImageAsideRef.value.handleCreate()
const handleAsideChange = (image_class_id)=>ImageMainRef.value.loadData(image_class_id);

const handleOpenUpload= ()=>ImageMainRef.value.openUploadFile()
</script>
<style>
.image-header{
    border-bottom: 1px solid #fff;
    @apply flex items-center;
}
</style>