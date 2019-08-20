<config>
    {
    "navigationBarTitleText": "专辑",
    "navigationBarTextStyle": "white",
    "usingComponents": {}
    }
</config>
<template>
    <div>
        <img :src="albumDetailsAlb.picUrl" alt="" class="album_details_first_img">
       <div class="album_details_first">
           <div class="album_details_first_alb">专辑：{{albumDetailsAlb.name}}</div>
           <div class="album_details_first_songer">歌手：{{singerName}}</div>
           <div class="album_details_first_issue">发行：{{albumDetailsAlb.PubTime}}</div>
           <div class="album_details_first_description">简介：{{albumDetailsAlb.description}}</div>
       </div>
        <div class="album_details_second">
            <div class="details_second_1">
                <img src="../../native/tabbar/bofang.png" alt="" class="album_details_second_img">
            </div>
            <div class="details_second_2">
                播放全部（共{{singNums}}首）
            </div>
        </div>
        <div class="album_details_third">
            <div v-for="(item,index) in albumDetailsSong" :key="item.id" class="album_details_third_item">
                <div class="details_third_item_left">
                  <div class="third_item_left_1">
                      {{index + 1}}
                  </div>
                    <div class="third_item_left_2">
                        <div class="third_item_left_2_1">{{item.name}}</div>
                        <div class="third_item_left_2_2">{{item.ar[0].name}}-{{albumDetailsAlb.name}}</div>
                    </div>
                </div>
                <img src="../../native/tabbar/bofang.png" alt="" class="album_details_second_img">
            </div>
        </div>
    </div>
    
</template>

<script>
    export default {
        name: "AlbumDetails",
        components: {},
        props: {},
        data() {
            return {
                albumDetailsId: '',//接收传过来的专辑id，用来获取专辑内容
                albumDetailsAlb: {},//接收专辑详情
                albumDetailsSong: [],//接收专辑歌曲
                singerName: '',
                singNums: 0 //接收歌曲数量
            }
        },
        methods: {
            //获取专辑详情
            getAlbumDetails(){
                this.$fly.get(`/album?id=${this.albumDetailsId}`).then(response => {
                    if (response){
                        // console.log(response);
                        this.albumDetailsAlb = response.data.album
                        this.albumDetailsSong = response.data.songs
                        this.singerName = response.data.album.artist.name
                        this.singNums = response.data.songs.length
                        this.albumDetailsAlb.PubTime = this.$moment(this.albumDetailsAlb.publishTime).format('YYYY-MM-DD')
                        console.log(this.albumDetailsAlb);
                        console.log(this.albumDetailsSong);
                    }
                }).catch(err => {
                    console.log(err);
                })
            }
        },
        mounted() {
           this.getAlbumDetails()
        },
        onLoad:function(options){
            console.log(options.itemId);
            this.albumDetailsId = options.itemId
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
    .album_details_first_img{
        width: 100%;
        height: 200px;
        position: absolute;
        top: 0;
        z-index: -1;
    }
.album_details_first{
   line-height: 30px;
    margin-left: 30px;
    margin-top: 50px;
}
.album_details_first_alb{
    font-size: 16px;
    color: white;
}
.album_details_first_songer{
    font-size: 16px;
    color: white;
}
.album_details_first_issue{
    font-size: 16px;
    color: white;
}
.album_details_first_description{
    width: 300px;
    font-size: 16px;
    color: white;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
}
.album_details_second{
    display: flex;
    align-items: center;
    line-height: 20px;
    margin-top: 35px;
}
.album_details_second_img{
    width: 15px;
    height: 15px;
}
.details_second_1{
    width: 50px;
    text-align: center;
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
.third_item_left_2_1{
    font-size: 15px;
}
.third_item_left_2_2{
    font-size: 12px;
    color: #8a8a8a;
}
</style>