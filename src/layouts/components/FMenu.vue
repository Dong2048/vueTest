<template>
    <div class="f-menu" :style="{width:$store.state.asidewidth}">
        <el-menu unique-opened :default-active="defaultActive" default-active="2" class="border-0" @select="handleSelect" :collapse="isCollapse" :collapse-transition="false">
            <template v-for="(item,index) in asideeMenus" :key="index">
                <el-sub-menu :index="item.name" v-if="item.child && item.child.length > 0">
                <template #title>
                    <el-icon>
                       <component :is="item.icon"></component>
                    </el-icon>
                    <span>{{item.name}}</span>
                </template>
                <el-menu-item v-for="(item2,index2) in item.child" :key="index2" :index="item2.frontpath">
                    <el-icon>
                       <component :is="item2.icon"></component>
                    </el-icon>
                    <span>{{ item2.name }}</span>
                </el-menu-item>
            </el-sub-menu>
            <el-menu-item v-else :index="item.frontpath">
                <el-icon><component :is="item.icon"></component></el-icon>
                <span>{{item.name}}</span>
            </el-menu-item>
            </template>
        </el-menu>
    </div>
</template>
<script setup>
import { useRouter, useRoute  } from 'vue-router';
import { computed,ref } from 'vue';
import{ useStore } from"vuex";
const store=useStore()
const router=useRouter();
const route=useRoute()
//刷新菜单不变，绑定路由
const defaultActive = ref(route.path)

//是否折叠菜单
const isCollapse = computed(()=>!(store.state.asidewidth=='250px'))

//监控menu的select时间，跳转页面
const handleSelect=(e)=>{
    router.push(e);
}
const asideeMenus = computed(()=> store.state.menus);
</script>
<style>
.f-menu {
    @apply shadow-md bg-light-50 fixed border-1;
    top: 64px;
    left: 0;
    bottom: 0;
    overflow-y: auto;
    overflow-x: hidden;
    transition: all 0.3s;
}
.f-menu::-webkit-scrollbar{
    width: 0px;
}
</style>