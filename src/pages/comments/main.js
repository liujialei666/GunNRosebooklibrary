/**
 * Created by LJL on 2018/6/3.
 */
import Vue from 'vue'
import Comment from './Comment'



const app=new Vue(Comment)
app.$mount()

export default {
  config:{
    enablePullDownRefresh:true,
    navigationBarTitleText: "我的评论和图书"
  }
}