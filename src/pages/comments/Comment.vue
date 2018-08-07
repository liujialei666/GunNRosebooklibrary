<template>
   <div class="container">
       <div class="indexone">
       <CommentList v-if="openid&& index==0" type='user' :comments="comments"></CommentList>
       </div>
       <div class="cover indexone" v-if="openid && index==1">
            <Mycard :key='book.id' v-for='book in booklist' :book='book'></Mycard>
            <div class="title" v-if="booklist.length==0">暂无添加的图书，快去添加几本吧！</div>
       </div>
       <div v-if="!openid" class="remind">请在个人页面授权登录</div>
        <div class="my">
           <div class="mycomment" :class="{mycommentactive:index==0}"  @click="goswitch(0)">我的评论</div>
           <div class="mycomment" :class="{mycommentactive:index==1}" @click="goswitch(1)">我的图书</div>
        </div>
   </div>
</template>

<script>
import { get } from "@/util";
import CommentList from "@/components/CommentList";
import Mycard from "@/components/Mycard";
export default {
  data() {
    return {
      comments: [],
      openid: "",
      booklist: [],
      index:0
    };
  },
  components: {
    CommentList,
    Mycard
  },
  methods: {
    goswitch(index){
       if(index==0){
          this.index=0
       }else{
          this.index=1
       }
    },
    init() {
      this.getComments();
      this.getBooks();
    },
    async getBooks() {
      const booklist = await get("/weapp/booklist", { openid: this.openid });
      this.booklist = booklist.list || [];
    },
    async getComments() {
      console.log(this.openid);
      const comments = await get("/weapp/commentlist", { openid: this.openid });
      this.comments = comments.list || [];
    }
  },
  onShow() {
    const userinfo = wx.getStorageSync("userinfo");
    console.log(userinfo);
    if (userinfo) {
      this.openid = userinfo.openId;
      this.init();
    } else {
      console.log("no");
    }
  },
  onPullDownRefresh() {
    this.init();
    wx.stopPullDownRefresh();
  }
};
</script>

<style lang="scss" scoped>
.container {
  background-color: #fafafa;
  .my {
    position:fixed;
    left:0rpx;
    top:0rpx;
    width:100%;
    background: #fff;
    box-shadow: 5rpx 2rpx 1rpx #ddd;
    margin-bottom:10rpx;
    .mycomment{
      display: inline-block;
      width:50%;
      text-align: center;
      font-size:28rpx;
      padding:20rpx 0;
      //font-weight:700;
    }
    .mycommentactive{
      font-weight:700;
      color:#fe698f;
    }
  }
  .indexone{
    margin-top: 82rpx;
  }
  .remind {
    text-align: center;
    font-size: 28rpx;
    color: #ddd;
    margin-top: 40rpx;
  }
  .cover {
    .bookstitle {
      font-size: 28rpx;
      font-weight: 700;
      background: #ddd;
      padding: 10rpx 0;
      text-align: center;
    }
    .title {
      text-align: center;
      font-size: 28rpx;
      color: #ddd;
    }
  }
}
</style>
