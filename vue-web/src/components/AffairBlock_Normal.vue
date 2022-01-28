<!-- 组件说明 -->
<template>
    <div @click="CompletePanel.onComplete = true;CompletePanel.TargetAffair = item;"
        :class="{AffairLi: true,active: activeAffairId == item._id}">
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
                <span class="AffairLevel" v-show="item.level > 0">Lv.{{ item.level }}</span>
            </div>
            <div class="AffairTools">
                <button class="AffairFinishButton" @click="
                                        onPushRecord = true;
                                        pushAffair = item;
                                    " title="完成一次">
                    <i class="el-icon-check"></i>
                    完成
                </button>
                <button class="AffairEditorButton" title="编辑这个事务!" @click="
                                        Editor.onEditorAffair = true;
                                        changeAffairInfo(item);
                                    ">
                    <i class="el-icon-s-tools"></i>
                    编辑
                </button>
            </div>
        </div>
    </div>
</template>

<script>
//import x from ''
export default {
    components: {},
    data() {
        return {};
    },
    computed: {},
    methods: {},
};
</script>

<style lang='scss' scoped>
//@import url()
</style>