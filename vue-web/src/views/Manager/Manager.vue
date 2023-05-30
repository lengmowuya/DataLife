<template>
    <div id="AffairPage">
        <div class="PageCore">
            <div class="MyAffairBigBlock">
                <div class="MyAffair">
                    <div class="NullBlockTip" v-if="AffairList.length <= 0">
                        <el-icon><FolderOpened /></el-icon>
                        暂无事务可供管理
                    </div>
                    <div v-for="(item, index) in AffairList" :key="index" :class="{
                            AffairLi: true,
                        }"
                        title="编辑这个事务!" @click="OpenEditorPanel(item)" >
                        <div class="AffairContent">
                            <div class="AffairIconBlock">
                                <div class="AffairIcon">
                                    <svg class="iconBackground" aria-hidden="true">
                                        <use :xlink:href="'#icon-' + item.icon" />
                                    </svg>
                                    <svg class="icon" aria-hidden="true">
                                        <use :xlink:href="'#icon-' + item.icon" />
                                    </svg>
                                </div>
                            </div>
                            <div class="AffairText">
                                <p class="AffairLiName">{{ item.name }}</p>
                                <p class="AffairLiDescribe">
                                    {{ item.describe }}
                                </p>
                                <span class="AffairLevel"
                                    v-show="item.record.length > 0">Lv.{{ item.record.length }}</span>
                            </div>
                            <div class="AffairTools">
                                <button class="AffairEditorButton">
                                    <!-- <i class="el-icon-s-tools"></i> -->
                                    <el-icon><Tools /></el-icon>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 编辑该事务板块(默认隐藏) -->
        <EditorAffair ref="EditorPanel">
        </EditorAffair>
    </div>
</template>
<script>
import EditorAffair from "./EditorAffair/EditorAffair.vue";
export default {
    name:'Manager',
    components: {
        EditorAffair,
    },
    data() {
        return {
            EditorPanelInfo: {
                showPanel: false,
                TargetAffair: null,
            },
            AffairList: []
        };
    },
    methods: {
        OpenEditorPanel(item){
            this.$refs.EditorPanel.Open(item)
        },
        // 切换选中的事务
        closeEditorPanel() {
            this.EditorPanelInfo.showPanel = false;
        },
        // 获取所有事务
        getAllAffair() {
            this.axios
                .get(
                    this.Tool.config.address +
                        "/affair/all/" +
                        this.$store.state.user.id
                )
                .then((res) => {
                    this.AffairList = res.data;
                    this.AffairList.sort((a, b) => {
                        return b.record.length - a.record.length;
                    });
                });
        },

    },
    mounted() {
        this.getAllAffair();
        document.title = "DataLife-管理事务";

    },
};
</script>
<style lang="less" scoped>
@import "./Manager.less";
</style>
