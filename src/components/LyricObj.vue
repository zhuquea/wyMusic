<template>
    <div>
        <div v-for="(item,index) in lyricData" :key="item.id" class="lyric_obj_item">
            <img :src="item.artists[0].img1v1Url" alt="" class="lyric_obj_item_img">
            <div class="lyric_obj_item_name">{{item.name}}-<span class="lyric_obj_item_ar">{{item.artists[0].name}}</span></div>
        </div>
    </div>
    
</template>

<script>
    export default {
        name: "LyricObj",
        components: {},
        props: {
            lyricData:{
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
.lyric_obj_item{
    display: flex;
    align-items: center;
    padding: 5px;
}
.lyric_obj_item_img{
    width: 50px;
    height: 50px;
    border-radius: 50%;
}
.lyric_obj_item_name{
    font-size: 14px;
    margin-left: 5px;
}
.lyric_obj_item_ar{
    font-size: 12px;
    color: #8a8a8a;
}
</style>