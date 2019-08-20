<config>
    {
    "navigationBarTitleText": "歌手详情",
    "navigationBarTextStyle": "white",
    "usingComponents": {}
    }
</config>
<template>
    <div>
        <div class="singer_details_name">{{singerName}}</div>
        <div class="singer_details_second">
            <img :src="singerDetailData.img1v1Url" alt="" class="singer_details_src">
            <div class="singer_details_play">
                <img src="../../native/tabbar/bofang.png" alt="" class="singer_details_play_img">
                <div class="singer_details_play_S">随机播放全部歌曲</div>
            </div>
        </div>
        <div class="singer_details_third">
            <div v-for="(item,index) in singerSongData" :key="item.id" class="details_third_item" @click="jumpPlaying(item)">
                <div class="third_item_left">
                    <div class="third_item_left_1">{{index+1}}</div>
                    <div class="third_item_left_2">
                        <div class="item_left_2_name">{{item.name}}</div>
                        <div class="item_left_2_ar">{{item.ar[0].name}}·{{item.al.name}}</div>
                    </div>
                </div>
                <img src="../../native/tabbar/bofang.png" alt="" class="singer_details_play_img">
            </div>
        </div>
    </div>
    
</template>

<script>
    export default {
        name: "SingerDetails",
        components: {},
        props: {},
        data() {
            return {
                singerName: '',//接收歌手名字
                singerSrc: '',//接收北京图片路径
                singerId: '',//接收歌手ID
                singerDetailData: {},//接收歌手详细信息
                singerSongData: [],//接收歌手所有单曲
            }
        },
        methods: {
            //根据歌手ID获取歌手单曲
            getArtists(){
                this.$fly.get(`/artists?id=${this.singerId}`).then(response => {
                    if (response){
                        console.log(response);
                        this.singerDetailData = response.data.artist
                        this.singerSongData = response.data.hotSongs
                        console.log(this.singerDetailData);
                        console.log(this.singerSongData);

                    }
                }).catch(err => {
                    console.log(err);
                })
            },
            //跳转到播放页面
            jumpPlaying(item){
                wx.navigateTo({
                  url: `../playRouting/PlayRouting?songData=${item.id}&itemDetailsId=${this.singerId}&fromSinger=2`
                })
            }
        },
        mounted() {
           this.getArtists()
        },
        onLoad: function(options){
            this.singerName = options.itemName
            this.singerSrc = options.itemSrc
            this.singerId = options.itemId
            console.log(this.singerSrc);
            console.log(this.singerId);
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
.singer_details_name{
    width: 100px;
    line-height: 20px;
    text-align: center;
    margin: 5px auto;
    font-size: 16px;
}
.singer_details_second{
    position: relative;
}
.singer_details_src{
    width: 100%;
    height: 200px;
}
.singer_details_play{
    width: 200px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translate(-100px);
    background-color: white;
    border-radius: 25px;
}
.singer_details_play_img{
    width: 15px;
    height: 15px;
}
.singer_details_play_S{
    font-size: 15px;
}
.singer_details_third{

}
.details_third_item{
    padding: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.third_item_left{
    display: flex;
    align-items: center;
}
.third_item_left_1{
    font-size: 15px;
}
.third_item_left_2{
    line-height: 20px;
    margin-left: 5px;
}
.item_left_2_name{
    font-size: 15px;
}
.item_left_2_ar{
    font-size: 13px;
    color: #8a8a8a;
}
</style>