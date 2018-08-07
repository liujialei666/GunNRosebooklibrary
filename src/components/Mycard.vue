<template>
   <a :href="bookdeatilurl" class="aurl">
   <div class="book-card">
       <div class="thumb">
           <img :src="book.image" class='img' mode="scaleToFill" >
           <div class="footer">
                <div class="leftone">
                    {{book.title}}
                </div>
                <div class="lefttwo">
                    {{book.author}}
                </div>
            </div>
       </div>
      
       <!-- <div class="detail">
         <div class="row text-primary" >
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
         
       </div> -->
   </div>
   </a>
</template>


<script>
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

  },
  props:['book']
  
};
</script>

<style lang="scss" scoped>
  .aurl{
    display: inline-block;
    width:50%;
    text-align: center;
    margin: 0 auto;
    
  }
  .book-card{
    
    padding: 0 30rpx;
    margin: 60rpx 20rpx;
    font-size:28rpx;
    width:80%;
    display: inline-block;
    box-sizing: border-box;
    text-align: center;
    .thumb{
      position: relative;
      width:265rpx;
      height:373rpx;
      display: inline-block;
      box-shadow:-4px 4px 10px #8a8a8a;
      border-radius: 10rpx;
      .img{
        width: 100%;
        height:340rpx;
      }
    }
    .footer{
      position: absolute;
      background-color: #fff;
      left:0;
      bottom:0;
      height:100rpx;
      width:265rpx;
      .leftone{
        margin-top: 20rpx;
        margin-left: 16rpx;
        font-size:24rpx;
        color:#000;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        text-align: left;
      }
      .lefttwo{
        margin-left: 16rpx;
        font-size:24rpx;
        color:#8a8a8a;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        text-align: left;
      }
      
    }
  }
</style>
