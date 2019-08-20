<template>
    <div>
        <div v-for="(item,index) in singerData" :key="item.id" class="songer_item">
            <img :src="item.picUrl" alt="" class="songer_item_img">
            <div class="songer_item_name">{{item.name}}</div>
            <div class="songer_item_alias">（{{item.alias[0]}}）</div>
        </div>
    </div>
    
</template>

<script>
    export default {
        name: "Songer",
        components: {},
        props: {
            singerData:{
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
.songer_item{
    display: flex;
    align-items: center;
}
.songer_item_img{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-left: 5px;
}
.songer_item_name{
    font-size: 15px;
    color: darkturquoise;
}
.songer_item_alias{
    font-size: 15px;
    color: #8a8a8a;
}
</style>