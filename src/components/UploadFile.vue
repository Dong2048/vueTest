<template>
    <el-upload
      drag
      :action="uploadImageAction"
      multiple
      :headers="{
        token
      }"
      name="img"
      :data="data"
      :on-success="uploadSuccess"
      :on-error="uploadError"
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">
        将文件拖到此处或<em>点击上传</em>
      </div>
      <template #tip>
        <div class="el-upload__tip">
          大小小于500kb的jpg/png文件
        </div>
      </template>
    </el-upload>
  </template>

<script setup>
import { uploadImageAction } from '~/api/image';
import{getToken} from "~/composables/auth"
import{toast} from "~/composables/util"
const token = getToken()
defineProps({
  data:Object
})

const emit = defineEmits(["success"])

//上传成功
const uploadSuccess=(response, uploadFile, uploadFiles)=>{
    emit("success",{
      response, uploadFile, uploadFiles
    })
}
//上传失败
const uploadError=(error, uploadFile, uploadFiles)=>{
  let msg = JSON.parse(error.message).msg || "上传失败"
  toast(msg,"error")
}
</script>