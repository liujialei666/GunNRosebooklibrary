<script>

export default {
  async created() {
    // let user = wx.getStorageSync("userInfo");
    // if (!user) {
    //   console.log(config.loginUrl);
    //   qcloud.setLoginUrl(config.loginUrl);
    //   qcloud.login({
    //     success: function(userInfo) {
    //       console.log("登录成功", userInfo);
    //       showSuccess("登录成功");
    //       wx.setStorageSync("userInfo", userInfo);
    //     },
    //     fail: function(err) {
    //       console.log("登录失败", err);
    //     }
    //   });
    // }
    //   const res=await get('/weapp/demo')
    //   console.log(res)
    //   // wx.request({
    //   //   url:config.host +'/weapp/demo',
    //   //   success: function(res) {
    //   //     console.log(res)
    //   //   }
    //   // })
    //  console.log("222")
  }
};
</script>

<style >
 .text-primary{
   color:#EA5A49;
 }
 .btn{
   color:#fff;
   background:#EA5A49;
   margin-bottom:10px;
   padding-left:15px;
   border-radius:2px;
   font-size:16px;
   line-height:40px;
   height:40px;
   width:100% 
}
.btn:active{
  background:#FA5A49;
}
</style>
