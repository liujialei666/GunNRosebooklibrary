<template>
   <div class="container">
      <div class="userinfo">
          <img class="bcg" :src="background">
          <div class="info">
             <p class="pone"><span class="sspan">用户:</span><span class="span">{{userinfo.nickName}}</span></p>
             <p class="ptwo"><span class="sspan">城市:</span><span class="span">{{userinfo.city}}</span></p>
          </div>
          <div class="cover"></div>
          <img class="img" :src="userinfo.avatarUrl">
      </div>
      
      <YearProgress></YearProgress>
      <button v-if='userinfo.openId' class="greenmybtn mybtn" @click="scanbook">添加图书</button>
      <button v-else open-type="getUserInfo" lang="zh_CN" class='mybtn' @getuserinfo="login">点击登录</button>
   </div>
</template>

<script>
import YearProgress from "@/components/YearProgress";
import { get, showSuccess,showModal,post } from "@/util";
import qcloud from "wafer2-client-sdk";
import config from "@/config";
export default {
  data() {
    return {
      userinfo: {
        avatarUrl: "http://image.shengxinjing.cn/rate/unlogin.png",
        nickName: ""
      },
      background:'',

    };
  },
  components: {
    YearProgress
  },
  methods: {
    async addBook(isbn){
      console.log("111")
      console.log(isbn)
      const res=await post('/weapp/addbook',{
        isbn,
        openid:this.userinfo.openId
      })
      console.log(res)
      showModal('添加成功', `${res.title}添加成功`)
      // if(res.code==0&&res.data.title){
      //   console.log("22222")
      //   console.log(res)
      //   showSuccess('添加成功',`${res.data.title}添加成功`)

      // }
    },
    scanbook() {
      wx.scanCode({
        success: (res) => {
          if(res.result){
             this.addBook(res.result)
          }
          
        }
      });
    },
    
    getWxLogin: function ({encryptedData, iv, userinfo}) {
      const self = this
      console.log('getWxLogin')
      wx.login({
        success: function (loginResult) {
          console.log('loginResult', loginResult)
          var loginParams = {
            code: loginResult.code,
            encryptedData: encryptedData,
            iv: iv
          }
          qcloud.setLoginUrl(config.loginUrl)
          qcloud.requestLogin({
            loginParams,
            success () {
              qcloud.request({
                url: config.userUrl,
                login: true,
                success (userRes) {
                  showSuccess('登录成功')
                  
                  wx.setStorageSync('userinfo', userRes.data.data)
                  wx.setStorageSync('bck', 'https://images.yitushijie.com/12736192357375496757')
                  self.userinfo = userRes.data.data
                  self.background='https://images.yitushijie.com/12736192357375496757'
                }
              })
            },
            fail (error) {
               showModal('登录失败', error)
            }
          })
        },
        fail: function (loginError) {
           showModal('登录失败', loginError)
        }
      })
    },

    login(e) {
      
      const self = this;
      // 查看是否授权
      wx.getSetting({
        success: function(res) {
          // 授权信息里有用户信息
          
          if (res.authSetting["scope.userInfo"]) {
            // 检查用户登录是否过期
            wx.checkSession({
              success: function() {
                // 没过期 直接成功
                showSuccess("成功");
              },
              fail: function() {
                // 过期了 重新登录 先清楚登录的状态
                qcloud.clearSession();
                // 登录态已过期，需重新登录
                // 登录需要的加密信息
               
                var options = {
                  encryptedData: e.mp.detail.encryptedData,
                  iv: e.mp.detail.iv,
                  userinfo: e.mp.detail.userInfo
                };
                
                self.getWxLogin(options);
              }
            });
          } else {
            showModal("用户未授权", e.mp.detail.errMsg);
          }
        }
      });
    }
  },
  onShow() {
    let userinfo = wx.getStorageSync("userinfo");
    console.log(userinfo)
    let bck=wx.getStorageSync("bck");
    if (userinfo) {
      this.userinfo = userinfo;
    }
    if(bck){
      this.background=bck;
  }
  }
}
</script>


<style lang="scss">
.container {
  margin-top: -30rpx;
  .userinfo {
    margin-top: 30rpx;
    text-align: center;
    position: relative;
    background-color: #dbdbdb;
    .cover{
      position:absolute;
      top:0;
      left:264rpx;
      width: 180rpx;
      height: 180rpx;
      margin: 20rpx;
      border-radius: 50%;
      background: #fff;
    }
    .img {
      position:absolute;
      top:10rpx;
      left:274rpx;
      width:160rpx;
      height:160rpx;
      margin:20rpx;
      border-radius:50%;
    }
    .info{
      position:absolute;
      left:40rpx;
      top:124rpx;
      display:inline-block;
      width:90%;
      height:245rpx;
      background:#fff;
      border-radius:30rpx;
      .pone{
        display: inline-block;
        width: 50%;
        color:#000;
        height:20%;
        font-size:28rpx;
        margin-top: 100rpx;
        border-right: 1px solid #aaa;
        box-sizing: border-box;
        .span{
           font-weight: 700;
        }
        .sspan{
          color:#000;
          margin-right:10rpx;
          font-weight: 0;
        }
      }
      .ptwo{
        display: inline-block;
        width: 50%;
        color:#000;
        height:20%;
        font-size:28rpx;
        margin-top: 130rpx;
        .span{
          font-weight: 700;
        }
        
        .sspan{
          color:#000;
          margin-right:10rpx;
          font-weight: 0;
        }
      }

    }
    .bcg{
      width:100%;
    }
  }
  .mybtn{
    color:#fff;
    background:#4caf50;
    margin-bottom:10px;
    padding-left:15px;
    border-radius:20px;
    font-size:16px;
    line-height:40px;
    height:40px;
    width:60% 
  }
  .greenmybtn{
    background:#EA5A49;
  }
}
</style>

