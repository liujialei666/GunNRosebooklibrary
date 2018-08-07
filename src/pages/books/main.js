/**
 * Created by LJL on 2018/6/3.
 */
import Vue from 'vue'
import Book from './Book'



const app=new Vue(Book)
app.$mount()
export default{
    config:{
        enablePullDownRefresh:true
    }
}
