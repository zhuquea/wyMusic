<template>
    <div>
        <div v-for="(item,index) in MvData" :key="item.id" class="mv_obj_item">
            <img :src="item.cover" alt="" class="mv_obj_item_img">
            <div class="mv_obj_item_name">{{item.name}}- <span class="mv_obj_item_ar">{{item.artistName}}</span></div>
        </div>
    </div>
    
</template>

<script>
    export default {
        name: "MvObj",
        components: {},
        props: {
            MvData:{
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
.mv_obj_item{
    display: flex;
    align-items: center;
    padding: 5px;
}
.mv_obj_item_img{
    width: 50px;
    height: 50px;
    border-radius: 50%;
}
.mv_obj_item_name{
    font-size: 14px;
}
.mv_obj_item_ar{
    font-size: 12px;
    color: #8a8a8a;
}
</style>