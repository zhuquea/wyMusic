<config>
    {
    "navigationBarTitleText": "注册",
    "navigationBarTextStyle": "white",
    "usingComponents": {
        "van-field": "../../native/vant/field/index",
        "van-icon": "../../native/vant/icon/index",
        "van-button": "../../native/vant/button/index"
       }
    }
</config>
<template>
    <div>
        <div>
            <van-field :value="valueObjD1" placeholder="请输入手机号" label="手机号" left-icon="phone-o" required @blur="fieldInpu1Obj"></van-field>
            <van-field :value="valueObjD2"  type="password" placeholder="请输入密码" label="密码" left-icon="contact" required @blur="fieldInpu2Obj"></van-field>
            <van-field :value="valueObjD3"
                       placeholder="请输入验证码"
                       label="验证码"
                       left-icon="passed"
                       use-button-slot
                       clearable
                       center
                       required @blur="fieldInpu3Obj">
                <van-button slot="button" size="small" type="primary" @click="sendVerCode" :disabled="disableStr">{{sendVerCodeStr}}</van-button>
            </van-field>
            <van-field :value="valueObjD4" placeholder="请输入昵称" label="昵称" left-icon="user-o" required @blur="fieldInpu4Obj"></van-field>
        </div>
        <div class="register_last">
            <van-button type="danger" @click="toLogin">前往登录</van-button>
            <van-button type="primary" @click="registerNowO">立即注册</van-button>
        </div>
    </div>
    
</template>

<script>
    export default {
        name: "Register",
        components: {},
        props: {},
        data() {
            return {
                valueObjD1: '',
                valueObjD2: '',
                valueObjD3: '',
                valueObjD4: '',
                isRegister: false, //用来判断是否进行注册，手机号已被注册，则不能进行注册
                sendVerCodeStr: '发送验证码',
                disableStr: false
            }
        },
        methods: {
            fieldInpu1Obj(e){
               this.valueObjD1 = e.detail.value
                console.log(this.valueObjD1);
            },
            fieldInpu2Obj(e){
                this.valueObjD2 = e.detail.value
                console.log(this.valueObjD2);
            },
            fieldInpu3Obj(e){
                this.valueObjD3 = e.detail.value
                console.log(this.valueObjD3);
            },
            fieldInpu4Obj(e){
                this.valueObjD4 = e.detail.value
                console.log(this.valueObjD4);
            },
            //发送验证码
            sendVerCode(){
                let num = 50
                let timer = setInterval(() => {
                    this.sendVerCodeStr = '已发送（' + num + '）'
                    this.disableStr = true
                    num--
                    if (num === 0){
                        clearInterval(timer)
                        this.disableStr = false
                        this.sendVerCodeStr = '重新发送'
                    }
                },1000)
                this.$fly.get(`/captcha/sent?phone=${this.valueObjD1}`).then(response => {
                    if (response.data.code===200){
                        wx.showToast({
                            title: '验证码发送成功',
                            icon: 'success',
                            duration: 2000
                        })
                        // console.log(response);
                    }
                }).catch(err => {
                    console.log(err);
                    clearInterval(timer)
                    this.disableStr = false
                    this.sendVerCodeStr = '重新发送'
                    if (err.message === 'request:ok'){
                        wx.showToast({
                            title: err.response.data.message,
                            icon: 'none',
                            duration: 2000
                        })
                    }else {
                        wx.showToast({
                            title: '发送失败',
                            icon: 'none',
                            duration: 2000
                        })
                    }
                })
            },
            //前往登录
            toLogin(){
                wx.navigateTo({
                  url: `../login/Login`
                })
            },
            //立即注册
            registerNowO(){
                // console.log(this.valueObjD1);
                this.$fly.get(`/cellphone/existence/check?phone=${this.valueObjD1}`).then(response => {
                    if (response.data.exist !== -1) {
                       wx.showToast({
                           title: '该手机号已被注册',
                           icon: 'none',
                           duration: 2000
                       })
                    }else {
                        this.$fly.get(`/captcha/verify?phone=${this.valueObjD1}&captcha=${this.valueObjD3}`).then(response => {
                            console.log(response);
                            if (response.data.code === 200){
                                this.$fly.post(`/register/cellphone?phone=${this.valueObjD1}&password=${this.valueObjD2}&captcha=${this.valueObjD3}&nickname=${this.valueObjD4}`).then(response => {
                                    if (response.data.code === 200){
                                        wx.showToast({
                                            title: '恭喜你，注册成功',
                                            icon: 'success',
                                            duration: 2000
                                        })
                                    }
                                }).catch(err => {
                                    console.log(err);
                                    if (err.response.data.code === 505){
                                        wx.showToast({
                                            title: '该昵称已被占用',
                                            icon: 'none',
                                            duration: 2000
                                        })
                                    }else if (err.response.data.code === 400){
                                        wx.showToast({
                                            title: '该昵称不符合规范',
                                            icon: 'none',
                                            duration: 2000
                                        })
                                    }
                                })
                            }
                        }).catch(err => {
                            console.log(err);
                            if (err.response.data.code === 503) {
                                wx.showToast({
                                    title: '验证码错误',
                                    icon: 'none',
                                    duration: 2000
                                })
                            }
                        })
                    }
                }).catch(err => {
                    console.log(err);
                    wx.showToast({
                        title: '请正确填写信息',
                        icon: 'none',
                        duration: 2000
                    })
                })
            }
        },
        mounted() {

        },
        created() {

        },
        filters: {},
        computed: {},
        watch: {},
        directives: {}
    }
</script>

<style scoped lang="scss">
.register_last{
    display: flex;
    justify-content: space-around;
    margin-top: 5px;
}
</style>