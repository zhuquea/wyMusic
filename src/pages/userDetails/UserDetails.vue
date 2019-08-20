<config>
    {
    "navigationBarTitleText": "用户",
    "navigationBarTextStyle": "white",
    "usingComponents": {}
    }
</config>
<template>
    <div>
        <img :src="userCoverImg" alt="" class="user_details_first_img">
        <div class="user_details_first">
            <div class="user_details_first_alb">{{userCreator.nickname}}</div>
            <div class="user_details_first_songer">{{userCreator.description}} {{yearData}}后</div>
        </div>
        <div class="user_details_second">
            <div class="details_second_1">
                <img src="../../native/tabbar/bofang.png" alt="" class="user_details_second_img">
            </div>
            <div class="details_second_2">
                播放全部（共{{numLength}}首）
            </div>
        </div>
        <div class="album_details_third">
            <div v-for="(item,index) in userPlayList" :key="item.id" class="album_details_third_item">
                <div class="details_third_item_left">
                    <div class="third_item_left_1">
                        {{index + 1}}
                    </div>
                    <img :src="item.coverImgUrl" alt="" class="third_item_left_2_0">
                    <div class="third_item_left_2">
                        <div class="third_item_left_2_1">{{item.name}}</div>
                        <div class="third_item_left_2_2">{{item.trackCount}}首，播放{{item.playCount}}次</div>
                    </div>
                </div>
                <img src="../../native/tabbar/bofang.png" alt="" class="user_details_second_img">
            </div>
        </div>
    </div>
    
</template>

<script>
    export default {
        name: "UserDetails",
        components: {},
        props: {},
        data() {
            return {
                userDetailsId: '',
                userPlayList: [],//接受用户歌单
                userCoverImg: '',
                userCreator: {},
                yearData: 0,
                numLength: 0
            }
        },
        methods: {
            //获取用户详情
            getUserData(){
                this.$fly.get(`/user/playlist?uid=${this.userDetailsId}`).then(response => {
                    if (response){
                        // console.log(response);
                        this.userPlayList = response.data.playlist
                        // this.userCoverImg = response.data.playlist[1].coverImgUrl
                        this.userCoverImg = response.data.playlist[0].creator.backgroundUrl
                        this.userCreator = response.data.playlist[0].creator
                       this.yearData = this.$moment(this.userCreator.birthday).format('YY')
                        if (this.yearData> 70 && this.yearData< 80){
                            this.yearData = 70
                        } else if (this.yearData> 80 && this.yearData< 90){
                            this.yearData = 80
                        } else if (this.yearData> 90){
                            this.yearData = 90
                        }
                        this.numLength = response.data.playlist.length
                        console.log(this.userPlayList);
                        // console.log(this.userCreator);
                        // console.log(this.yearData);
                    }
                }).catch(err => {
                    console.log(err);
                })
            }
        },
        mounted() {
           this.getUserData()
        },
        onLoad:function(options){
            console.log(options.itemId);
            this.userDetailsId = options.itemId
            console.log(this.userDetailsId);
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
.user_details_first_img{
    width: 100%;
    height: 200px;
    position: absolute;
    top: 0;
    z-index: -1;
}
.user_details_first{
    line-height: 30px;
    margin-left: 30px;
    margin-top: 100px;
}
.user_details_first_alb{
    font-size: 16px;
    color: white;
}
.user_details_first_songer{
    font-size: 14px;
    color: white;
}
.user_details_second{
    display: flex;
    align-items: center;
    line-height: 20px;
    margin-top: 45px;
}
.details_second_1{
    width: 50px;
    text-align: center;
}
.user_details_second_img{
    width: 15px;
    height: 15px;
}
.details_second_2{
    width: 150px;
    text-align: center;
    font-size: 15px;
}
.album_details_third_item{
    padding: 5px;
    display: flex;
    justify-content: space-between;
}
 .details_third_item_left{
     display: flex;
     align-items: center;
 }
.third_item_left_1{
    color: #8a8a8a;
}
.third_item_left_2{
    margin-left: 5px;
}
.third_item_left_2_0{
    width: 25px;
    height: 25px;
    margin-left: 2px;
}
.third_item_left_2_1{
    font-size: 15px;
}
.third_item_left_2_2{
    font-size: 12px;
    color: #8a8a8a;
}
</style>