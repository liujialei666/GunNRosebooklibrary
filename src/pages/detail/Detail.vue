<template>
   <div>
      <BookInfo :info="info"></BookInfo>
      <div class="good">
         <div class="cover" @click="dogood">
           <div class="div"><img :src="good" class="img" ></div>
           <div class="div"><span class="span" v-if="!havegood">点赞</span>
           <span class="activespan" v-if="havegood">已点赞</span></div>
         </div>
      </div>
      <div class="location">
         地理位置:<switch color="#ea5a49"  :checked="location" @change="getGeoe"/>
         <span class="text-primary">{{location}}</span>
      </div>
      <div class="phone">
        手机型号:<switch color="#ea5a49" :checked="phone" @change="getPhone"/>
        <span class="text-primary">{{phone}}</span>
      </div>
      <CommentList :comments="comments"></CommentList>
      <div class="comment" v-if="showAdd">
        <textarea v-model="comment" maxlength="100" class="textarea" placeholder="请输入评论"></textarea>
        <span class="rbutton" @click="addComment">评论</span>
      </div>
      <div class="remind" v-else>未登录或已评论</div>

      <div :class="goodflag ?'showgoodactive':'' "  class="showgood" v-if="goodflag">
            <img src="https://images.yitushijie.com/10266694239197484957" alt="" class="goodimg">
            <img src="https://images.yitushijie.com/12357648300445620197" alt="" class="huanimg">
      </div>
      
   </div>
</template>

<script>
import { get, post, showModal, showSuccess } from "@/util";
import BookInfo from "@/components/BookInfo";
import CommentList from "@/components/CommentList";
export default {
  data() {
    return {
      comments: [],
      userinfo: "",
      bookid: "",
      info: "",
      comment: "",
      location: "",
      phone: "",
      good: "https://images.yitushijie.com/12174152271896861405",
      havegood: false,
      goodlist: [],
      goodflag:false,
    };
  },
  components: {
    BookInfo,
    CommentList
  },
  methods: {
    async gethavegood() {
      // console.log(this.bookid)
      // console.log(this.userinfo.openId)
      const havegood = await get("/weapp/havegood", {
        bookid: this.bookid,
        openid: this.userinfo.openId
      });
      this.goodlist = havegood.mygood;
      // console.log(havegood)
      // console.log(this.goodlist);
      if (this.goodlist.length != 0) {
        this.havegood = true;
        this.good = "https://images.yitushijie.com/17812016414530886533";
      }
    },
    async dogood() {
      if (this.goodlist.length == 0) {
        console.log("nogood");
        const data = {
          bookid: this.bookid,
          openid: this.userinfo.openId,
          dogood: "1"
        };
        try {
          await post("/weapp/addgood", data);
          // showSuccess("点赞成功");
          this.good = "https://images.yitushijie.com/17812016414530886533";
          this.havegood = true;
          this.goodflag = true;
          // setTimeout(function () {
          //     this.goodflag = false;
          // }, 1000);
        } catch (e) {
          showModal("失败", e.msg);
        }
      } else {
        console.log("havegood");
      }
    },
    async getComments() {
      const comments = await get("/weapp/commentlist", { bookid: this.bookid });
      this.comments = comments.list || [];
    },
    async addComment() {
      console.log("send");
      if (this.comment == "") {
        return;
      }
      const data = {
        bookid: this.bookid,
        comment: this.comment,
        location: this.location,
        phone: this.phone,
        openid: this.userinfo.openId
      };
      try {
        await post("/weapp/addcomment", data);
        this.comment = "";
        this.getComments();
        showSuccess("评论成功");
      } catch (e) {
        showModal("失败", e.msg);
      }
    },
    getGeoe(e) {
      var ak = "LI6A0oYybRn5b4QvopVDSwlPqGFoIRnU";
      if (e.target.value) {
        let url = "https://api.map.baidu.com/geocoder/v2/";
        wx.getLocation({
          type: "wgs84",
          success: res => {
            wx.request({
              url,
              data: {
                location: `${res.latitude},${res.longitude}`,
                output: "json",
                ak
              },
              success: res => {
                if (res.data.status == 0) {
                  this.location = res.data.result.addressComponent.city;
                } else {
                  this.location = "未知地点";
                }
                console.log(res);
              }
            });
          }
        });
      } else {
        this.location = "";
      }
    },
    getPhone(e) {
      if (e.target.value) {
        const phonetype = wx.getSystemInfoSync();
        console.log(phonetype);
        this.phone = phonetype.model;
      } else {
        this.phone = "";
      }
    },
    async getDetail() {
      const info = await get("/weapp/bookdetail", { id: this.bookid });
      wx.setNavigationBarTitle({
        title: info.title
      });
      this.info = info;
    }
  },
  onShareAppMessage: function(res) {
    return {
      title: "自定义转发标题",
      path: "pages/detail/main?id=" + this.bookid
    };
  },
  computed: {
    showAdd() {
      if (!this.userinfo.openId) {
        return false;
      }
      if (this.comments.filter(v => v.openid == this.userinfo.openId).length) {
        return false;
      }
      return true;
    }
  },
  mounted() {
    console.log("mouted");
    this.goodflag=false,
    this.bookid = this.$root.$mp.query.id;
    (this.good = "https://images.yitushijie.com/12174152271896861405"),
      (this.havegood = false);
    this.getDetail();
    this.getComments();
    const userinfo = wx.getStorageSync("userinfo");
    if (userinfo) {
      this.userinfo = userinfo;
    }
    this.gethavegood();
  }
};
</script>

<style lang="scss" scoped>
.comment {
  margin-top: 20rpx;
  .textarea {
    display: inline-block;
    background: #fff;
    padding: 10rpx 20rpx;
    width: 70%;
    height: 64rpx;
    font-size: 28rpx;
    box-sizing: border-box;
    border: 1px solid #ddd;
    margin-right: 18rpx;
    margin-left: 35rpx;
    border-radius: 20rpx;
  }
  .rbutton {
    display: inline-block;
    width: 20%;
    padding: 0rpx 30rpx;
    height: 70rpx;
    line-height: 70rpx;
    box-sizing: border-box;
    vertical-align: top;
    text-align: center;
    background: #ea5a49;
    border-radius: 20rpx;
    color: #fff;
    //font-size:28rpx;
  }
}
.remind {
  text-align: center;
  font-size: 28rpx;
  color: #aaa;
}
.location {
  margin-top: 20rpx;
  margin-left: 150rpx;
  padding: 10rpx 20rpx;
  //text-align: center;
  color: #000;
  font-size: 28rpx;
}
.phone {
  margin-top: 20rpx;
  margin-left: 150rpx;
  padding: 10rpx 20rpx;
  color: #000;
  font-size: 28rpx;
}
.good {
  margin: 60rpx auto;
  text-align: center;
  .cover {
    display: inline-block;
    width: 18%;
    // height: 100rpx;
    text-align: center;
    .div {
      height: 40rpx;
      .img {
        width: 60rpx;
        height: 60rpx;
      }
      .span {
        color: #aaa;
        font-size: 28rpx;
      }
      .activespan {
        color: #fe698f;
        font-size: 28rpx;
      }
    }
  }
}
.showgood{
  position:fixed;
  left:0;
  right:0;
  top:0;
  bottom:0;
  margin:auto;
  width:200rpx;
  height:200rpx;
  opacity:0;
  .goodimg{
     position:absolute;
     left:76rpx;
     top:56rpx;
     display:inline-block;
     width:50%;
     height:50%;
  }
  .huanimg{
     position:absolute;
     left:0;
     display:inline-block;
     width:100%;
     height:100%;


  }
}
.showgoodactive{

  animation-name: fadeInOut;
  animation-timing-function: linear;
  animation-iteration-count: 1;
  animation-duration: 1.5s;
  .huanimg{
      animation-name: myrotate;
      animation-timing-function: linear;
      animation-iteration-count: 1;
      animation-duration: 1.5s;

  }
}
@-webkit-keyframes fadeInOut {
     0% {
         opacity:0;
         width:200rpx;
         height:200rpx;
      }
     25% {
         opacity:0.5;
         width:250rpx;
         height:250rpx;
     }
     50% {
         opacity:1;
         width:300rpx;
         height:300rpx;
     }
     100% {
         opacity:0;
         width:300rpx;
         height:300rpx;
     }
 }
 @-webkit-keyframes myrotate {
     0% {
         transform:rotate(0deg);
      }
     25% {
         transform:rotate(40deg);
     }
     50% {
         transform:rotate(60deg);
     }
     100% {
         transform:rotate(90deg);
     }
 }
</style>
