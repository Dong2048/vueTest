<template>
    <div>
        后台首页
        <el-button @click="set()">设置</el-button>
        <el-button>读取</el-button>
        <el-button>删除</el-button>
    </div>
</template>
<script setup>
  import { useCookies } from '@vueuse/integrations/useCookies'
    const cookie = useCookies()
    console.log(cookie);
    function set(){
        cookie.set("admin-token","123456")
    }
</script>