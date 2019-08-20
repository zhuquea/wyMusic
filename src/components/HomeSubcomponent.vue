<template>
    <div>
        <div class="table_data">
            <div v-for="(item,index) in tableData" :key="index" class="table_data_item" @click="jumpSongList(item)">
                <img :src="item.picUrl" alt="" class="table_data_img" v-if="item.picUrl">
                <img :src="item.coverUrl" alt="" class="table_data_img" v-else-if="item.coverUrl">
                <img :src="item.song.album.picUrl" alt="" class="table_data_img" v-else-if="item.song.album.picUrl">
                <div class="table_data_name">
                    {{item.name}}
                </div>
            </div>
        </div>
    </div>
    
</template>

<script>
    export default {
        name: "HomeSubcomponent",
        components: {},
        props: {
            tableData:{
                type: Array
            }
        },
        data() {
            return {}
        },
        methods: {
            jumpSongList(item){
                wx.navigateTo({
                  url: `../songListDetails/SongListDetails?itemDetails=${item.id}`
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
.table_data{
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