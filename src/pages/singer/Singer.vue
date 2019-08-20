<config>
    {
    "navigationBarTitleText": "歌手",
    "navigationBarTextStyle": "white",
    "usingComponents": {
      "van-tab": "../../native/vant/tab/index",
      "van-tabs": "../../native/vant/tabs/index"
       },
    }
</config>
<template>
    <div>
        <van-tabs :active="activeObj" @change="switchTab">
            <van-tab v-for="(item,index) in singerTypeArr" :key="index" :title="item">
                <scroll-view scroll-x v-if="index !==0 " style="width: 100%;padding-right: 20rpx;">
                   <div class="box">
                       <div  v-for="(item1,index1) in alphabetArr"
                             :key="index1" class="alphabet_arr_item"
                             :class="{alphabet_arr_item_hide: index1===0,alphabet_hide: tabNumObj === index1 && index1 !== 0}"
                             @click="alphabeticalIndex(item1,index1)">
                           {{item1}}
                       </div>
                   </div>
                </scroll-view>
                <SingerInformation :singerDataArr="singerDataArr"></SingerInformation>
            </van-tab>
        </van-tabs>
    </div>
    
</template>

<script>
    import SingerInformation from "../../components/SingerInformation"
    export default {
        name: "Singer",
        components: {
            SingerInformation
        },
        props: {},
        data() {
            return {
                activeObj: 0 ,
                alphabetArr: ['热','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
                singerTypeArr:['入驻歌手','华语男歌手','华语女歌手','华语组合/乐队','欧美男歌手','欧美女歌手','欧美组合/乐队','日本男歌手','日本女歌手',
                    '日本组合/乐队','韩国男歌手','韩国女歌手','韩国组合/乐队','其他男歌手','其他女歌手','其他组合/乐队'],
                cat: 5001,//获取歌手信息时用的参数
                offset: 0,//偏移数量，用于分页
                limit: 30,
                startObj: 0,//用来判断上拉时是否到底了
                singerDataArr: [],//接收歌手数据
                alphabet: '',//获取歌手信息时按字母表索引用的参数
                tabNumObj: 0//实现字母表tab切换
            }
        },
        methods: {
            switchTab(e){
                // console.log(e.detail.index);
                if (e.detail.index === 0){
                    this.offset = 0
                    this.alphabet = ''
                    this.cat = 5001
                    this.getAlphabeticalIndexArr()
                }else if (e.detail.index === 1){
                    this.offset = 0
                    this.alphabet = ''
                    this.cat = 1001
                    this.getAlphabeticalIndexArr()
                }else if (e.detail.index === 2) {
                    this.offset = 0
                    this.alphabet = ''
                    this.cat = 1002
                    this.getAlphabeticalIndexArr()
                }else if (e.detail.index ===3) {
                    this.offset = 0
                    this.alphabet = ''
                    this.cat = 1003
                    this.getAlphabeticalIndexArr()
                }else if (e.detail.index === 4) {
                    this.offset = 0
                    this.alphabet = ''
                    this.cat = 2001
                    this.getAlphabeticalIndexArr()
                }else if (e.detail.index === 5) {
                    this.offset = 0
                    this.alphabet = ''
                    this.cat = 2002
                    this.getAlphabeticalIndexArr()
                }else if (e.detail.index === 6) {
                    this.offset = 0
                    this.alphabet = ''
                    this.cat = 2003
                    this.getAlphabeticalIndexArr()
                }else if (e.detail.index ===7) {
                    this.offset = 0
                    this.alphabet = ''
                    this.cat = 6001
                    this.getAlphabeticalIndexArr()
                }else if (e.detail.index === 8) {
                    this.offset = 0
                    this.alphabet = ''
                    this.cat = 6002
                    this.getAlphabeticalIndexArr()
                }else if (e.detail.index === 9) {
                    this.offset = 0
                    this.alphabet = ''
                    this.cat = 6003
                    this.getAlphabeticalIndexArr()
                }else if (e.detail.index === 10) {
                    this.offset = 0
                    this.alphabet = ''
                    this.cat = 7001
                    this.getAlphabeticalIndexArr()
                }else if (e.detail.index === 11) {
                    this.offset = 0
                    this.alphabet = ''
                    this.cat = 7002
                    this.getAlphabeticalIndexArr()
                }else if (e.detail.index === 12) {
                    this.offset = 0
                    this.alphabet = ''
                    this.cat = 7003
                    this.getAlphabeticalIndexArr()
                }else if (e.detail.index === 13) {
                    this.offset = 0
                    this.alphabet = ''
                    this.cat = 4001
                    this.getAlphabeticalIndexArr()
                }else if (e.detail.index === 14) {
                    this.offset = 0
                    this.alphabet = ''
                    this.cat = 4002
                    this.getAlphabeticalIndexArr()
                }else if (e.detail.index === 15) {
                    this.offset = 0
                    this.alphabet = ''
                    this.cat = 4003
                    this.getAlphabeticalIndexArr()
                }
            },
            //获取歌手信息
            getSingerInformation(){
                this.$fly.get(`/artist/list?cat=${this.cat}&offset=${this.offset}&limit=${this.limit}`).then(response => {
                    if (response){
                        // console.log(response);
                        this.singerDataArr = response.data.artists
                        console.log(this.singerDataArr);
                        wx.hideLoading()
                    }
                }).catch(err => {
                    console.log(err);
                    wx.hideLoading()
                })
            },
            //按字母表索引搜索
            getAlphabeticalIndexArr(){
                this.$fly.get(`/artist/list?cat=${this.cat}&offset=${this.offset}&limit=${this.limit}&initial=${this.alphabet}`).then(response => {
                    if (response){
                        this.singerDataArr = response.data.artists
                        console.log(this.singerDataArr);
                    }
                }).catch(err => {
                    console.log(err);
                })
            },
            //点击字母表发生的事件
            alphabeticalIndex(item,index){
                this.tabNumObj = index
                // console.log(item.toLowerCase());
                if (item === '热'){
                    this.alphabet = ''
                    this.offset = 0
                    this.getAlphabeticalIndexArr()
                } else {
                    this.alphabet = item
                    this.offset = 0
                    // console.log(this.alphabet);
                    this.getAlphabeticalIndexArr()
                }
            }
        },
        mounted() {
              this.getSingerInformation()
        },
        onLoad: function(options){
              wx.showLoading({
                  title: '加载中...'
              })
        },
        //无限滚动
        onReachBottom:function(){
            this.startObj = this.offset
            this.offset = this.singerDataArr.length
            if (this.offset !== this.startObj){
                this.$fly.get(`/artist/list?cat=${this.cat}&offset=${this.offset}&limit=${this.limit}&initial=${this.alphabet}`).then(response => {
                    if (response){
                        response.data.artists.forEach(item => {
                            this.singerDataArr.push(item)
                        })
                        console.log(this.singerDataArr);
                    }
                }).catch(err => {
                    console.log(err);
                })
            }else if (this.offset === this.startObj) {
               wx.showToast({
                   title: '已经到底啦',
                   icon: 'none',
                   duration: 2000
               })
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
.alphabet_arr_item{
    width: 20px;
    height: 20px;
    margin-left: 5px;
    display: inline-block;
}
.alphabet_arr_item_hide {
    background-color: #d81e06;
    color: white;
}
.box {
    display: flex;
    flex-wrap: nowrap;
    padding: 0 20rpx;
}
.alphabet_hide{
    color: #d81e06;
}
</style>