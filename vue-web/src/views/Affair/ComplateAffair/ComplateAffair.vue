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
                    <el-icon><Select /></el-icon>完成
                </button>
                <button class="cancel" @click="showPanel(false)">
                    <el-icon><CloseBold /></el-icon>取消
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { ElMessage } from 'element-plus'

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
                    this.$parent.refreshFinishBlock();
                    this.showPanel(false);
                    ElMessage({
                        showClose: true,
                        message: '事务已完成!',
                        type: 'success',
                    })
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

<style lang="less" scoped>
    @import url('./ComplateAffair.less');
</style>