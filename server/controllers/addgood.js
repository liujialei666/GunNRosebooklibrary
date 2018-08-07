const { mysql } = require('../qcloud')

module.exports = async (ctx) => {
    const { bookid, openid, dogood } = ctx.request.body
    try {
        await mysql('dogood').insert({ bookid, openid, dogood })
        ctx.state.data = {
            code: 0,
            msg: 'success'
        }
    } catch (e) {
        ctx.state = {
            code: -1,
            data: {
                msg: '点赞失败，请登录授权' 
            }
        }
    }
}