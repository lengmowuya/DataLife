<template>
    <div class="FinishRecordPush" v-if="onCompleteRecord && CompleteAffair != null">
        <div class="PushAlert">
            <h1 class="PushRecordName">
                {{ CompleteAffair.name }}
            </h1>
            <p class="PushRecordDescribe">{{ CompleteAffair.describe }}</p>
            <span class="AffairLevel" v-show="CompleteAffair.record.length > 0">Lv.{{ CompleteAffair.record.length }}</span>
            <textarea type="text" v-model="pushSentence" class="PushSentence" placeholder="总结这次完成"></textarea>
            <div class="PushTools">
                <button :class="[{affirm:true},{active:!isEmpty}]" @click.prevent="addAffairRecord()">
                    <el-icon><Select /></el-icon>确认
                </button>
                <button class="cancel" @click="showPanel(false)">
                    <el-icon><CloseBold /></el-icon>取消
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'ComplateAffair',
    props: ["onCompleteRecord", "CompleteAffair"],
    data() {
        return {
            pushSentence: "",
        };
    },
    methods: {
        addAffairRecord() {
            let {pushSentence,CompleteAffair} = this;
            // let  = this.TargetAffair;
            if (pushSentence.trim() == "") {
                alert("请填入您的总结");
                return;
            }
            let info = {
                affair: CompleteAffair._id,
                owner:CompleteAffair.owner,
                sentence: pushSentence,
            };
            this.axios
                .post(this.Tool.config.address + "/affairRecord/add", info)
                .then(() => {
                    // this.$emit("getAllAffair");
                    this.$parent.getAllAffair();
                    this.showPanel(false);
                    this.pushSentence = "";
                });
        },
        showPanel(bool){
            this.$parent.showCompleteRecord(bool);
        }
    },
    computed:{
        isEmpty(){
            return this.pushSentence.trim() == '';
        }
    }
};
</script>

<style lang="less">
    @import url('./ComplateAffair.less');
</style>