const mongoose = require("mongoose");
const FontInfo1 = require("../../assets/FontInfo1.json");
const FontInfo2 = require("../../assets/FontInfo2.json");
let IconSchema = {
    icon_id:String,
    name:String,
    font_class:String,
    unicode:String,
    group:Number,
    unicode_decimal:Number,
}

const Icon = mongoose.model('Icon',IconSchema,"Icon");

// 设置数据库默认数据
Icon.find({}).then((res)=>{
        if(res.length == 0){
            // 导入图标库1
            let glyphs = FontInfo1.glyphs;
            for(let i = 0;i<glyphs.length;i++){
                // glyphs.
                glyphs[i].group = 1;
                new Icon(glyphs[i]).save();
            }
            // 导入图标库2
            glyphs = FontInfo2.glyphs;
            for(let i = 0;i<glyphs.length;i++){
                // glyphs.
                glyphs[i].group = 2;
                new Icon(glyphs[i]).save();
            }
        }
    })
module.exports = Icon;
