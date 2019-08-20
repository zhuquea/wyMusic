<config>
    {
    "navigationBarTitleText": "歌单",
    "navigationBarTextStyle": "white",
    "usingComponents": {},
    }
</config>
<template>
    <div>
        <div>
            <img :src="backgroundUrl" alt="" v-if="backgroundUrl">
            <img :src="coverImgUrl" alt="" v-else-if="coverImgUrl">
        </div>
        <div class="song_List_second">
            <div class="song_List_second_left">
                <img src="../../native/tabbar/bofang.png" alt="" class="second_left_img">
                <div>播放全部（共{{songsNumber}}首）</div>
            </div>
            <div class="song_List_second_right">
               +收藏（{{collectionData}})
            </div>
        </div>
        <div class="song_List_third">
            <div v-for="(item,index) in songListDetailsData" :key="index" class="List_third_item" @click="jumpPlayRouting(item)">
                <div class="List_third_item_left">
                   <div class="item_left_1">{{index+1}}</div>
                    <div class="item_left_2">
                        <div class="item_left_2_1">{{item.name}}</div>
                        <div class="item_left_2_2">{{item.ar[0].name}}-{{item.name}}</div>
                    </div>
                </div>
                <img src="../../native/tabbar/bofang.png" alt="" class="List_third_item_right">
            </div>
        </div>
    </div>
    
</template>

<script>
    export default {
        name: "SongListDetails",
        components: {},
        props: {},
        data() {
            return {
                itemDetailsId: "",//接收歌单的id，用来请求歌单详情
                songsNumber: 0, //歌曲数量
                songListDetailsData: [], //接收歌单详情数据
                collectionData: 0 , //接收‘收藏’数量
                backgroundUrl: "", //接收歌单详情背景1
                coverImgUrl: ""//接收歌单详情背景2
            }
        },
        methods: {
            //获取歌单详情
            getSongListDetails(){
                this.$fly.get(`/playlist/detail?id=${this.itemDetailsId}`).then(response => {
                    if (response){
                        console.log(response.data);
                        this.songListDetailsData = response.data.playlist.tracks
                        this.songsNumber = response.data.playlist.tracks.length
                        this.collectionData = response.data.playlist.subscribedCount
                        this.backgroundUrl = response.data.playlist.backgroundCoverUrl
                        this.coverImgUrl = response.data.playlist.coverImgUrl
                        console.log(this.songListDetailsData);
                        wx.hideLoading()
                        // console.log(this.collectionData);
                        // console.log(this.backgroundUrl);
                    }
                }).catch(err => {
                    console.log(err);
                    wx.hideLoading()
                })
            },
            //跳转到播放页面
            jumpPlayRouting(item){
                wx.navigateTo({
                  url: `../playRouting/PlayRouting?songData=${item.id}&itemDetailsId=${this.itemDetailsId}&fromSinger=1`
                })
            }
        },
        mounted() {
          this.getSongListDetails()
        },
        onLoad: function(options){
            this.itemDetailsId = options.itemDetails
            console.log(this.itemDetailsId);
            wx.showLoading({
                title: '加载中...',
            })
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
.song_List_second{
    display: flex;
}
.song_List_second_left{
    width: 58%;
    height: 30px;
    font-size: 15px;
    display: flex;
    align-items: center;
    justify-content: space-around;
}
.second_left_img{
    width: 25px;
    height: 25px;
}
.song_List_second_right{
    width: 42%;
    font-size: 15px;
    text-align: center;
    line-height: 30px;
    color: white;
    background-color: #d81e06;
}
.song_List_third {
    padding: 2px;
}
.List_third_item{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.List_third_item_left{
    display: flex;
}
.item_left_1{
    line-height: 30px;
    color: #dbdbdb;
    margin-left: 2px;
}
.item_left_2{
    margin-left: 5px;
}
.item_left_2_1{
    width: 200px;
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow:ellipsis;
}
.item_left_2_2{
    width: 200px;
    font-size: 14px;
    color: #dbdbdb;
    white-space: nowrap;
    overflow: hidden;
    text-overflow:ellipsis;
}
.List_third_item_right{
    width: 20px;
    height: 20px;
}
</style>