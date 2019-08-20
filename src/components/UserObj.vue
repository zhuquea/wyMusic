<template>
    <div>
        <div v-for="(item,index) in userData" :key="item.userId" class="user_obj_item" @click="jumpUserDetails(item)">
            <div class="user_obj_item_left">
                <img :src="item.avatarUrl" alt="" class="item_left_img">
                <div class="item_left_all">
                    <div class="item_left_nickname">
                        <span v-html="item.nickname"></span>
                        <span v-if="item.gender === 1"><img src="../native/tabbar/man.png" alt="" class="left_nickname_gender"></span>
                        <span v-else><img src="../native/tabbar/woman.png" alt="" class="left_nickname_gender"></span>
                    </div>
                    <div class="item_left_signature">{{item.signature}}</div>
                </div>
            </div>
            <div class="user_obj_item_right">
                + 关注
            </div>
        </div>
    </div>
    
</template>

<script>
    export default {
        name: "UserObj",
        components: {},
        props: {
            userData:{
                type: Array
            }
        },
        data() {
            return {}
        },
        methods: {
            jumpUserDetails(item){
                console.log(item.userId);
                wx.navigateTo({
                  url: `../userDetails/UserDetails?itemId=${item.userId}`
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
.user_obj_item{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
}
.user_obj_item_left{
    display: flex;
    align-items: center;
}
.item_left_img{
    width: 50px;
    height: 50px;
    border-radius: 50%;
}
.item_left_all{
    margin-left: 5px;
}
.item_left_nickname{
    font-size: 14px;
}
.left_nickname_gender{
    width: 15px;
    height: 15px;
}
.item_left_signature{
    display: inline-block;
    white-space: nowrap;
    width: 200px;
    overflow: hidden;
    text-overflow:ellipsis;
    font-size: 12px;
}
.user_obj_item_right{
    width: 60px;
    line-height: 20px;
    text-align: center;
    border-radius: 25px;
    color: #d81e06;
    border: 1px solid #d81e06;
    font-size: 13px;
}
</style>