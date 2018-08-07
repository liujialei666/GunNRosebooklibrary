const { mysql } = require('../qcloud')

module.exports = async (ctx) => {
    const { bookid, openid } = ctx.request.query
    const mygood = await mysql('dogood')
        .select('dogood.*', 'cSessionInfo.user_info')
        .join('cSessionInfo', 'dogood.openid', 'cSessionInfo.open_id')
        .where({
            bookid:bookid,
            openid:openid
        })
    ctx.state.data = {
        mygood
    }
}