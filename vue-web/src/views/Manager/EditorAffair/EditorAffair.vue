<template>
    <div class="EditorAffairPanel" v-if="showPanel">
        <div class="PushAlert">
            <div class="AffairIcon" @click="Editor.showIconList = !Editor.showIconList">
                <svg class="icon" aria-hidden="true">
                    <use :xlink:href="'#icon-' + Editor.NewAffair.icon" />
                </svg>
            </div>
            <!-- 图标列表 -->
            <div class="IconList" v-show="Editor.showIconList">
                <div class="IconLI" v-for="(icon, i) in IconList" :key="i"
                    @click="Editor.NewAffair.icon = icon.font_class" :title="icon.name">
                    <svg class="icon" aria-hidden="true">
                        <use :xlink:href="'#icon-' + icon.font_class" />
                    </svg>
                </div>
            </div>
            <input type="text" v-model="Editor.NewAffair.name" class="NewAffairName" placeholder="事务新名称" title="名称" />
            <input type="text" v-model="Editor.NewAffair.describe" class="NewAffairDescribe" placeholder="事务新描述"
                title="描述" />
            <p class="SentenceThum">{{ pushSentence }}</p>
            <div class="PushTools">
                <button class="affirm" @click="UpdateAffair()">修改</button>
                <button class="cancel" @click="Close()">
                    取消
                </button>
            </div>
            <div class="deleteButton">
                <button title="警告,删除不可撤销!" @click="RemoveAffair()">
                    移除 !</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: [""],
    data() {
        return {
            showPanel:false,
            TargetAffair:null,
            // 编辑板块信息
            Editor: {
                NewAffair: {
                    name: "",
                    describe: "",
                    icon: "",
                },
                showIconList: true,
            },
            iconList:[],
        };
    },
    methods: {
        // 更新事务信息
        UpdateAffair() {
            let NewAffair = this.Editor.NewAffair;
            NewAffair._id = this.TargetAffair._id;
            this.Work.Affair.UpdateAffair(NewAffair)
                .then(() => {
                    // this.$emit("closeEditorPanel");
                    this.Close();
                })
                .catch(()=>{
                    alert("修改失败！");
                })
        },
        // 删除事务
        RemoveAffair() {
            this.Work.Affair.RemoveAffair(this.TargetAffair._id)
                .then(()=>{
                    this.Close();
                })
        },
        // 获取所有图标
        getAllIcon() {
            this.axios
                .get(this.Tool.config.address + "/icon/all")
                .then((res) => {
                    this.IconList = res.data;
                });
        },
        Open(TargetAffair){
            this.Editor.NewAffair.name = TargetAffair.name;
            this.Editor.NewAffair.describe = TargetAffair.describe;
            this.Editor.NewAffair.icon = TargetAffair.icon;
            this.TargetAffair = TargetAffair;
            this.showPanel = true;
        },
        Close(){
            this.showPanel = false;
            // this.Editor.NewAffair.name = '',
        }
    },
    mounted(){
        this.getAllIcon();
    }
};
</script>

<style lang="less">
@import url("./../../../App.less");
.EditorAffairPanel {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    width: 100vw;
    height: 100vh;
    z-index: 999;
    background: #000000bb;
    display: flex;
    align-items: center;
    justify-content: center;
    .PushAlert {
        width: 100%;
        max-width: 600px;
        margin: 0 auto;
        min-height: 300px;
        background: #fff;
        border-radius: 6px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 20px;
        transition: all 0.25s;
        position: relative;
        .AffairIcon {
            margin-top: 20px;
            font-size: 45px;
            cursor: pointer;
            transition: all 0.25s;
            flex-shrink: 0;
            &:hover {
                opacity: 0.5;
            }
        }
        .IconList {
            width: 418px;
            max-width: 90%;
            height: 200px;
            overflow-y: scroll;
            display: flex;
            flex-wrap: wrap;
            margin-bottom: 20px;
            border: 1px solid #eee;
            border-radius: 6px;
            padding: 4px;
            .IconLI {
                width: 34px;
                height: 34px;
                box-sizing: border-box;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 30px;
                border: 2px solid #fff;
                border-radius: 5px;
                margin: 2px;
                transition: all 0.25s;
                &:hover {
                    border-color: @mainColor;
                    cursor: pointer;
                }
            }
        }

        .PushRecordDescribe {
            color: #999;
            font-size: 12px;
            margin-bottom: 10px;
            user-select: none;
            margin-bottom: 15px;
        }
        .NewAffairName,
        .NewAffairDescribe {
            height: 40px;
            border-radius: 6px;
            width: 400px;
            outline: none;
            border: none;
            padding: 10px;
            font-size: 26px;
            border: 2px solid #eee;
            transition: all 0.25s;
            max-width: 90%;
            &:hover {
                border-color: @mainColor;
            }
            &:focus {
                border-color: @mainColor;
            }
            &::placeholder {
                color: #ccc;
            }
        }
        .NewAffairDescribe {
            margin-top: 4px;
            height: 26px;
            font-size: 20px;
        }
        .SentenceThum {
            max-width: 450px;
            font-size: 12px;
            color: #999;
            margin-top: 5px;
        }
        .PushTools {
            margin-top: 15px;
            .affirm,
            .cancel {
                width: 80px;
                height: 35px;
                margin: 5px;
                margin-top: 10px;
                border: none;
                color: #fff;
                font-size: 16px;
                transition: all 0.25s;
                cursor: pointer;
                user-select: none;
                border-radius: 4px;
                &:hover {
                    opacity: 0.7;
                }
            }
            .affirm {
                background: #67c23a;
            }
            .cancel {
                background: #f56c6c;
            }
        }
    }
    .deleteButton {
        position: absolute;
        right: 10px;
        top: 10px;
        button {
            font-size:12px;
            border: none;
            background: red;
            opacity: 0.5;
            border-radius: 6px;
            color: #fff;
            padding: 6px 12px;
            cursor: pointer;
            transition: all 0.25s;
            &:hover {
                opacity: 1;
            }
        }
    }
}
</style>
