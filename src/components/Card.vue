<template>
   <a :href="bookdeatilurl">
   <div class="book-card">
       <div class="thumb">
           <img :src="book.image" class='img' mode="aspectFit" @click.stop="preview">
       </div>
       <div class="detail">
         <div class="row text-primary" >
            <div class="right rate">
              {{book.rate}}<Rate :value='book.rate'></Rate>
            </div>
            <div class="left">
              {{book.title}}
            </div>
         </div>
         <div class="row">
            <div class="right text-primary">
              浏览量{{book.count}}
            </div>
            <div class="left">
              {{book.author}}
            </div>
         </div>
         <div class="row">
            <img :src="book.user_info.img" class="avatar" mode="aspectFit">
            <div class="right">
              {{book.user_info.nickName}}
            </div>
            <!-- <div class="left">
              {{book.publisher}}
            </div> -->
         </div>
         
       </div>
   </div>
   </a>
</template>


<script>
import Rate from '@/components/Rate'
export default {
  created() {},
  methods: {
      preview(){
        wx.previewImage({
            current: this.book.image, // 当前显示图片的http链接
            urls: [this.book.image] // 需要预览的图片http链接列表
        })
    },
  },
  computed: {
    bookdeatilurl(){
      return '/pages/detail/main?id='+this.book.id
      
    }
  },
  components:{
    Rate
  },
  props:['book']
  
};
</script>

<style lang="scss" scoped>
  .book-card{
    padding:10rpx;
    overflow: hidden;
    margin: 10rpx 0;
    font-size:28rpx;
    .thumb{
      width:180rpx;
      height:180rpx;
      float:left;
      margin: 0 auto;
      overflow:hidden;
      .img{
        max-width: 100%;
        max-height: 100%;
      }
    }
    .detail{
      margin-left: 200rpx;
      .row{
        line-height: 40rpx;
        margin: 10rpx 0 10rpx;

        .right{
          float:right;
        
        }
        .avatar{
            width:50rpx;
            height:50rpx;
            border-radius: 50%;
          }
        .rate{
          color:rgb(247,186,42);
        }
        .left{
           margin-right: 160rpx;
           white-space: nowrap;
           overflow: hidden;
           text-overflow: ellipsis;
        }
      }
    }
  }
</style>
