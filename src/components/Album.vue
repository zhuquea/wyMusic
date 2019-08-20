<template>
    <div>
        <div v-for="(item,index) in albumData" :key="item.id" class="album_item" @click="jumpAlbumDetails(item)">
            <div class="album_item_left">
                <img :src="item.picUrl" alt="" class="left_img">
            </div>
            <div class="album_item_right">
                <div class="right_1">
                    <span class="right_item_name">{{item.name}}</span>
                    <span class="right_item_alias" v-show="item.alias.length > 0">（{{item.alias[0]}}）</span>
                </div>
                <div class="right_2">
                     <span class="right_2_value">{{valueObj}}</span>
                     <span class="right_2_time">{{item.TimeObj}}</span>
                </div>
            </div>
        </div>
    </div>
    
</template>

<script>
    export default {
        name: "Album",
        components: {},
        props: {
            albumData:{
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
            jumpAlbumDetails(item){
                console.log(item.id);
                wx.navigateTo({
                  url: `../albumDetails/AlbumDetails?itemId=${item.id}`
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
.album_item{
    display: flex;
}
.album_item_left{
    margin-left: 5px;
}
.album_item_right{
    margin-left: 5px;
}
.left_img{
    width: 50px;
    height: 50px;
}
.right_1{
    display: inline-block;
    white-space: nowrap;
    width: 200px;
    overflow: hidden;
    text-overflow:ellipsis;
}
.right_item_name{
    font-size: 14px;
}
.right_item_alias{
    font-size: 14px;
    color: #bfbfbf;
}
.right_2_value{
    font-size: 12px;
    color: darkturquoise;
}
.right_2_time{
    font-size: 12px;
    margin-left: 5px;
}
</style>