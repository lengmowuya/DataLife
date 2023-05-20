<template>
    <div class="FinishRecordPush" v-if="onComplete && TargetAffair != null">
        <div class="PushAlert">
            <p class="PushRecordName">
                {{ TargetAffair.name }}
            </p>
            <p class="PushRecordDescribe">{{ TargetAffair.describe }}</p>
            <span class="AffairLevel" v-show="TargetAffair.record.length > 0">Lv.{{ TargetAffair.record.length }}</span>
            <textarea type="text" v-model="pushSentence" class="PushSentence" placeholder="总结这次完成"></textarea>
            <div class="PushTools">
                <button class="affirm" @click.prevent="addAffairRecord()">
                    确认
                </button>
                <button class="cancel" @click="onComplete = false;$emit('closePanel')">取消</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["onComplete", "TargetAffair"],
    data() {
        return {
            pushSentence: "",
        };
    },
    methods: {
        addAffairRecord() {
            let pushSentence = this.pushSentence;
            let TargetAffair = this.TargetAffair;
            if (pushSentence.trim() == "") {
                alert("请填入您的总结");
                return;
            }
            let info = {
                affair: TargetAffair._id,
                sentence: pushSentence,
            };
            this.axios
                .post(this.Tool.config.address + "/affairRecord/add", info)
                .then(() => {
                    this.$emit("getAllAffair");
                    this.$emit("closePanel");
                    this.pushSentence = "";
                });
        },
    },
};
</script>

<style lang="less">
@import url("./../App.less");
.FinishRecordPush {
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
    max-width: 100vw;
    .PushAlert {
        width: 100%;
        max-width: 560px;
        margin: 0 auto;
        min-height: 400px;
        background: #fff;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 20px;
        // background: url(https://duvebe931qgtc.cloudfront.net/resources/images/sub/bg_allleague_sub.png) center center #fff no-repeat;
        background-size: 100% 100%;
        .PushRecordName {
            color: #252525;
            font-weight: bold;
            user-select: none;
            margin-top: 18px;

        }
                    .AffairLevel {
                color: gold;
                margin-left: 4px;
                font-size: 13px;
                // display:none;
            margin-bottom: 36px;
            }
        .PushRecordDescribe {
            color: #98a3b7;
            // font-weight: bold;
            font-size: 12px;
            user-select: none;
            margin-bottom: 6px;
        }
        .PushSentence {
            // height:40px;
            width: 415px;
            height: 220px;
            border-radius: 6px;
            outline: none;
            border: none;
            padding: 10px;
            font-size: 18px;
            border: 2px solid #eee;
            transition: all 0.25s;
            max-width: 90%;
            font-family: caner;
            resize: none;
            background: #f6f7f9;
            &::placeholder {
                color: #ccc;
            }
        }
        .SentenceThum {
            max-width: 450px;
            font-size: 12px;
            color: #999;
            margin-top: 5px;
        }
        .affirm,
        .cancel {
            width: 80px;
            height: 34px;
            margin: 5px;
            margin-top: 40px;
            border: none;
            color: #fff;
            font-size: 16px;
            transition: all 0.25s;
            cursor: pointer;
            user-select: none;
            border-radius: 3px;
            letter-spacing: 3px;
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
</style>