<template>

   <div class="comment-list">
      <div class="page-title" v-if="type!='user'">
        评论列表:
      </div>
      <div class="comment" v-for="comment in comments" :key='comment.id' @click="godetail(comment)">
          <div class="user">
            <div class="inline">
               <img :src="comment.image" class="avatar" mode="aspectFit">
               <span>{{comment.title}}</span>
            </div>
            <div class="right">
               {{comment.location||'未知地点'}}
               <span>|</span>
               {{comment.phone||'未知型号'}}
            </div>
          </div>
          <div class="content">{{comment.comment}}</div>
      </div>
   </div>
</template>


<script>
export default {
  props:['comments','type'],
  created() {},
  methods: {
    godetail(comment){
      if(this.type=='user'){
        console.log(comment)
         wx.navigateTo({
            url: '/pages/detail/main?id='+comment.bookid
         })
      }
    }   
  },
  computed: {
    
  }
};
</script>

<style lang="scss" scoped>
 .comment-list{
    background: #eee;
    font-size:28rpx;
    .page-title{
      padding:10rpx 0;
      font-weight:700;
    }
    .comment{
       background: #fff;
       margin-bottom: 6rpx;
       padding:10rpx 20rpx;
       .contenta{
         margin: 20rpx 0;
       }
       .user{
         .inline{
            span{
              float: right;
            }
            .avatar{
             width:70rpx;
             height:70rpx;
             border-radius: 50%;
            }

         }
         .right{
           color:#aaa;
           margin-bottom: 20rpx;
         }
         
       }
    }
 }
</style>
