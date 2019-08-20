<template>
    <div class="singer_information">
        <div v-for="(item,index) in singerDataArr" :key="item.id" class="singer_information_item" @click="jumpObj(item)">
            <div>
                <img :src="item.picUrl" alt="" class="singer_information_item_img">
            </div>
            <div class="singer_information_item_name">
               {{item.name}}
            </div>
        </div>
    </div>
    
</template>

<script>
    export default {
        name: "SingerInformation",
        components: {},
        props: {
            singerDataArr:{
                type: Array
            }
        },
        data() {
            return {}
        },
        methods: {
            jumpObj(item){
                // console.log(item.name);
                wx.navigateTo({
                  url: `../singerDetails/SingerDetails?itemName=${item.name}&itemSrc=${item.picUrl}&itemId=${item.id}`
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
.singer_information{
    padding: 5px;
}
.singer_information_item{
    display: flex;
    align-items: center;
}
.singer_information_item_img{
    width: 50px;
    height: 50px;
    border-radius: 50%;
}
.singer_information_item_name{
    margin-left: 5px;
    font-size: 14px;
}
</style>