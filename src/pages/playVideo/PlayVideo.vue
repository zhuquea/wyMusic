<config>
    {
    "navigationBarTitleText": "视频播放",
    "navigationBarTextStyle": "white",
    "usingComponents": {}
    }
</config>
<template>
    <div>
        <video :src="playVideoUrl"   controls ></video>
    </div>
    
</template>

<script>
    export default {
        name: "PlayVideo",
        components: {},
        props: {},
        data() {
            return {
                playVideoId: '',
                playVideoUrl: ''
            }
        },
        methods: {
            //获取视频播放地址
            getVideoUrl(){
                this.$fly.get(`/video/url?id=${this.playVideoId}`).then(response => {
                    if (response){
                        // console.log(response);
                        this.playVideoUrl = response.data.urls[0].url
                        console.log(this.playVideoUrl);
                    }
                }).catch(err => {
                    console.log(err);
                })
            }
        },
        mounted() {
            this.getVideoUrl()
        },
        onLoad:function(options){
            console.log(options.itemId);
            this.playVideoId = options.itemId
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

</style>