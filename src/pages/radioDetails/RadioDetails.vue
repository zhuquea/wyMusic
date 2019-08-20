<config>
    {
    "navigationBarTitleText": "电台",
    "navigationBarTextStyle": "white",
    "usingComponents": {}
    }
</config>
<template>
    <div>
        <img :src="radioDetailsObj.picUrl" alt="" class="radio_details_img">
        <div class="radio_details_first">
            <div class="radio_details_first_name">{{radioDetailsObj.name}}</div>
            <div class="radio_details_first_sub">{{radioDetailsObj.subCount}}人订阅</div>
        </div>
        <div class="radio_details_second">
            <div class="details_second_1">
                <img src="../../native/tabbar/bofang.png" alt="" class="radio_details_second_img">
            </div>
            <div class="details_second_2">
                播放全部（共{{radioProgramNum}}期）
            </div>
        </div>
        <div class="radio_details_third">
            <div v-for="(item,index) in radioProgram" :key="item.id" class="radio_details_third_item">
                <div class="details_third_item_left">
                    <div class="third_item_left_1">
                        {{index + 1}}
                    </div>
                    <div class="third_item_left_2">
                        <div class="third_item_left_2_1">{{item.name}}</div>
                        <div class="third_item_left_2_2">
                            {{item.CreatTime}}
                            <img src="../../native/tabbar/toRight.png" alt="" class="toRight">
                            {{item.listenerCount}}
                            <img src="../../native/tabbar/clock.png" alt="" class="toRight">
                            {{item.PlayTime}}
                        </div>
                    </div>
                </div>
                <img src="../../native/tabbar/bofang.png" alt="" class="radio_details_third_img">
            </div>
        </div>
    </div>
    
</template>

<script>
    export default {
        name: "RadioDetails",
        components: {},
        props: {},
        data() {
            return {
                radioDetailsId: '',//接收传过来的电台id，用来获取电台详情
                radioDetailsObj: {},//接收电台详情
                radioProgram: [],//接收电台节目
                radioProgramNum: 0
            }
        },
        methods: {
            //获取电台详情
            getRadioDetails(){
                this.$fly.get(`/dj/detail?rid=${this.radioDetailsId}`).then(response => {
                    if (response) {
                        // console.log(response);
                        this.radioDetailsObj= response.data.djRadio
                        console.log(this.radioDetailsObj);
                    }
                }).catch(err => {
                    console.log(err);
                })
            },
            //获取电台节目
            getRadioProgram(){
                this.$fly.get(`/dj/program?rid=${this.radioDetailsId}`).then(response => {
                    if (response){
                        // console.log(response);
                        this.radioProgram = response.data.programs
                        this.radioProgramNum = response.data.programs.length
                        this.radioProgram.forEach(item => {
                            item.CreatTime = this.$moment(item.createTime).format('YYYY-MM-DD')
                            item.PlayTime = this.$moment(item.duration).format('hh:mm')
                        })
                        console.log(this.radioProgram);
                    }
                }).catch(err => {
                    console.log(err);
                })
            }
        },
        mounted() {
            this.getRadioDetails()
            this.getRadioProgram()
        },
        onLoad:function(options){
            console.log(options.itemId);
            this.radioDetailsId = options.itemId
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
.radio_details_img{
    width: 100%;
    height: 200px;
    position: absolute;
    top: 0;
    z-index: -1;
}
.radio_details_first{
    margin-top: 100px;
    line-height: 30px;
    margin-left: 10px;
}
.radio_details_first_name{
    font-size: 15px;
    color: white;
}
.radio_details_first_sub{
    font-size: 14px;
    color: white;
}
.radio_details_second{
    display: flex;
    align-items: center;
    line-height: 20px;
    margin-top: 50px;
}
.details_second_1{
    width: 50px;
    text-align: center;
}
.radio_details_second_img{
    width: 15px;
    height: 15px;
}
.details_second_2{
    width: 150px;
    text-align: center;
    font-size: 15px;
}
.radio_details_third_item{
    padding: 5px;
    display: flex;
    justify-content: space-between;
}
.details_third_item_left{
    display: flex;
    align-items: center;
}
.third_item_left_1{
    color: #8a8a8a;
}
.third_item_left_2{
    margin-left: 5px;
}
.third_item_left_2_1{
    font-size: 15px;
}
.third_item_left_2_2{
    font-size: 12px;
    color: #8a8a8a;
}
.radio_details_third_img{
    width: 15px;
    height: 15px;
}
.toRight{
    width: 12px;
    height: 12px;
}
</style>