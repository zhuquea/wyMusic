<template>
    <div>
        <div v-for="(item,index) in radioStationData" :key="radioStationData" class="radio_station_item" @click="jumpRadioDetails(item)">
            <div class="radio_station_item_left">
                <img :src="item.picUrl" alt="" class="item_left_img">
            </div>
            <div class="radio_station_item_right">
                <div class="item_right_name" v-html="item.name"></div>
                <div class="item_right_nickname">{{item.dj.nickname}}</div>
            </div>
        </div>
    </div>
    
</template>

<script>
    export default {
        name: "RadioStationData",
        components: {},
        props: {
            radioStationData:{
                type: Array
            }
        },
        data() {
            return {}
        },
        methods: {
            jumpRadioDetails(item){
                console.log(item.id);
                wx.navigateTo({
                    url: `../radioDetails/RadioDetails?itemId=${item.id}`
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
.radio_station_item{
    display: flex;
    align-items: center;
}
.radio_station_item_left{
    margin-left: 5px;
}
.item_left_img{
    width: 60px;
    height: 60px;
}
.radio_station_item_right{
    line-height: 30px;
    margin-left: 5px;
}
.item_right_name{
    font-size: 14px;
}
.item_right_nickname{
    font-size: 12px;
}
</style>