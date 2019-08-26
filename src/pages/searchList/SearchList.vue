<config>
    {
    "navigationBarTitleText": "歌手列表",
    "navigationBarTextStyle": "white",
    "usingComponents": {
         "van-tab": "../../native/vant/tab/index",
         "van-tabs": "../../native/vant/tabs/index"
       },
    }
</config>
<template>
    <div>
        <div class="search_list_first">
            <input type="text" v-model="valueObj" placeholder="请输入关键词" class="search_list_input">
            <img src="../../native/tabbar/search.png" alt="" class="search_list_img">
        </div>
        <div class="search_list_second">
            <van-tabs :active="active" @click="requestData">
                <van-tab v-for="(item,index) in typeArr" :key="item.id" :title="item.name">
                    <div v-if="index===0">
                        <div class="second_tab">
                            <img src="../../native/tabbar/bofang.png" alt="" class="second_tab_img">
                            <div class="second_tab_playAll">播放全部</div>
                        </div>
                        <div v-for="(item1,index1) in searchListData" :key="item1.id" class="second_tab_content_item" @click="jumpPlay(item1)">
                            <div class="content_item_left">
                                <div class="content_item_left_1">{{item1.name}}</div>
                                <div class="content_item_left_2"><span class="left_2_valueObj">{{valueObj}}</span>-<span class="left_2_name">{{item.name}}</span></div>
                            </div>
                            <div class="content_item_right">
                                <img src="../../native/tabbar/bofang.png" alt="" class="second_tab_img">
                            </div>
                        </div>
                    </div>
                    <Album v-else-if="index === 1" :albumData="albumData" :valueObj="valueObj"></Album>
                    <Songer v-else-if="index === 2" :singerData="singerData"></Songer>
                    <SongSheet v-else-if="index === 3" :songSheetData="songSheetData" :valueObj="valueObj" :highLight="highLight"></SongSheet>
                    <UserObj v-else-if="index ===4" :userData="userData"></UserObj>
                    <MvObj v-else-if="index === 5" :MvData="MvData"></MvObj>
                    <LyricObj v-else-if="index === 6" :lyricData="lyricData"></LyricObj>
                    <RadioStation v-else-if="index === 7" :radioStationData="radioStationData"></RadioStation>
                    <VideoObj v-else-if="index === 8" :videoData="videoData" :valueObj="valueObj"></VideoObj>
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>

<script>
    import Album from "../../components/Album"
    import Songer from "../../components/Songer"
    import SongSheet from "../../components/SongSheet"
    import UserObj from "../../components/UserObj"
    import MvObj from "../../components/MvObj"
    import LyricObj from "../../components/LyricObj"
    import RadioStation from "../../components/RadioStationData"
    import VideoObj from "../../components/VideoObj"
    export default {
        name: "SearchList",
        components: {
            Album,
            Songer,
            SongSheet,
            UserObj,
            MvObj,
            LyricObj,
            RadioStation,
            VideoObj
        },
        props: {},
        data() {
            return {
                valueObj: "",
                active: 0,
                typeArr:[
                    {
                        id: 1,
                        name: '单曲'
                    },
                    {
                        id: 10,
                        name: '专辑'
                    },
                    {
                        id: 100,
                        name: '歌手'
                    },
                    {
                        id: 1000,
                        name: '歌单'
                    },
                    {
                        id: 1002,
                        name: '用户'
                    },
                    {
                        id: 1004,
                        name: 'MV'
                    },
                    {
                        id: 1006,
                        name: '歌词'
                    },
                    {
                        id: 1009,
                        name: '电台'
                    },
                    {
                        id: 1014,
                        name: '视频'
                    },
                    {
                        id: 1018,
                        name: '综合'
                    }
                ],
                searchListData: [], //接收单曲数据
                albumData: [],//接收专辑数据
                singerData: [],//接收歌手数据
                songSheetData: [],//接收歌单数据
                userData: [],//接收用户数据
                MvData: [],//接收MV数据
                lyricData: [],//接收歌词数据
                radioStationData: [],//接收电台数据
                videoData: [],//接收视频数据
                comprehensiveData: [],//接收综合数据
                offset: 0,
                start: 0,
                searchListIdData:[],//接受所有单曲id，在村道vuex中
            }
        },
        methods: {
            requestData(){},
            //无限滚动时获取单曲数据
            getSingleData(){
                this.$fly.get(`/search?keywords=${this.valueObj}&type=1&offset=${this.offset}`).then(response => {
                    if (response){
                        response.data.result.songs.forEach(item => {
                            this.searchListData.push(item)
                        })
                        console.log(this.searchListData);
                    }
                }).catch(err => {
                    console.log(err);
                })
            },
            //获取专辑数据
            getAlbumData(){
                this.$fly.get(`/search?keywords=${this.valueObj}&type=10&offset=0`).then(response => {
                    if (response){
                        // console.log(response);
                        this.albumData = response.data.result.albums
                        this.albumData.forEach(item => {
                           item.TimeObj = this.$moment(item.publishTime).format('YYYY.MM.DD')
                        })
                        // console.log(this.albumData);
                    }
                }).catch(err => {
                    console.log(err);
                })
            },
            //获取歌手数据
            getSingerData(){
                this.$fly.get(`/search?keywords=${this.valueObj}&type=100&offset=0`).then(response => {
                    if (response){
                        // console.log(response);
                        this.singerData = response.data.result.artists
                        // console.log(this.singerData);
                    }
                }).catch(err => {
                    console.log(err);
                })
            },
            //获取歌单数据
            getSongSheetData(){
                this.$fly.get(`/search?keywords=${this.valueObj}&type=1000&offset=0`).then(response => {
                    if (response){
                        // console.log(response);
                        this.songSheetData = response.data.result.playlists
                        this.songSheetData.forEach(item => {
                            item.PlayObj = (item.playCount/10000).toFixed(1)
                        })
                        this.songSheetData.forEach((item,index) => {
                            if (this.valueObj && this.valueObj.length > 0){
                                let replaceReg = new RegExp(this.valueObj, 'g')
                                let replaceString =
                                    '<span class="search-text">' + this.valueObj + '</span>'
                                this.songSheetData[index].name = item.name.replace(
                                    replaceReg,
                                    replaceString
                                )
                            }
                        })
                        console.log(this.songSheetData);
                    }
                }).catch(err => {
                    console.log(err);
                })
            },
            //获取用户数据
            getUserData(){
                this.$fly.get(`/search?keywords=${this.valueObj}&type=1002&offset=0`).then(response => {
                    if (response){
                        // console.log(response);
                        this.userData = response.data.result.userprofiles
                        this.userData.forEach((item,index) => {
                            if (this.valueObj && this.valueObj.length > 0){
                                let replaceReg = new RegExp(this.valueObj, 'g')
                                let replaceString =
                                    '<span class="search-text">' + this.valueObj + '</span>'
                                this.userData[index].nickname = item.nickname.replace(
                                    replaceReg,
                                    replaceString
                                )
                            }
                        })
                        // console.log(this.userData);
                    }
                }).catch(err => {
                    console.log(err);
                })
            },
            //获取MV数据
            getMvData(){
                this.$fly.get(`/search?keywords=${this.valueObj}&type=1004&offset=0`).then(response => {
                    if (response){
                        // console.log(response);
                        this.MvData = response.data.result.mvs
                        // console.log(this.MvData);
                    }
                }).catch(err => {
                    console.log(err);
                })
            },
            //获取歌词数据
            getLyricData(){
                this.$fly.get(`/search?keywords=${this.valueObj}&type=1006&offset=0`).then(response => {
                    if (response){
                        // console.log(response);
                        this.lyricData = response.data.result.songs
                        console.log(this.lyricData);
                    }
                }).catch(err => {
                    console.log(err);
                })
            },
            //获取电台数据
            getRadioStationData(){
                this.$fly.get(`/search?keywords=${this.valueObj}&type=1009&offset=0`).then(response => {
                    if (response){
                        // console.log(response);
                        this.radioStationData = response.data.result.djRadios
                        this.radioStationData.forEach((item,index) => {
                            if (this.valueObj && this.valueObj.length > 0){
                                let replaceReg = new RegExp(this.valueObj, 'g')
                                let replaceString =
                                    '<span class="search-text">' + this.valueObj + '</span>'
                                this.radioStationData[index].name = item.name.replace(
                                    replaceReg,
                                    replaceString
                                )
                            }
                        })
                        // console.log(this.radioStationData);
                    }
                }).catch(err => {
                    console.log(err);
                })
            },
            //获取视频数据
            getVideoData(){
                this.$fly.get(`/search?keywords=${this.valueObj}&type=1014&offset=0`).then(response => {
                    if (response){
                        // console.log(response);
                        this.videoData = response.data.result.videos
                        this.videoData.forEach(item => {
                            item.PlayCount = (item.playTime/10000).toFixed(0)
                        })
                        this.videoData.forEach((item,index) => {
                            if (this.valueObj && this.valueObj.length > 0){
                                let replaceReg = new RegExp(this.valueObj, 'g')
                                let replaceString =
                                    '<span class="search-text">' + this.valueObj + '</span>'
                                this.videoData[index].title = item.title.replace(
                                    replaceReg,
                                    replaceString
                                )
                            }
                        })
                        wx.hideLoading()
                        // console.log(this.videoData);
                    }
                }).catch(err => {
                    console.log(err);
                    wx.hideLoading()
                })
            },
            //获取综合数据
            getComprehensiveData(){
                this.$fly.get(`/search?keywords=${this.valueObj}&type=1018&offset=0`).then(response => {
                    if (response){
                        console.log(response);
                    }
                }).catch(err => {
                    console.log(err);
                })
            },
            //跳转到播放页面
            jumpPlay(item1){
                console.log(item1.id);
                wx.navigateTo({
                  url: `../playRouting/PlayRouting?songData=${item1.id}&fromSinger=3`
                })
            }
        },
        mounted() {
            this.getAlbumData()
            this.getSingerData()
            this.getSongSheetData()
            this.getUserData()
            this.getMvData()
            this.getLyricData()
            this.getRadioStationData()
            this.getVideoData()
            // this.getComprehensiveData()
        },
        onLoad: function(options){
            wx.showLoading({
                title: '加载中...',
            })
            console.log(options.itemData);
            this.valueObj = options.itemData;
            this.$fly.get(`/search?keywords=${options.itemData}&type=1&offset=${this.offset}`).then(response => {
                if (response){
                    // console.log(response);
                    this.searchListData = response.data.result.songs
                    response.data.result.songs.forEach(item => {
                        this.searchListIdData.push(item.id)
                    this.$store.state.searchListIdData = this.searchListIdData
                })
                    console.log(this.searchListData);
                    console.log(this.$store.state.searchListIdData);
                    // wx.hideLoading()
                }
            }).catch(err => {
                console.log(err);
            })
        },
        created() {

        },
        //无限滚动
        onReachBottom: function(){
            this.start = this.offset
            this.offset = this.searchListData.length
            if (this.start !== this.offset){
               this.getSingleData()
            }else if (this.start === this.offset) {
                  wx.showToast({
                      title: '已经到底啦',
                      icon: 'none',
                      duration: 2000
                  })
            }
        },
        filters: {},
        computed: {},
        watch: {},
        directives: {}
    }
</script>

<style scoped lang="scss">
.search_list_first{
    width: 270px;
    margin: 5px auto;
    position: relative;
}
.search_list_input{
    width: 250px;
    height: 30px;
    background-color: #eeeeee;
    border-radius: 25px;
    font-size: 14px;
    padding-left: 20px;
}
.search_list_img{
    width: 18px;
    height: 18px;
    position: absolute;
    top: 7px;
    left: 5px;
}
.search_list_second{}
.second_tab{
    display: flex;
    align-items: center;
}
.second_tab_img{
    width: 18px;
    height: 18px;
    margin-left: 5px;
}
.second_tab_playAll{
    font-size: 14px;
    margin-left: 10px;
}
.second_tab_content_item{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
}
.content_item_left{}
.content_item_left_1{
    font-size: 14px;
}
.content_item_left_2{
    font-size: 12px;
}
.left_2_valueObj{
    color: darkturquoise;
}
.left_2_name{
    color: #bfbfbf;
}
</style>