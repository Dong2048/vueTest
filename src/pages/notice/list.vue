<template>
    <el-card shadow="never" class="border-0">
        <!-- 新增｜刷新 -->
        <div class="flex items-center justify-between mb-4">
            <el-button type="primary" size="small" @click="handleCreate">新增</el-button>
            <el-tooltip effect="dark" content="刷新列表" placement="top">
                <el-button text @click="getData">
                    <el-icon :size="20">
                        <Refresh />
                    </el-icon>
                </el-button>
            </el-tooltip>
        </div>
        <!-- 表格 -->
        <el-table :data="tableData" stripe style="width: 100%" v-loading="loading">
            <el-table-column prop="title" label="公告标题" />
            <el-table-column prop="create_time" label="发布时间" width="380" />
            <el-table-column label="操作" width="180" align="center">
                <template #default="scope">
                    <el-button type="primary" size="small" text @click="handleEdit(scope.row)">修改</el-button>
                    <el-popconfirm title="是否要删除改公告？" confirm-button-text="确认" cancel-button-text="取消"
                        @confirm="handleDelete(scope.row.id)">
                        <template #reference>
                            <el-button text type="primary" size="small">
                                删除
                            </el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <div class="flex items-center justify-center mt-5">
            <el-pagination background layout="prev,pager,next" :total="total" :current-page="currentPage" :page-size="limit"
                @current-change="getData" />
        </div>
        <FormDrawer ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
            <el-form :model="form" ref="formRef" :rules="rules" label-width="80px" :inline="false">
                <el-form-item label="公告标题" prop="title">
                    <el-input v-model="form.title" placeholder="公告标题"></el-input>
                </el-form-item>
                <el-form-item label="公告内容" prop="content">
                    <el-input v-model="form.content" placeholder="公告内容" type="textarea" :rows="5"></el-input>
                </el-form-item>
            </el-form>

        </FormDrawer>
    </el-card>
</template>
<script setup>
import { ref, reactive,computed } from 'vue';
import { getNoticeList, createNotice,updateNotice,deleteNotice} from "~/api/notice"
import FormDrawer from "~/components/FormDrawer.vue"
import { toast } from "~/composables/util"
const tableData = ref([])
const loading = ref(false)
//分页
const currentPage = ref(1)
const total = ref(0)
const limit = ref(10)
//获取数据
function getData(p = null) {
    if (typeof p == "number") {
        currentPage.value = p
    }
    loading.value = true
    getNoticeList(currentPage.value).then(res => {
        tableData.value = res.list
        total.value = res.totalCount
    }).finally(() => {
        loading.value = false
    })
}
getData()
//删除公告
const handleDelete = (id) => {
    loading.value = true
    deleteNotice(id).then(res=>{
        toast("删除成功")
        getData()
    })
    .finally(() => {
        loading.value = false
    })
}
//标识是否为新增｜修改
const editId= ref(0)
const drawerTitle = computed(()=>editId.value? "编辑":"添加")
//表单部分
const formDrawerRef = ref(null)
const formRef = ref(null)
const form = reactive({
    title: "",
    content: ""
})
const rules = {
    title: [{
        required: true,
        message: '公告标题不能为空',
        trigger: 'blur'
    }],
    content: [{
        required: true,
        message: '公告内容不能为空',
        trigger: 'blur'
    }]
}
//新增公告
const handleSubmit = () => {
    formRef.value.validate((valid) => {
        if (!valid) return
        formDrawerRef.value.showloading()

        const fun = editId.value ? updateNotice(editId.value,form) :  createNotice(form)
        fun.then(res => {
            toast(drawerTitle.value+"成功")
            //修改刷新当前页，新增刷新第一页
            getData(editId.value ? false : 1)
            formDrawerRef.value.close()
        })
            .finally(() => {
                formDrawerRef.value.hideloading()
            })
    })
}

//重置表单
function resetForm(row =false){
    if(formRef.value) formRef.value.clearValidate()
    if(row){
        for(const key in form){
            form[key] = row[key]
        }
    }
}
//打开新增
const handleCreate = () => {
    editId.value= 0 
    resetForm({
        title:"",
        content:""
    })
    formDrawerRef.value.open()
}
//修改
const handleEdit = (row)=>{
    resetForm(row)
    editId.value =row.id    
    formDrawerRef.value.open()
}
</script> 