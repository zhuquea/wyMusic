<config>
    {
    "navigationBarTitleText": "登录注册",
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
      <div class="login_first">
          <div class="login_first_phone" :class="{login_first_phone_hide: tabNum ===1}" @click="switchTabObj1">手机号登录</div>
          <div class="login_first_phone" :class="{login_first_phone_hide: tabNum ===2}" @click="switchTabObj2">邮箱登录</div>
      </div>
       <div class="login_second" v-if="tabNum === 1">
           <van-field :value="valueObj1" placeholder="请输入手机号" label="手机号" left-icon="phone-o" required @blur="fieldInpu1"></van-field>
           <van-field :value="valueObj2"  type="password" placeholder="请输入密码" label="密码" left-icon="contact" required @blur="fieldInpu2"></van-field>
       </div>
        <div class="login_second" v-else-if="tabNum === 2">
            <van-field :value="valueObj3" placeholder="请输入邮箱" label="邮箱" left-icon="free-postage" required @blur="fieldInpu3"></van-field>
            <van-field :value="valueObj4" type="password" placeholder="请输入密码" label="密码" left-icon="contact" required @blur="fieldInpu4"></van-field>
        </div>
        <div class="login_third">
            <van-button type="danger" @click="loginNow">立即登录</van-button>
            <van-button type="primary" @click="registerNow">立即注册</van-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Login",
        components: {},
        props: {},
        data() {
            return {
                tabNum: 1,
                valueObj4: '',
                valueObj3: '',
                valueObj2: '',
                valueObj1: ''
            }
        },
        methods: {
            switchTabObj1(){
                this.tabNum = 1
            },
            switchTabObj2(){
                this.tabNum = 2
            },
            fieldInpu1(e){
                // console.log(e.detail.value);
                this.valueObj1 = e.detail.value
                // console.log(this.valueObj1);
            },
            fieldInpu2(e){
                // console.log(e.detail.value);
                this.valueObj2 = e.detail.value
                // console.log(this.valueObj2);
            },
            fieldInpu3(e){
                this.valueObj3 = e.detail.value
                // console.log(this.valueObj3);
            },
            fieldInpu4(e){
                this.valueObj4 = e.detail.value
                // console.log(this.valueObj4);
            },
            //立即登录
            loginNow(){
                 this.$fly.post(`/login/cellphone?phone=${this.valueObj1}&password=${this.valueObj2}`).then(response => {
                     console.log(response);
                     if (response.data.code === 200) {
                         wx.showToast({
                            title: '登录成功',
                            icon: 'success',
                            duration: 2000
                         })
                         this.$store.state.user = response.data
                         console.log(this.$store.state.user);
                         wx.switchTab({
                             url: `../myCenter/MyCenter`
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
            },
            //立即注册
            registerNow(){
                wx.navigateTo({
                  url: `../register/Register`
                })
            },
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
.login_first{
    display: flex;
    justify-content: space-around;
}
.login_first_phone{
    width: 115px;
    line-height: 30px;
    font-size: 15px;
    text-align: center;
}
.login_first_phone_hide{
    border-bottom: 2px solid #d81e06;
}
.login_second{
    margin-left: 5px;
    padding: 5px;
}
.login_third{
    display: flex;
    justify-content: space-around;
    margin-top: 5px;
}
</style>