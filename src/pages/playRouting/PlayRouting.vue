<config>
    {
    "navigationBarTitleText": "播放歌曲",
    "navigationBarTextStyle": "white",
    "usingComponents": {},
    }
</config>
<template>
    <div class="play_routing_body">
        <img :src="songImg" alt="" class="body_img">
        <div class="play_routing_lyric">
            <div class="play_routing_lyric_g">{{g}}</div>
        </div>
        <div class="play_routing_first">
            <div class="song_name">{{songName}}</div>
            <div class="song_author">{{songAuthor}}</div>
        </div>
        <div class="play_routing_second">
            <img :src="songImg" alt="" class="play_routing_second_img" :class="{play_routing_second_img_hide1: rotateBlo===true}">
        </div>
        <div class="play_routing_third">
            <div class="third_1">{{showtime1}}</div>
            <slider min="0" :max="sliderMax" step="1" :value="valueNum" block-size="18" class="third_2" @change="sliderChange"></slider>
            <div class="third_1">{{showtime2}}</div>
        </div>
        <div class="play_routing_fourth">
            <div class="routing_fourth_item">
                <img src="../../native/tabbar/shunxuWhite.png" alt="" class="routing_fourth_1_img" v-show="tabMode === 1" @click="tabPlayMode1">
                <img src="../../native/tabbar/suijiWhite.png" alt="" class="routing_fourth_1_img" v-show="tabMode === 2" @click="tabPlayMode2">
                <img src="../../native/tabbar/xunhuanWhite.png" alt="" class="routing_fourth_1_img" v-show="tabMode === 3" @click="tabPlayMode3">
            </div>
            <div class="routing_fourth_item">
                <img src="../../native/tabbar/lastOne.png" alt="" class="routing_fourth_1_img" @click="lastSong">
            </div>
            <div class="routing_fourth_item">
                <img src="../../native/tabbar/playWhite.png" alt="" class="routing_fourth_1_img" v-show="playing===true" @click="rotateObj1">
                <img src="../../native/tabbar/stopWhite.png" alt="" class="routing_fourth_1_img" v-show="playing===false" @click="rotateObj2">
            </div>
            <div class="routing_fourth_item">
                <img src="../../native/tabbar/nextOne.png" alt="" class="routing_fourth_1_img" @click="nextSong">
            </div>
            <div class="routing_fourth_item">
                <img src="../../native/tabbar/shoucangWhite.png" alt="" class="routing_fourth_1_img">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "PlayRouting",
        components: {},
        props: {},
        data() {
            return {
                itemDetailsId: "",//接收歌单的id，用来请求歌单详情
                songDataId: "",//接收歌曲ID，用来获取相应歌曲详情
                songDataDetails: [], //接收歌曲详情
                songName: "",//歌曲名
                songAuthor: "",//歌曲作者
                songImg: "",//歌曲图片
                playing: false,//控制播放和暂停图片的显示和隐藏
                tabMode: 1 ,//控制播放模式的切换
                valueNum: 0,
                showtime1: '00:00',
                showtime2: '00:00',
                audioSeek: 0,
                audioDuration: 0,
                sliderMax: 0,
                songIdData: [],//接受所有歌曲ID
                mp3Url: "",//接收歌曲音频播放地址
                rotateBlo: true,//控制圆形图片的旋转和停止旋转
                currentLength: "",//当前音频的长度
                currentLocaltion: "",//当前音频位置
                lastOneData: 0,//当lastOneData值为1时，点击上一首会让歌曲返回听过的上一首，否则就随机生成一首
                lyricDataStr: '',//接收歌词
                g: '',
                // height: 'auto'
            }
        },
        methods: {
            //获取歌曲详情
            getSongData(){
                this.$fly.get(`/song/detail?ids=${this.songDataId}`).then(response => {
                    if (response){
                        this.songDataDetails = response.data.songs
                        this.songName = response.data.songs[0].name
                        this.songAuthor = response.data.songs[0].ar[0].name
                        this.songImg = response.data.songs[0].al.picUrl
                        // console.log(this.songDataDetails);
                        // console.log(response);
                    }
                }).catch(err => {
                    console.log(err);
                })
            },
            //获取歌词
            getLyricData(){
                this.$fly.get(`/lyric?id=${this.songDataId}`).then(response => {
                    if (response){
                        this.lyricDataStr = response.data.lrc.lyric
                        let lyrics = this.lyricDataStr.split("\n");
                        let lrcObj = {};
                        for (let i = 0 ; i< lyrics.length ; i++) {
                            let lyric = decodeURIComponent(lyrics[i]);
                            let timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
                            let timeRegExpArr = lyric.match(timeReg);
                            if(!timeRegExpArr)continue;
                            let clause = lyric.replace(timeReg,'');
                            for (let k = 0,h =timeRegExpArr.length; k<h ;k++){
                                let t = timeRegExpArr[k];
                                let min = Number(String(t.match(/\[\d*/i)).slice(1)),
                                    sec = Number(String(t.match(/\:\d*/i)).slice(1));
                                let time = min * 60 + sec;
                                lrcObj[time] = clause;
                            }
                        }
                        this.lyricDataStr = lrcObj
                        // console.log(this.lyricDataStr);
                    }
                }).catch(err => {
                    console.log(err);
                })
            },
            //切换播放模式
            tabPlayMode1(){
                  this.tabMode = 2
                  wx.showToast({
                       title: '切换到随机播放',
                       icon: 'none',
                       duration: 2000
                  })
            },
            tabPlayMode2(){
                 this.tabMode = 3
                wx.showToast({
                    title: '切换到单曲循环',
                    icon: 'none',
                    duration: 2000
                })
            },
            tabPlayMode3(){
                this.tabMode = 1
                wx.showToast({
                    title: '切换到顺序播放',
                    icon: 'none',
                    duration: 2000
                })
            },
            //控制圆形图片的旋转合停止，也是播放功能和暂停功能
            rotateObj1(){
                this.playing = false
                this.rotateBlo = true
                if (this.tabMode === 3){
                    this.$audio.loop = true
                }
                this.$audio.play()
                // this.$audio.onTimeUpdate(()=> {
                //     console.log(this.$audio.currentTime);
                // })
            },
            rotateObj2(){
                this.playing = true
                this.rotateBlo = false
                this.$audio.pause()
            },
            //获取歌曲的音频播放地址
            getSongUrl(){
                this.$fly.get(`/song/url?id=${this.songDataId}`).then(response => {
                    if (response) {
                        // console.log(response.data.data);
                        this.mp3Url = response.data.data[0].url
                        this.$audio.src = this.mp3Url
                        this.$audio.play()
                        // this.onTimeUpdateObj()
                        // this.onEndedObj()
                        console.log(this.mp3Url);
                    }
                }).catch(err => {
                    console.log(err);
                })
            },
            //获取歌单详情，从中拿到所有的歌曲ID
            getSongList(){
                this.$fly.get(`/playlist/detail?id=${this.itemDetailsId}`).then(response => {
                    if (response) {
                        // console.log(response.data.playlist.tracks);
                        response.data.playlist.tracks.forEach(item => {
                            this.songIdData.push(item.id)
                        })
                        console.log(this.songIdData);
                        // console.log(typeof this.songIdData[0]);
                    }
                }).catch(err => {
                    console.log(err);
                })
            },
            //上一首
            lastSong(){
                this.$audio.destroy()
                let numObj1_1 = this.songIdData.indexOf(this.songDataId)
                // this.$store.state.saveIndex.push(numObj1_1)
                // console.log(numObj1_1);
                let numObj2_2 = this.songIdData.length
                if (this.tabMode === 1 || this.tabMode ===3){
                    if (numObj1_1 === 0) {
                        numObj1_1 = numObj2_2 - 1
                        this.songDataId = this.songIdData[numObj1_1]
                        this.getSongData()
                        this.getSongUrl()
                        this.getLyricData()
                    }else if(numObj1_1 > 0){
                        numObj1_1--
                        this.songDataId = this.songIdData[numObj1_1]
                        this.getSongData()
                        this.getSongUrl()
                        this.getLyricData()
                    }
                }else if (this.tabMode === 2){
                    this.lastOneData++
                    if (this.lastOneData ===1) {
                        let numDataObj = this.$store.state.saveIndex.length
                        console.log(numDataObj);
                        this.songDataId = this.songIdData[this.$store.state.saveIndex[numDataObj-1]]
                        console.log(this.$store.state.saveIndex[numDataObj - 1]);
                        console.log(this.songDataId);
                        this.getSongData()
                        this.getSongUrl()
                        this.getLyricData()
                    }else {
                        let numObj3 = Math.floor(Math.random() * numObj2_2)
                        this.songDataId = this.songIdData[numObj3]
                        this.getSongData()
                        this.getSongUrl()
                        this.getLyricData()
                    }
                }
            },
            //下一首
            nextSong(){
                this.$audio.destroy()
                this.lastOneData = 0//让这个值变回0，这样在点击上一首时会返回到听过的上一首
               let numObj1 = this.songIdData.indexOf(this.songDataId)
                this.$store.state.saveIndex.push(numObj1)
                // console.log(numObj1);
                let numObj2 = this.songIdData.length
                if (this.tabMode === 1 || this.tabMode ===3){
                    if (numObj1 === numObj2 -1){
                        numObj1 = 0
                        this.songDataId = this.songIdData[numObj1]
                        this.getSongData()
                        this.getSongUrl()
                        this.getLyricData()
                    }else if (numObj1 < numObj2 -1){
                        numObj1++
                        this.songDataId = this.songIdData[numObj1]
                        this.getSongData()
                        this.getSongUrl()
                        this.getLyricData()
                    }
                }else if (this.tabMode === 2){
                    let numObj3 = Math.floor(Math.random() * numObj2)
                    this.songDataId = this.songIdData[numObj3]
                    this.getSongData()
                    this.getSongUrl()
                    this.getLyricData()
                }
            },
            //拖动进度条事件
            sliderChange(e){
                this.$audio.seek(e.detail.value)
                this.$audio.play()
                let obj = this.lyricDataStr[Math.floor(e.detail.value)];
                // console.log(obj);
                if(obj!==undefined){
                    this.g = obj;
                    // console.log(this.g);
                }
                console.log(this.g);
            },
            //监听音乐进度条更新
            onTimeUpdateObj(){
                this.$audio.onTimeUpdate(()=> {
                    setTimeout(() => {
                        // console.log(this.$audio.duration);
                        this.sliderMax = parseInt(this.$audio.duration)
                        let duration = this.$audio.duration
                        let min = parseInt(duration / 60)
                        let sec = parseInt(duration % 60)
                        if (min.toString().length === 1) {
                            min = `0${min}`;
                        }
                        if (sec.toString().length === 1) {
                            sec = `0${sec}`;
                        }
                        this.showtime2 = `${min}:${sec}`
                    },1000)
                    this.valueNum = parseInt(this.$audio.currentTime)
                    let min1 = parseInt(this.valueNum / 60)
                    let sec1 = parseInt(this.valueNum % 60)
                    if (min1.toString().length === 1) {
                        min1 = `0${min1}`;
                    }
                    if (sec1.toString().length === 1) {
                        sec1 = `0${sec1}`;
                    }
                    this.showtime1 = `${min1}:${sec1}`
                    let obj = this.lyricDataStr[Math.floor(this.$audio.currentTime)];
                    // console.log(obj);
                    if(obj!==undefined){
                        this.g = obj;
                        // console.log(this.g);
                    }
                    console.log(this.g);
                    // console.log(this.valueNum);
                })
            },
            //监听音乐自然播放结束
            onEndedObj(){
                this.$audio.onEnded(() => {
                    // this.$audio.destroy()
                    if (this.tabMode === 1) {
                        let numObj1 = this.songIdData.indexOf(this.songDataId)
                        this.songDataId = this.songIdData[numObj1 + 1]
                        console.log(this.songDataId);
                        this.getSongData()
                        this.getSongUrl()
                        this.getLyricData()
                    }else if (this.tabMode === 2){
                        let numObj2 = this.songIdData.length
                        let numObj3 = Math.floor(Math.random() * numObj2)
                        this.songDataId = this.songIdData[numObj3]
                        this.getSongData()
                        this.getSongUrl()
                        this.getLyricData()
                    } else if (this.tabMode === 3){
                        let numObj1 = this.songIdData.indexOf(this.songDataId)
                        this.songDataId = this.songIdData[numObj1]
                        this.getSongData()
                        this.getSongUrl()
                        this.getLyricData()
                    }
                })
            },
        },
        mounted() {
           this.getSongData()
            // this.getLyricData()
            // this.getSongUrl()
            // this.getSongList()
        },
        onLoad: function(options){
            this.songDataId = Number(options.songData)
           // console.log(typeof this.songDataId)
            this.itemDetailsId = options.itemDetailsId
            // this.getSongList()
            console.log(this.itemDetailsId);
            if (options.fromSinger=== '1'){
                this.$fly.get(`/playlist/detail?id=${this.itemDetailsId}`).then(response => {
                    if (response) {
                        response.data.playlist.tracks.forEach(item => {
                            this.songIdData.push(item.id)
                        })
                        console.log(this.songIdData);
                        this.$store.state.saveIndex.push(this.songIdData.indexOf(this.songDataId))
                        console.log(this.$store.state.saveIndex);
                        // console.log(typeof this.songIdData[0]);
                    }
                }).catch(err => {
                    console.log(err);
                })
            }else if (options.fromSinger=== '2'){
                this.$fly.get(`/artists?id=${this.itemDetailsId}`).then(response => {
                    if (response){
                        response.data.hotSongs.forEach(item => {
                            this.songIdData.push(item.id)
                        })
                        console.log(this.songIdData);
                        this.$store.state.saveIndex.push(this.songIdData.indexOf(this.songDataId))
                    }
                }).catch(err => {
                    console.log(err);
                })
            }else if (options.fromSinger=== '3') {
                this.songIdData = this.$store.state.searchListIdData
            }

            this.$fly.get(`/lyric?id=${this.songDataId}`).then(response => {
                if (response){
                    this.lyricDataStr = response.data.lrc.lyric
                    let lyrics = this.lyricDataStr.split("\n");
                    let lrcObj = {};
                    for (let i = 0 ; i< lyrics.length ; i++) {
                        let lyric = decodeURIComponent(lyrics[i]);
                        let timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
                        let timeRegExpArr = lyric.match(timeReg);
                        if(!timeRegExpArr)continue;
                        let clause = lyric.replace(timeReg,'');
                        for (let k = 0,h =timeRegExpArr.length; k<h ;k++){
                            let t = timeRegExpArr[k];
                            let min = Number(String(t.match(/\[\d*/i)).slice(1)),
                                sec = Number(String(t.match(/\:\d*/i)).slice(1));
                            let time = min * 60 + sec;
                            lrcObj[time] = clause;
                        }
                    }
                    this.lyricDataStr = lrcObj
                    // console.log(this.lyricDataStr);
                }
            }).catch(err => {
                console.log(err);
            })
            // console.log(this.itemDetailsId);
            this.$fly.get(`/song/url?id=${Number(options.songData)}`).then(response => {
                if (response) {
                    this.mp3Url = response.data.data[0].url
                    console.log(this.mp3Url);
                    this.$audio.src = this.mp3Url
                    this.$audio.autoplay = true
                    this.$audio.onTimeUpdate(()=> {
                        setTimeout(() => {
                            // console.log(this.$audio.duration);
                            this.sliderMax = parseInt(this.$audio.duration)
                            let duration = this.$audio.duration
                            let min = parseInt(duration / 60)
                            let sec = parseInt(duration % 60)
                            if (min.toString().length === 1) {
                                min = `0${min}`;
                            }
                            if (sec.toString().length === 1) {
                                sec = `0${sec}`;
                            }
                            this.showtime2 = `${min}:${sec}`
                            // this.audioDuration = this.$audio.duration
                        },1000)
                        this.valueNum = parseInt(this.$audio.currentTime)
                        let min1 = parseInt(this.valueNum / 60)
                        let sec1 = parseInt(this.valueNum % 60)
                        if (min1.toString().length === 1) {
                            min1 = `0${min1}`;
                        }
                        if (sec1.toString().length === 1) {
                            sec1 = `0${sec1}`;
                        }
                        this.showtime1 = `${min1}:${sec1}`
                        // console.log(this.valueNum);
                        let obj = this.lyricDataStr[Math.floor(this.$audio.currentTime)];
                        // console.log(obj);
                        if(obj!==undefined){
                            this.g = obj;
                            // console.log(this.g);
                        }
                        // console.log(this.g);
                    })
                    // this.height =window.innerHeight+'px'
                    // window.onresize  = ()=>{
                    //     this.height =window.innerHeight+'px'
                    // }
                }
            }).catch(err => {
                console.log(err);
            })
            // console.log(this.songDataId);
            this.$audio.onPlay(() => {

            })
            // console.log(this.songIdData.length);
            this.$audio.onEnded(() => {
                // this.$audio.destroy()
                if (this.tabMode === 1) {
                    let numObj1 = this.songIdData.indexOf(this.songDataId)
                    this.songDataId = this.songIdData[numObj1 + 1]
                    console.log(this.songDataId);
                    this.getSongData()
                    this.getSongUrl()
                    this.getLyricData()
                }else if (this.tabMode === 2){
                    let numObj2 = this.songIdData.length
                    let numObj3 = Math.floor(Math.random() * numObj2)
                    this.songDataId = this.songIdData[numObj3]
                    this.getSongData()
                    this.getSongUrl()
                    this.getLyricData()
                } else if (this.tabMode === 3){
                    let numObj1 = this.songIdData.indexOf(this.songDataId)
                    this.songDataId = this.songIdData[numObj1]
                    this.getSongData()
                    this.getSongUrl()
                    this.getLyricData()
                }
            })

        },
        onShow:function(){
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
.body_img{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    filter: blur(5px);
    width: 100%;
    height: 100%;
    z-index: -1;
}
.play_routing_body{
    margin-top: -10px;
}
.play_routing_first{
    width: 200px;
    line-height: 30px;
    margin: 10px auto;
    text-align: center;
}
.song_name{
    width: 200px;
    font-size: 15px;
    color: aqua;
    text-align: center;
}
.song_author{
    width: 200px;
    text-align: center;
    font-size: 12px;
    color: aqua;
}
.play_routing_second{
    width: 200px;
    margin: 20px auto;
}
.play_routing_second_img{
    width: 200px;
    height: 200px;
    border-radius: 50%;
    -webkit-animation:circleRoate 10s infinite linear ;
    animation-play-state: paused
}
.play_routing_second_img_hide1{
    -webkit-animation:circleRoate 10s infinite linear ;
    animation-play-state: running;
}
@keyframes circleRoate{
    from{transform: rotate(0deg)}
    to{transform: rotate(360deg);}
}

.play_routing_third{
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 3px;
}
.third_1{
    flex: 1;
    color: white;
    font-size: 14px;
}
.third_2{
    flex: 6;
}
.play_routing_fourth{
    display: flex;
    justify-content: space-around;
}
.routing_fourth_item{
    text-align: center;
}
.routing_fourth_1_img{
    width: 30px;
    height: 30px;
}
.play_routing_lyric{
    width: 200px;
    color: white;
    z-index: 1;
    position: absolute;
    top: 170px;
    left: 50%;
    transform: translate(-100px);
}
.play_routing_lyric_g{
    line-height: 20px;
    font-size: 15px;
    text-align: center;
    margin:0px auto;
}
</style>