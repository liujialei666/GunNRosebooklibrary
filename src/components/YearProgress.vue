<template>

   <div class="progresssbar">
       <p>{{year}}年已经过去了{{days}}天</p>
       <progress :percent="percent"  activeColor="#EA5A49" />
       <p>{{percent}}%</p>
   </div>
</template>


<script>
export default {
  created() {},
  methods: {
      isLeapYear(){
        const year=new Date().getFullYear()
        if(year%400===0){
            return true
        }else if(year%4===0 && year%100!=0){
            return true
        }else{
            return false
        }
      },
      getDayOfYear(){
         return this.isLeapYear()?366:365
      }
  },
  computed: {
    year() {
      return new Date().getFullYear();
    },
    days() {
        let start=new Date()
        start.setMonth(0)
        start.setDate(1)
        let offset=new Date().getTime()-start.getTime()
        return parseInt(offset/1000/60/60/24)+1
    },
    percent(){

        return (this.days*100/this.getDayOfYear()).toFixed(1)
    }
  }
};
</script>

<style lang="scss">
.progresssbar {
  width: 100%;
  margin-bottom:50rpx;
  padding:0 20rpx;
  box-sizing: border-box;
  //border-top:1px solid #ccc;
  border-bottom:1px solid #ddd;
  p {
    text-align: center;
    padding:20rpx 0;
  }
  progress {
    margin: 20rpx 0;
  }
}
</style>
