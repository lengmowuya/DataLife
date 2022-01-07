// Token
const jwt = require("jsonwebtoken")
const secret = '113Bmongojsdalkfnxcvmas'
// 生成token
function createToken(info){
    let token = jwt.sign(info,secret,{
        expiresIn:60*60*10
    })
    return token
}
// 验证token
function verifyToken(token){
    return new Promise((resolve,reject)=>{
        jwt.verify(token,secret,(error,result)=>{
            if(error){
                reject(error)
            }else{
                resolve(result);
            }
        })
    })
}
const whiteList = ['/login']
module.exports = {
    createToken,
    verifyToken,
    whiteList
}