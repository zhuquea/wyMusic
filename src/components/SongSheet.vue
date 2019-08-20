<template>
    <div>
        <div v-for="(item,index) in songSheetData" :key="item.id" class="song_sheet_item">
           <div class="song_sheet_item_left">
               <img :src="item.coverImgUrl" alt="" class="left_img">
           </div>
            <div class="song_sheet_item_right">
                <div class="right_item_name" v-html="item.name"></div>
                <div>
                    <span class="right_item_trackCount">{{item.trackCount}}首</span>
                    <span class="right_item_nickname">by {{item.creator.nickname}}，</span>
                    <span class="right_item_nickname">播放{{item.PlayObj}}万次</span>
                </div>
            </div>
        </div>
    </div>
    
</template>

<script>
    export default {
        name: "SongSheet",
        components: {},
        props: {
            songSheetData:{
                type: Array
            },
            valueObj: {
                type: String
            },
            highLight:{
                type: Array
            }
        },
        data() {
            return {}
        },
        methods: {},
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
.song_sheet_item{
    display: flex;
}
.song_sheet_item_left{
    margin-left: 5px;
}
.left_img{
    width: 50px;
    height: 50px;
}
.song_sheet_item_right{
    margin-left: 5px;
}
.right_item_name{
    font-size: 14px;
}
.right_item_trackCount{
    font-size: 12px;
}
 .right_item_nickname{
     font-size: 12px;
     margin-left: 5px;
 }
</style>