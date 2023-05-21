<template>
    <div class="EditorAffairPanel" v-if="showPanel">
        <div class="PushAlert">
            <h1>新建事务</h1>
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
            <input type="text" v-model="Editor.NewAffair.name" class="NewAffairName" placeholder="事务名称" title="名称" />
            <input type="text" v-model="Editor.NewAffair.describe" class="NewAffairDescribe" placeholder="事务描述"
                title="描述" />
            <p class="SentenceThum">{{ pushSentence }}</p>
            <div class="PushTools">
                <button class="affirm" @click="AddAffair()">完成</button>
                <button class="cancel" @click="Close()">
                    取消
                </button>
            </div>
            <!-- <div class="deleteButton">
                <button title="警告,删除不可撤销!" @click="removeAffair(Editor.TargetAffair)">
                    删除事务
                </button>
            </div> -->
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // 编辑板块信息
            showPanel: false,
            Editor: {
                NewAffair: {
                    name: "",
                    describe: "",
                    icon: "",
                },
                showIconList: true,
            },
            iconList: [],
        };
    },
    methods: {
        AddAffair() {
            let NewAffair = this.Editor.NewAffair;
            NewAffair.owner = this.$store.state.user.id;
            this.Work.Affair.AddAffair(NewAffair)
                .then(() => {
                    this.Editor.NewAffair.name = "";
                    this.Editor.NewAffair.describe = "";
                    // this.getAllAffair();
                    this.Close();
                });
        },
        // 获取所有图标
        getAllIcon() {
            this.axios
                .get(this.Tool.config.address + "/icon/all")
                .then((res) => {
                    this.IconList = res.data;
                    this.Editor.NewAffair.icon = this.IconList[0].font_class
                });
        },
        Open() {
            this.showPanel = true;
        },
        Close() {
            this.showPanel = false;
        },
    },
    mounted() {
        this.getAllIcon();
    },
};
</script>

<style lang="less">
    @import url('./CreateAffair.less');
</style>
