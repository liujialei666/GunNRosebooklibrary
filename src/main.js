/**
 * Created by LJL on 2018/6/3.
 */
import Vue from 'vue'
import App from './App'

Vue.config.productionTip=false

const app=new Vue(App)
app.$mount()


export default{
  config:{
    pages:[ '^pages/books/main'],
    "window":{
      "navigationBarBackgroundColor": "#dc3f36",
      "navigationBarTextStyle": "#fff",
      "navigationBarTitleText": "枪花图书",
      "backgroundColor": "#eeeeee",
      "backgroundTextStyle": "light"
    },
    "tabBar": {
      selectedColor:'#dc3f36',
      list: [{
         pagePath: 'pages/books/main',
         text: '首页',
         iconPath:'static/icon/personone.png',
         selectedIconPath:'static/icon/person.png'
      }, {
         pagePath: 'pages/comments/main',
         text: '我的',
         iconPath:'static/icon/activeone.png',
         selectedIconPath:'static/icon/active.png'

      },
        {
           pagePath: 'pages/me/main',
           text: '个人',
           iconPath:'static/icon/rabitt.png',
           selectedIconPath:'static/icon/rabittactive.png'
        }]
    },

  }


}
