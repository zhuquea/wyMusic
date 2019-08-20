import App from './App';
import Vue from 'vue';
import VHtmlPlugin from '@megalo/vhtml-plugin';
import Vuex from 'vuex';
import moment from "dayjs";

const Fly = require("./native/fly/wx.js")
const fly = new Fly
const AudioContext = wx.createInnerAudioContext()

fly.config.baseURL = 'http://116.62.234.172:3000'

Vue.use(VHtmlPlugin)
Vue.use(Vuex)

Vue.prototype.$fly = fly
Vue.prototype.$moment = moment
Vue.prototype.$audio = AudioContext

const store = require('./store').default
Vue.prototype.$store = store

const app = new Vue(App)

app.$mount()

export default {
  config: {
    // pages 的首个页面会被编译成首页
    pages: [
      'pages/home/Home',
      'pages/singer/Singer',
      'pages/myCenter/MyCenter',
      'pages/songListDetails/SongListDetails',
      'pages/playRouting/PlayRouting',
       'pages/searchList/SearchList',
       'pages/login/Login',
        'pages/register/Register',
        'pages/singerDetails/SingerDetails',
        'pages/albumDetails/AlbumDetails',
        'pages/radioDetails/RadioDetails',
        'pages/playVideo/PlayVideo',
        'pages/userDetails/UserDetails'
    ],
    tabBar: {
      color: '#333',
      selectedColor: '#d81e06',
      list: [
        {
          pagePath: 'pages/home/Home',
          text: '首页',
          iconPath: 'native/tabbar/home.png',
          selectedIconPath: 'native/tabbar/home-red.png'
        },
        {
          pagePath: 'pages/singer/Singer',
          text: '歌手',
          iconPath: 'native/tabbar/geshou.png',
          selectedIconPath: 'native/tabbar/geshou-on.png'
        },
        {
          pagePath: 'pages/myCenter/MyCenter',
          text: '我的',
          iconPath: 'native/tabbar/my.png',
          selectedIconPath: 'native/tabbar/my_red.png'
        }
      ]
    },
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#d81e06',
      navigationBarTitleText: '网易云音乐',
      navigationBarTextStyle: 'white'
    }
  }
}
