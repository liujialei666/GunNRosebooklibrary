
//获取豆瓣信息
//信息入库
const {mysql}=require('../qcloud')

module.exports= async (ctx) =>{
       const {bookid,comment,location,phone,openid}=ctx.request.body 
       try{
           await mysql('comments').insert({
            bookid,comment,location,phone,openid
           })
           ctx.state.data={
               msg:'success'
           }
        } catch (e) {
            ctx.state = {
                code: -1,
                data: {
                    msg: '评论失败:' + e.sqlMessage
                }
            }
        }
      
}

