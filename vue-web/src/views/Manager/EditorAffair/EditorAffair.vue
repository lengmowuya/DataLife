<template>
    <div class="EditorAffairPanel" v-if="showPanel">
        <div class="PushAlert">
            <div class="AffairIcon" v-if="activeIcon != null" @click="Editor.showIconList = !Editor.showIconList">
                <svg class="icon" aria-hidden="true">
                    <use :xlink:href="`#icon${activeIcon.group}-${activeIcon.font_class}`" />
                </svg>
                {{ activeIcon.name }}
            </div>
            <!-- 图标列表 -->
            <div class="IconList" v-show="Editor.showIconList">
                <div class="IconLI" v-for="(icon, i) in iconListGroup" :key="i"
                    @click="activeIcon = icon" :title="icon.name">
                    <svg class="icon" aria-hidden="true">
                        <use :xlink:href="`#icon${icon.group}-${icon.font_class}`" />
                    </svg>
                </div>
            </div>
            <div class="groupList">
                <div :class="{active:iconGroup==1}" @click="iconGroup=1"> <el-icon><Files /></el-icon>绚烂类型</div>
                <div :class="{active:iconGroup==2}" @click="iconGroup=2"> <el-icon><Files /></el-icon>学术类型</div>
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
                    <el-icon><DeleteFilled /></el-icon>移除事务及其记录</button>
            </div>
        </div>
    </div>
</template>

<script>
import { ElMessage } from 'element-plus'
export default {
    name:'EditorAffair',
    props: [""],
    data() {
        return {
            iconGroup:1,
            activeIcon:null,
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
            this.Editor.NewAffair.icon = this.activeIcon._id;
            let NewAffair = this.Editor.NewAffair;
            NewAffair._id = this.TargetAffair._id;
            this.Work.Affair.UpdateAffair(NewAffair)
                .then(() => {
                    // this.$emit("closeEditorPanel");
                    this.Close();
                    this.$parent.getAllAffair();
                    ElMessage({
                        showClose: true,
                        message: '修改完成!',
                        type: 'success',
                    })
                })
                .catch(()=>{
                    // alert("修改失败！");
                    ElMessage({
                        showClose: true,
                        message: '修改错误!',
                        type: 'error',
                    })
                })
        },
        // 删除事务
        RemoveAffair() {
            if(confirm('您确定移除该事务及其所有记录吗?\n该操作不可逆!')){
                this.Work.Affair.RemoveAffair(this.TargetAffair._id)
                    .then(()=>{
                        this.Close();
                        this.$parent.getAllAffair();
                        ElMessage({
                            showClose: true,
                            message: '事务已删除'
                        })
                    })
            }
        },
        // 获取所有图标
        getAllIcon() {
            this.axios
                .get(this.Tool.config.address + "/icon/all")
                .then((res) => {
                    this.iconList = res.data;
                    this.activeIcon = res.data[0];
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
        }
    },
    mounted(){
        this.getAllIcon();
    },
    computed:{
        iconListGroup(){
            return this.iconList.filter(item=>item.group == this.iconGroup);
        }
    }  
};
</script>

<style lang="less" scoped>
    @import url('./EditorAffair.less');
</style>
