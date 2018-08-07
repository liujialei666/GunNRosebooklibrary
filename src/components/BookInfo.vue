<template>
   <div class="bookinfo">
      <div class="thumb">
           <img :src="info.image" class="back" mode="aspectFill"/>
           <!-- <img :src="info.image" class="image" mode="aspectFit"/> -->
           <div class="book">
              <div class="myimgbefore"></div>
              <img :src="info.image" class="myimg"/>
           </div> 
           <div class="info">
              <div class="title">{{info.title}}</div>
              <div class="author">{{info.author}}</div>
           </div>
      </div>
      <div class="detail">
               <img :src="userinfo.image" alt="" mode="aspectFit" class="avatar"/>
               <div class="right rate" >
                  {{info.rate}}分
                  <Rate :value='info.rate'></Rate>
               </div>
      </div>
      <div class="detail">
             {{info.publisher}}
             <div class="right">
                {{info.price}}
             </div>
      </div>
      <div class="tags-cover"> 
            <div class="title">标签</div>
            <div class="tags">
             <div class="badge" v-for="(tag,index) in info.tags" :key='index'>{{tag}}</div>
            </div>
      </div>
      <div class="summary" >
            <div class="title">内容简介</div>
            <p class="sum" v-for="(sum,index) in info.summary" :key="index">{{sum}}</p>
      </div>
   </div>
</template>


<script>
import Rate from '@/components/Rate'
export default {
  created() {},
  props:['info'],
  methods: {
   
  },
  components:{
    Rate
  },
  computed: {
    userinfo(){
      return this.info.user_info ||{}
    }
  }
};
</script>

<style lang="scss" scoped>
.bookinfo{
  font-size:24rpx;
  color:#000;
  .right{
    float:right;
    font-size:24rpx;
  }
  .rate{
    color:rgb(247,186,42);
  }
  .detail{
     padding:20rpx 10rpx;
     .avatar{
       width: 50rpx;
       height:50rpx;
       border-radius: 50%;
       vertical-align: middle;
     }
  }
  .thumb{
     width:750rpx;
     height: 500rpx;
     //overflow: hidden;
     position: relative;
     .book {
        position: absolute;
        left:266rpx;
        bottom:-74rpx;
        width: 260rpx;
        height: 350rpx;
        transform: skewY(-4deg);
     }
    .myimg{
       width:100%;
       height:100%;
      
     }
    .myimgbefore {
position: absolute;
width: 20rpx;
height: 100%;
background: white;
top: 0;
left: -15rpx;
transform: skewY(45deg);
transform-origin: right;
filter: brightness(0.9);
z-index:100;
}
.book::after {
content: '';
position: absolute;
width: 100%;
height: 20rpx;
background:#e6e6e6;
top: -20rpx;
left: 0;
transform-origin: bottom;
transform: skewX(45deg);
filter: brightness(0.9);
}
.book {
box-shadow: -10px 5px 30px rgba(0, 0, 0, 0.5);
}
     .back{
       filter: blur(15px);
       width: 100%;
     }
   
     .info{
       position: absolute;
       width: 100%;
       left:0;
       top:30rpx;
       color:#fff;
       text-align: center;
       .title{
         font-size: 28rpx;
       }
       .author{
         font-size: 28rpx;
       }
     }
  }
  .tags-cover{
      padding: 20rpx 0;
      background-color: #dbdbdb;
      .title{
        background-color: #fff;
        color:#515151;
        font-size:28rpx;
        text-align: center;
        padding: 20rpx 0;
      }
      .tags{
         padding: 0 0 20rpx 20rpx;
         background-color: #fff;
        //  text-align: center;
         .badge{
             display: inline-block;
             margin: 10rpx;
             border-radius: 6rpx;
             border: 1px solid #87e8de;
             background: #fffbe6;
             background: #e6fffb;
             padding:10rpx;
             color: #13c2c2;
          }
      }
  }
  .summary{
     margin-top:20rpx;
     padding:0 30rpx;
     .title{
        background-color: #fff;
        color:#515151;
        font-size:28rpx;
        text-align: center;
        padding: 20rpx 0;
      }
     .sum{
        text-indent: 2em;
        font-size:28rpx;
     }
  }
}


</style>
