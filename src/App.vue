<script setup>

</script>

<template>
  <!-- <button class="btn">按钮</button> -->
  <router-view></router-view>
</template>

<style>
#nprogress .bar{
background-color:floralwhite!important;
height: 2px!important;
}
body{
  @apply bg-gray-100;
}
/* 全局滚动条 */
::-webkit-scrollbar{
  width: 4px;
  height: 6px;
}
::-webkit-scrollbar-corner{
  display: block;
}
::-webkit-scrollbar-thumb{
  border-radius: 8px;
  background-color: rgba(0,0,0,0.2);
}
::-webkit-scrollbar-thumb,
::-webkit-scrollbar-track{
  border-right-color: transparent;
  border-left-color: transparent;
  background-color: rgba(0,0,0,0.1);
}
</style>
