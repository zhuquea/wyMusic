<config>
    {
    "navigationBarTitleText": "我的",
    "navigationBarTextStyle": "white",
    "usingComponents": {
        "van-button": "../../native/vant/button/index"
        }
    }
</config>
<template>
    <div>
        <div v-if="userData === null" class="my_center_none">
            <div class="my_center_NoUser">
                你还尚未登录，请先登录
            </div>
            <van-button type="primary" @click="jumpLogin">点击去登录</van-button>
        </div>
        <div v-else>
           <div class="my_Center_first">
              <div class="Center_first_left">
                  <img :src="userData.profile.avatarUrl" alt="" class="first_left_img">
                  <div class="first_left_content">
                      <div class="first_left_nickname">{{userData.profile.nickname}}</div>
                      <div class="first_left_authority">Lv:{{userData.profile.authority}}</div>
                  </div>
              </div>
               <div class="Center_first_right" @click="signIn">
                      签到
               </div>
           </div>
            <div class="my_Center_second">
                <div class="first_second_item">
                    <div>{{userData.profile.eventCount}}</div>
                    <div>动态</div>
                </div>
                <div class="first_second_item">
                    <div>{{userData.profile.followeds}}</div>
                    <div>关注</div>
                </div>
                <div class="first_second_item">
                    <div>{{userData.account.status}}</div>
                    <div>粉丝</div>
                </div>
                <div class="first_second_item">
                    <div><img src="../../native/tabbar/bianji.png" alt="" class="second_item_img"></div>
                    <div>编辑资料</div>
                </div>
            </div>
            <div class="my_Center_third">
                <van-button type="warning" @click="loginOut">退出登录</van-button>
            </div>
        </div>
    </div>
    
</template>

<script>
    export default {
        name: "MyCenter",
        components: {},
        props: {},
        data() {
            return {}
        },
        methods: {
            //点击去登录
            jumpLogin(){
                 wx.navigateTo({
                   url: `../login/Login`
                 })
            },
            //签到
            signIn(){
                this.$fly.get(`/daily_signin`).then(response => {
                    if (response) {
                        console.log(response);
                    }
                }).catch(err => {
                    console.log(err);
                })
            },
            //退出登录
            loginOut(){
                this.$fly.get(`/logout`).then(response => {
                    if (response){
                        console.log(response);
                        wx.showToast({
                             title: '退出登录成功',
                             icon: 'none' ,
                             duration:2000
                        })
                        this.$store.state.user = null
                    }
                }).catch(err => {
                    console.log(err);
                })
            }
        },
        mounted() {

        },
        onShow: function () {

        },
        created() {

        },
        filters: {},
        computed: {
            userData(){
                return this.$store.state.user
            }
        },
        watch: {},
        directives: {}
    }
</script>

<style scoped lang="scss">
.my_center_none{
    text-align: center;
}
.my_center_NoUser{
    width: 220px;
    font-size: 20px;
    margin: 20px auto;
}
.my_Center_first{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
}
.Center_first_left{
    display: flex;
    align-items: center;
}
.first_left_img{
    width: 50px;
    height: 50px;
    border-radius: 50%;
}
.first_left_content{
    line-height: 30px;
}
.first_left_nickname{
    font-size: 18px;
}
.first_left_authority{
    font-size: 15px;
    width: 50px;
    line-height: 25px;
    border-radius: 25px;
    background-color: #8a8a8a;
    color: white;
    text-align: center;
}
.Center_first_right{
    width: 50px;
    line-height: 25px;
    background-color: #8a8a8a;
    color: white;
    text-align: center;
    border-radius: 25px;
    font-size: 15px;
}
.my_Center_second{
    display: flex;
    justify-content: space-around;
}
.first_second_item{
    text-align: center;
    font-size: 14px;
}
.second_item_img{
    width: 15px;
    height: 15px;
}
.my_Center_third{
    width: 100px;
    margin: 10px auto;
    text-align: center;
}
</style>