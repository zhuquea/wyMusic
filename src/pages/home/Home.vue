<config>
    {
    "usingComponents": {}
    }
</config>
<template>
    <div>
        <div class="home_first">
            <div class="home_first_1">音乐馆</div>
            <div class="home_first_2">
                <img src="../../native/tabbar/search.png" alt="" class="home_first_2_img">
                <input v-model.trim="value" placeholder="请输入搜索关键词" @focus="FocusObj" @blur="BlurObj" @input="searchEvent" class="home_first_2_input">
                <div class="home_first_2_action" v-if="showSearchPage===false">搜索</div>
                <div class="home_first_2_action" @click="onCancel" v-else-if="showSearchPage">取消</div>
            </div>
                <div class="home_first_3"><img src="../../native/tabbar/music.png" alt="" class="home_first_3_img"></div>
        </div>
        <SearchPage v-if="showSearchPage === true"
                    :receiveSearchData.sync="receiveSearchData"
                    :showHotSearchData.sync="showHotSearchData"
                    :showSearchHistory.sync="showSearchHistory"
                    :searchHistory.sync="searchHistory" :value.sync="value"></SearchPage>
        <div v-else-if="showSearchPage === false">
            <div class="home_second">
                <swiper :indicator-dots="indicatorDots"
                        :autoplay="autoplay" :interval="interval" :duration="duration">
                    <block v-for="(item,index) in bannerData" :key="index">
                        <swiper-item>
                            <img :src="item.pic" class="home_second_1"/>
                        </swiper-item>
                    </block>
                </swiper>
            </div>
            <div class="home_third">
                <div class="home_third_item">
                    <div class="home_third_content">每日推荐</div>
                    <img src="../../native/tabbar/tuijian.png" alt="" class="home_third_img">
                </div>
                <div class="home_third_item">
                    <div class="home_third_content">歌单</div>
                    <img src="../../native/tabbar/gedan.png" alt="" class="home_third_img">
                </div>
                <div class="home_third_item">
                    <div class="home_third_content">排行榜</div>
                    <img src="../../native/tabbar/PHB.png" alt="" class="home_third_img">
                </div>
                <div class="home_third_item">
                    <div class="home_third_content">电台</div>
                    <img src="../../native/tabbar/diantai.png" alt="" class="home_third_img">
                </div>
                <div class="home_third_item">
                    <div class="home_third_content">直播</div>
                    <img src="../../native/tabbar/zhibo.png" alt="" class="home_third_img">
                </div>
            </div>
            <div class="home_fourth">
                <div class="home_fourth_left">推荐歌单</div>
                <div class="home_fourth_right">歌单广场</div>
            </div>
            <HomeSubcomponent :tableData="recommendSongList"></HomeSubcomponent>
            <div class="home_fifth">
                <div>
                    <span class="home_fifth_1" :class="{home_fifth_1_hide: tabNum === 1}" @click="switchClass1">新碟</span>
                    <span class="home_fifth_1" :class="{home_fifth_1_hide: tabNum === 2}" @click="switchClass2">新歌</span>
                </div>
                <div class="home_fourth_right">
                    更多新碟
                </div>
            </div>
            <div class="home_fifth_six" v-if="tabNum === 2">
                <div v-for="(item,index) in NewSongData" :key="index" class="table_data_item">
                    <img :src="item.album.picUrl" alt="" class="table_data_img">
                    <div class="table_data_name">
                        {{item.name}}
                    </div>
                </div>
            </div>
            <div class="home_fifth_six" v-else-if="tabNum === 1">
                <div v-for="(item,index) in NewDishData" :key="index" class="table_data_item">
                    <img :src="item.picUrl" alt="" class="table_data_img">
                    <div class="table_data_name">
                        {{item.name}}
                    </div>
                </div>
            </div>
            <div class="home_fourth">
                <div class="home_fourth_left">音乐新势力</div>
                <div class="home_fourth_right">新音乐</div>
            </div>
            <HomeSubcomponent :tableData="NewForcesMusic"></HomeSubcomponent>
            <div class="home_fourth">
                <div class="home_fourth_left">推荐电台</div>
                <div class="home_fourth_right">电台广场</div>
            </div>
            <HomeSubcomponent :tableData="radioStationData"></HomeSubcomponent>
            <div class="home_fourth">
                <div class="home_fourth_left">推荐节目</div>
                <div class="home_fourth_right">更多节目</div>
            </div>
            <HomeSubcomponent :tableData="recommendProgram"></HomeSubcomponent>
        </div>
    </div>
    
</template>

<script>
    import HomeSubcomponent from "../../components/HomeSubcomponent"
    import SearchPage from "../../components/SearchPage"
    export default {
        name: "Home",
        components: {
            HomeSubcomponent,
            SearchPage
        },
        props: {},
        data() {
            return {
                value: "",
                bannerData:[],//轮播图数据
                indicatorDots: true,//是否显示面板指示点
                autoplay: true,//是否自动切换
                interval: 3000,//自动切换时间间隔
                duration: 500, //滑动动画时长
                recommendSongList: [],//推荐歌单
                tabNum: 1,//实现“新歌，新碟”的tab切换
                NewSongData:[],//‘新歌’数据
                NewDishData:[],//‘新碟’数据
                NewForcesMusic: [],//‘音乐新势力’数据
                radioStationData: [],//‘推荐电台’数据
                recommendProgram: [], //‘推荐节目’数据
                showSearchPage: false, //控制搜索子组件的显示,控制搜索框右侧的‘搜索’和‘取消’的显示隐藏
                receiveSearchData: [],//接收搜索出来的数据
                showHotSearchData: false,//控制SearchPage子组件中热搜榜的显示和隐藏
                searchHistory: [],//存储搜索历史
                showSearchHistory: false//控制SearchPage子组件中搜索历史的显示和隐藏
            }
        },
        methods: {
            onCancel(){
                this.showSearchPage = false
                this.showHotSearchData = false
                this.value = ""
            },
            FocusObj(){
                this.showSearchPage = true
            },
            BlurObj(){
                if (this.value){
                    this.searchHistory.push(this.value)
                    wx.setStorageSync('searchHistory', this.searchHistory);
                }
            },
            //搜索功能
            searchEvent(){
                // console.log(this.value);
                if (this.value){
                    this.$fly.get(`/search/suggest?keywords=${this.value}&type=mobile`).then(response => {
                        if (response){
                            console.log(response);
                            this.receiveSearchData = response.data.result.allMatch
                            if (this.receiveSearchData.length>0){
                                this.showHotSearchData = true
                            }
                            console.log(this.receiveSearchData);
                        }
                    }).catch(err => {
                        console.log(err);
                        this.showHotSearchData = false
                    })
                }
            },
            //调用轮播图
            getBanner(){
                this.$fly.get(`/banner?type=2`).then(response =>{
                    if (response){
                        this.bannerData = response.data.banners
                    }
                    // console.log(this.bannerData);
                }).catch(err => {
                    console.log(err);
                })
            },
            //获取推荐歌单
            getRecommendSongList(){
                this.$fly.get(`/personalized`).then(response => {
                    if (response){
                        this.recommendSongList = response.data.result.slice(0,6)
                        console.log(this.recommendSongList);
                    }
                }).catch(err => {
                    console.log(err);
                })
            },
            //实现“新歌，新碟”的tab切换
            switchClass1(){
                this.tabNum = 1
            },
            //实现“新歌，新碟”的tab切换
            switchClass2(){
                this.tabNum = 2
            },
            //获取‘新歌’
            getNewSongData(){
                this.$fly.get(`/top/song?type=0`).then(response => {
                    if (response){
                        // console.log(response.data.data);
                        this.NewSongData = response.data.data.slice(0,6)
                    }
                }).catch(err => {
                    console.log(err);
                })
            },
            //获取‘新碟’
            getNewDishData(){
                this.$fly.get(`/top/album?offset=0&limit=30`).then(response => {
                    if (response) {
                        // console.log(response.data.albums);
                        this.NewDishData = response.data.albums.slice(6,12)
                    }
                }).catch(err => {
                    console.log(err);
                })
            },
            //获取‘音乐新势力’数据
            getNewForcesMusic(){
                this.$fly.get(`/personalized/newsong`).then(response => {
                    if (response){
                        this.NewForcesMusic = response.data.result.slice(0,6)
                        console.log(response.data.result);
                        wx.hideLoading()
                    }
                }).catch(err => {
                    console.log(err);
                    wx.hideLoading()
                })
            },
            //获取‘推荐电台’数据
            getRadioStationData(){
                this.$fly.get(`/personalized/djprogram`).then(response => {
                    if (response){
                        console.log(response.data.result);
                        this.radioStationData = response.data.result
                    }
                }).catch(err => {
                    console.log(err);
                })
            },
            //获取‘推荐节目’数据
            getRecommendProgram(){
                this.$fly.get(`/program/recommend`).then(response => {
                    if (response){
                        console.log(response.data.programs);
                        this.recommendProgram = response.data.programs;
                    }
                }).catch(err => {
                    console.log(err);
                })
            }
        },
        mounted() {
            this.getBanner()
            this.getRecommendSongList()
            this.getNewSongData()
            this.getNewDishData()
            this.getNewForcesMusic()
            this.getRadioStationData()
            this.getRecommendProgram()
        },
        onLoad: function(options){
            wx.showLoading({
                title: '加载中...',
            })
            if(wx.getStorageSync('searchHistory')){
                this.searchHistory = wx.getStorageSync('searchHistory');
                this.showSearchHistory = true
            }
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
.home_first{
    display: flex;
    align-items: center;
    justify-content: space-around;
    line-height: 20px;
    margin-top: 5px;
}
.home_first_1{
    width: 60px;
    font-size: 17px;
    font-weight: bold;
}
.home_first_2{
    font-size: 18px;
    display: flex;
    align-items: center;
    position: relative;
}
.home_first_2_img{
    width: 18px;
    height: 18px;
    position: absolute;
    top: 7px;
    left: 5px;
}
.home_first_2_input{
    width: 150px;
    height: 30px;
    background-color: #eeeeee;
    border-radius: 25px;
    font-size: 14px;
    padding-left: 20px;
}
.home_first_2_action{
    font-size: 14px;
}
.home_first_3{
}
.home_first_3_img{
    width: 28px;
    height: 28px;
}
.home_second{
    padding: 10px;
}
.home_second_1{
    /*border-radius: 20px;*/
}
.home_third{
    display: flex;
    justify-content: space-around;
}
.home_third_item{
    text-align: center;
    line-height: 20px;
}
.home_third_content{
    font-size: 15px;
}
.home_third_img{
    width: 20px;
    height: 20px;
}
.home_fourth{
   display: flex;
    justify-content: space-around;
    margin-top: 5px;
}
.home_fourth_left,.home_fourth_right{
    width: 80px;
    line-height: 30px;
    font-size: 16px;
    text-align: center;
}
.home_fourth_right{
    background-color: #dbdbdb;
    border-radius: 25px;
}
.home_fifth_1{
    font-weight: bold;
    font-size: 15px;
    color: #dbdbdb;
    margin-left: 5px;
}
.home_fifth_1_hide{
    font-size: 18px;
    color: black;
}
.home_fifth{
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-around;
}
.home_fifth_six{
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
}
.table_data_item{
    margin-left: 5px;
}
.table_data_img{
    width: 100px;
    height: 60px;
    border-radius: 5px;
}
.table_data_name{
    width: 100px;
    font-size: 13px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow:ellipsis;
}
</style>