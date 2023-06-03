<template>
    <div class="EditorAffairPanel" v-if="onCreateAffair">
        <div class="PushAlert">
            <div class="PushAlertLeft">
                
            </div>
            <div class="PushAlertRight">
                <h1>新建事务</h1>
                <div class="AffairIcon" v-if="activeIcon != null" @click="Editor.showIconList = !Editor.showIconList">
                    <svg class="icon" aria-hidden="true" >
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
                <input type="text" v-model="Editor.NewAffair.name" class="NewAffairName" placeholder="事务名称" title="名称" />
                <input type="text" v-model="Editor.NewAffair.describe" class="NewAffairDescribe" placeholder="事务描述"
                    title="描述" />
                <!-- <p class="SentenceThum">{{ pushSentence }}</p> -->
                <div class="PushTools">
                    <button class="affirm" @click="AddAffair()">
                        <el-icon><Select /></el-icon>创建
                    </button>
                    <button class="cancel" @click="Close()">
                        <el-icon><CloseBold /></el-icon>取消
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ElMessage } from 'element-plus'

export default {
    name:'CreateAffair',
    data() {
        return {
            activeIcon:null,
            iconGroup:1,
            Editor: {
                NewAffair: {
                    name: "",
                    describe: "",
                    icon: "",
                },
                showIconList: true,
            },
            iconList:[]
        };
    },
    props:['onCreateAffair'],
    methods: {
        AddAffair() {
            this.Editor.NewAffair.icon = this.activeIcon._id;
            let NewAffair = this.Editor.NewAffair;
            NewAffair.owner = this.$store.state.user.id;
            this.Work.Affair.AddAffair(NewAffair)
                .then(() => {
                    this.Editor.NewAffair.name = "";
                    this.Editor.NewAffair.describe = "";
                    // this.getAllAffair();
                    this.Close();
                    ElMessage({
                        showClose: true,
                        message: '创建成功!',
                        type: 'success',
                    })
                    this.$parent.getAllAffair();
                });
        },
        // 获取所有图标
        getAllIcon() {
            this.axios
                .get(this.Tool.config.address + "/icon/all")
                .then((res) => {
                    console.log(res.data);
                    this.iconList = res.data;
                    // this.Editor.NewAffair.icon = this.IconList[0].font_class
                    this.activeIcon = this.iconList[0];
                });
        },
        Open() {
            // this.onCreateAffair = true;
            this.$parent.showCreateAffair(true);
        },
        Close() {
            this.$parent.showCreateAffair(false);

        },
    },
    mounted() {
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
    @import url('./CreateAffair.less');
</style>
