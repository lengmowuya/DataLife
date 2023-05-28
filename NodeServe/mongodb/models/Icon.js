const mongoose = require("mongoose");
const FontInfo = require("../../assets/FontInfo.json");
let IconSchema = {
    icon_id:String,
    name:String,
    font_class:String,
    unicode:String,
    unicode_decimal:Number
}

const Icon = mongoose.model('Icon',IconSchema,"Icon");

// 初始化图标列表数据
// Icon.find({},(err,res)=>{
//     if(res.length == 0){
//         let glyphs = FontInfo.glyphs;
//         for(let i = 0;i<glyphs.length;i++){
//             new Icon(glyphs[i]).save();
//         }
//     }
// })
Icon.find({}).then((res)=>{
        if(res.length == 0){
            let glyphs = FontInfo.glyphs;
            for(let i = 0;i<glyphs.length;i++){
                new Icon(glyphs[i]).save();
            }
        }
    })
module.exports = Icon;
