<template>

   <div class="swiper">
      <swiper indicator-dots="true" autoplay="true" indicator-active-color="#fe698f" indicator-color="#000" circular="true" interval="6000" duration="1000">
          <div :key='imgindex' v-for="(top,imgindex) in imgarray">
             <swiper-item>
                 <img :src="item.image" :key="index" v-for="(item,index) in top" mode="aspectFit" class="slide-image" @click="godetail(item.id)">
             </swiper-item>
          </div>
      </swiper>
   </div>
</template>


<script>
export default {
  created() {},
  props:['tops'],
  methods: {
    godetail(id){
      console.log(id)
      wx.navigateTo({
          url: '/pages/detail/main?id='+id
      })
      
    }
  },
  computed: {
    imgarray(){
      let res=this.tops
      return [res.slice(0,3),res.slice(3,6),res.slice(6,9)]
    }
  }
};
</script>

<style lang="scss" scoped>
.swiper{
  margin-top: 10rpx;
  .slide-image{
    width: 33%;
    height:250rpx;
  }
}

</style>
