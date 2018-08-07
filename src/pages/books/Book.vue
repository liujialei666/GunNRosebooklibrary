<template>
   <div>
    <topswiper :tops="tops"></topswiper>
    <Card :key='book.id' v-for='book in books' :book='book'></Card>
    <p class="footer" v-if='!more'>没有更多数据了...</p>
  </div>
</template>


<script>
import { get } from "@/util";
import Card from '@/components/Card'
import topswiper from '@/components/TopSwiper'
export default {
  data() {
    return {
      books: [],
      page:0,
      more:true,
      tops:''
    }
  },
  components:{
    Card,
    topswiper
  },
  mounted() {
    this.getlist(true)
    this.getTop()
  },
  methods: {
    async getTop(){
      const tops=await get("/weapp/top")
      this.tops=tops.list
    },
    async getlist(init) {
      if(init){
        this.page=0
        this.more=true
      }
      wx.showNavigationBarLoading()
      const books = await get("/weapp/booklist",{page:this.page})
      if(this.page>0 && books.list.length<10){
         this.more=false
      }
      if(init){
        this.books = books.list
        
        wx.stopPullDownRefresh()
      }else{
        this.books=this.books.concat(books.list)
        
      }
      
      wx.hideNavigationBarLoading()
    }
  },
  onReachBottom(){
     if(!this.more){
        return
     }else{
        console.log("daodi")
        this.page=this.page+1
        this.getlist(false)
     }
  },
  onPullDownRefresh(){
    this.getlist(true)
    this.getTop()
  },
};
</script>

<style lang='scss' scoped>
   .footer{
     font-size:28rpx;
     text-align: center;
     margin-bottom: 10rpx;
     color:#aaa;
   }
</style>
