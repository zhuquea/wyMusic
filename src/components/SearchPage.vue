<config>
    {
    "usingComponents": {
        "van-dialog": "../native/vant/dialog/index"
       }
    }
</config>
<template>
    <div v-if="showHotSearchData===false">
        <div class="Search_History" v-show="showSearchHistory===true">
            <div class="search_history">
                <div class="search_history_1_left">搜索历史</div>
                <img src="../native/tabbar/delete.png" alt="" class="search_history_1_img" @click="deleteHistory">
            </div>
            <div class="search_history_content">
                <div v-for="(item,index) in searchHistoryData" :key="index" class="search_history_content_item" @click="searchHistoryItem(item)">{{item}}</div>
            </div>
        </div>
        <div class="search_page_first">
          <div class="search_page_first_1">热搜榜</div>
           <div v-for="(item,index) in hotSearchData" :key="index" class="hotSearchData_item">
               <div :class="{hotSearchData_top_three: index===0||index===1||index===2}">{{index+1}}</div>
               <div class="hotSearchData_content">{{item.first}}</div>
               <div class="hotSearchData_hot" v-show="index===0||index===1">hot</div>
           </div>
        </div>
    </div>
    <div v-else-if="showHotSearchData">
        <div class="Search_History" v-show="showSearchHistory===true">
            <div class="search_history">
                <div class="search_history_1_left">搜索历史</div>
                <img src="../native/tabbar/delete.png" alt="" class="search_history_1_img" @click="deleteHistory">
            </div>
            <div class="search_history_content">
                <div v-for="(item,index) in searchHistoryData" :key="index" class="search_history_content_item" @click="searchHistoryItem(item)">{{item}}</div>
            </div>
        </div>
        <div class="search_value">搜索‘{{value}}’</div>
        <div v-for="(item,index) in receiveSearchData" :key="index" class="receiveSearchData_item" @click="jumpSearchList(item)">
            <img src="../native/tabbar/search.png" alt="" class="receiveSearchData_img">
            <div class="receiveSearchData_keyword">{{item.keyword}}</div>
        </div>
    </div>
</template>

<script>
    // import Dialog from '../native/vant/dialog/index';
    export default {
        name: "SearchPage",
        components: {},
        props: {
            receiveSearchData:{
                type: Array
            },
            showHotSearchData:{
                type: Boolean
            },
            showSearchHistory:{
                type: Boolean
            },
            searchHistory:{
                type: Array
            },
            value:{
                type: String
            }
        },
        data() {
            return {
                hotSearchData: [],//接收热搜索榜数据
                searchHistoryData: [],
            }
        },
        methods: {
            //获取热搜榜
            getSearchDefault(){
                this.$fly.get(`/search/hot`).then(response => {
                    if (response){
                        this.hotSearchData = response.data.result.hots
                        console.log(this.hotSearchData);
                    }
                }).catch(err => {
                    console.log(err);
                })
            },
            //删除搜索历史
            deleteHistory(){
                // Dialog.confirm({
                //     title: '删除',
                //     message: '你确认要清除搜索历史吗？',
                //     asyncClose: true
                // })
                //     .then(() => {
                //         setTimeout(() => {
                //             Dialog.close();
                //         }, 1000);
                //     })
                //     .catch(() => {
                //         Dialog.close();
                //     });
                wx.removeStorageSync('searchHistory')
                this.searchHistoryData = []
                this.$emit('update:searchHistory',[])
                this.$emit('update:showSearchHistory',false)
            },
            //点击每一项搜索历史发生的事件
            searchHistoryItem(item){
                // console.log(item);
                this.$emit('update:value',item)
                this.$fly.get(`/search/suggest?keywords=${item}&type=mobile`).then(response => {
                    if (response){
                        this.$emit('update:receiveSearchData',response.data.result.allMatch)
                        if (response.data.result.allMatch){
                            this.$emit('update:showHotSearchData',true)
                        }
                    }
                }).catch(err => {
                    console.log(err);
                    this.$emit('update:showHotSearchData',false)
                })
            },
            jumpSearchList(item){
                // console.log(item.keyword);
                wx.navigateTo({
                  url: `../searchList/SearchList?itemData=${item.keyword}`
                })
            }
        },
        mounted() {
            this.getSearchDefault()
            if (wx.getStorageSync('searchHistory')){
                this.searchHistoryData = wx.getStorageSync('searchHistory').filter((item,index,arr) => {
                    return arr.indexOf(item) === index
                });
                this.$emit('update:showSearchHistory',true)
            }
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
.Search_History{
    padding: 5px;
    background-color: #eeeeee;
}
.search_history{
    display: flex;
    justify-content: space-around;
}
.search_history_1_left{
    font-size: 15px;
    font-weight: bold;
}
.search_history_1_img{
    width: 18px;
    height: 18px;
}
.search_history_content{
    display: flex;
    flex-wrap: wrap;
}
.search_history_content_item{
    width: 80px;
    text-align: center;
    line-height: 30px;
    font-size: 15px;
    background-color: white;
    margin-left: 5px;
}
.search_page_first{
    padding: 5px;
}
.search_page_first_1{
    font-size: 18px;
    font-weight: bold;
}
.hotSearchData_item{
    display: flex;
    align-items: center;
}
.hotSearchData_top_three{
    color: #d81e06;
}
.hotSearchData_content{
    font-size: 15px;
    margin-left: 10px;
}
.hotSearchData_hot{
    font-size: 20px;
    font-style: italic;
    color: #d81e06;
    margin-left: 10px;
}
.receiveSearchData_item{
    height: 30px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #eeeeee;
}
.receiveSearchData_img{
    width: 18px;
    height: 18px;
    margin-left: 10px;
}
.receiveSearchData_keyword{
    font-size: 15px;
    margin-left: 10px;
}
.search_value{
    font-size: 14px;
    color: darkturquoise;
}
</style>