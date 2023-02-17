<template>
    <div><el-result
        icon="warning"
        title="404"
        sub-title="没有找到页面"
      >
        <template #extra>
          <el-button type="primary" @Click="$router.push('/')" >回到首页</el-button>
        </template>
      </el-result>
      </div>
</template>