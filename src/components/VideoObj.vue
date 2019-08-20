<template>
    <div>
        <div v-for="(item,index) in videoData" :key="item.vid" class="video_obj_item" @click="jumpVideo(item)">
            <div class="video_obj_item_left">
                <img :src="item.coverUrl" alt="" class="item_left_img">
                <div class="item_left_content">
                    <img src="../native/tabbar/stop.png" alt="" class="item_left_stop">
                    <div class="item_left_count">{{item.PlayCount}}万</div>
                </div>
            </div>
            <div class="video_obj_item_right">
                <div class="item_right_title" v-html="item.title"></div>
                <div class="item_right_username"> <span v-show="item.creator[0].userName !== valueObj">by</span> {{item.creator[0].userName}}</div>
            </div>
        </div>
    </div>
    
</template>

<script>
    export default {
        name: "VideoObj",
        components: {},
        props: {
            videoData:{
                type: Array
            },
            valueObj:{
                type: String
            }
        },
        data() {
            return {}
        },
        methods: {
            jumpVideo(item){
                console.log(item);
                wx.navigateTo({
                  url: `../playVideo/PlayVideo?itemId=${item.vid}`
                })
            }
        },
        mounted() {

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
.video_obj_item{
    display: flex;
    align-items: center;
    padding: 5px;
}
.video_obj_item_left{
    position: relative;
}
.item_left_img{
    width: 100px;
    height: 60px;
    border-radius: 10px;
}
.item_left_content{
    position: absolute;
    top: 5px;
    right: 5px;
    display: flex;
    align-items: center;
}
.item_left_count{
    font-size: 12px;
    color: white;
}
.video_obj_item_right{
    margin-left: 5px;
    line-height: 20px;
}
.item_left_stop{
    width: 12px;
    height: 12px;
}
.item_right_title{
    font-size: 14px;
}
.item_right_username{
    font-size: 12px;
}
</style>