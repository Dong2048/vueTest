import { ref, reactive } from 'vue'
import { updatepassword, logout } from "~/api/manager"
import { toast, showModal } from "~/composables/util"
import { useRouter } from "vue-router"
import { useStore } from "vuex"
//修改密码
export function useRespassword() {
    const store = useStore();
    const router = useRouter();
    const formDrawerRef = ref(null)
    const form = reactive({
        oldpassword: '',
        password: '',
        repassword: ''
    })
    const rules = {
        oldpassword: [
            { required: true, message: '旧密码不能为空', trigger: 'blur' }
        ],
        password: [
            { required: true, message: '新密码不能为空', trigger: 'blur' }
        ],
        repassword: [
            { required: true, message: '确认密码不能为空', trigger: 'blur' }
        ]
    }
    const formRef = ref(null)
    const onSubmit = () => {
        formRef.value.validate((valid) => {
            if (!valid) {
                return false
            }
            formDrawerRef.value.showloading();
            updatepassword(form).then((res) => {
                toast("修改密码成功，请重新登录")
                store.dispatch("logout")
                //跳转登录页
                router.push("/login")
            }).finally(() => {
                formDrawerRef.value.hideloading();
            })
        })
    }
    const openResPassword = () => formDrawerRef.value.open();
    return {
        formDrawerRef, form, rules, formRef, onSubmit, openResPassword
    }
}
//退出登录
export function useLogout() {
    const store = useStore();
    const router = useRouter();
    function handlogout() {
        showModal("是否退出登录？").then(res => {
            logout().finally(() => {
                store.dispatch("logout")
                //跳转登录页
                router.push("/login")
                toast("退出登录成功")
            })
        })
    }
    return {
        handlogout
    }

}
//回车
export function KeyUp() {
    // 监听回车事件
    function onKeyUp(e) {
        if (e.key == "Enter") onSubmit()
    }

    // 页面加载
    onMounted(() => {
        // 键盘的监听事件
        document.addEventListener("keyup", onKeyUp)
    })
    // 页面卸载
    onBeforeUnmount(() => {
        // 移除键盘监听事件
        document.removeEventListener("keyup", onKeyUp)
    })

    return {
        onKeyUp, onMounted, onBeforeUnmount
    }
}
