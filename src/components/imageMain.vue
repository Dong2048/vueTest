<template>
    <el-main class="image-main" v-loading="loading">
        <div class="top p-3">
            <el-row :gutter="20">
                <el-col :span="6" :offset="0" v-for="item, index in list" :key="index">
                    <el-card shadow="hover" class="relative mb-3" :body-style="{'padding':0}">
                        <el-image :src="item.url" fit="cover" class="w-full h-[150px]"></el-image>
                        <div class="image-title"> {{ item.name }} </div>
                        <div class="flex items-center justify-center p-2">
                            <el-button type="primary" size="small" text>重命名</el-button>
                            <el-button type="primary" size="small" text>删除</el-button>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>
        <div class="bottom">
            <el-pagination background layout="prev,pager,next" :total="total" :current-page="currentPage" :page-size="limit"
                @current-change="getData" />
        </div>
    </el-main>
</template>
<script setup>
import { getImageList } from "~/api/image.js"
import { ref } from "vue";
//加载动画
const loading = ref(false)
const list = ref([])
const activeId = ref(0)

//分页
const currentPage = ref(1)
const total = ref(0)
const limit = ref(10)
const image_class_id = ref(0)
//获取数据
function getData(p = null) {
    if (typeof p == "number") {
        currentPage.value = p
    }
    loading.value = true
    getImageList(image_class_id.value, currentPage.value).then(res => {
        total.value = res.totalCount
        list.value = res.list
    }).finally(() => {
        loading.value = false
    })
}
//根据分类id从新加载列表
const loadData = (id) => {
    currentPage.value = 1
    image_class_id.value = id
    getData()
}
//暴露方法,传回父组件
defineExpose({
    loadData
})
</script>
<style>
.image-main {
    position: relative;
}

.image-main .top {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 50px;
    overflow: auto;
}

.image-main .bottom {
    @apply flex items-center justify-center;
    position: absolute;
    height: 50px;
    right: 0;
    left: 0;
    bottom: 0;
}
.image-title{
    position: absolute;
    top: 122px;
    left: -1px;
    right: -1px;
    @apply text-sm truncate text-gray-100 bg-opacity-50 bg-gray-800 px -2 py-1
}
</style>