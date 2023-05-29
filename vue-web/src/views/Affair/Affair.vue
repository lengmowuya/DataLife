<template>
    <div id="AffairPage">
        <div class="PageCore">
            <FinishBlock></FinishBlock>
            <div class="MyAffairBigBlock">
                <div class="AffairListTools">
                    <div class="CreateAffair" @click="onCreateAffair = true">
                        <el-icon><CirclePlusFilled /></el-icon>创建事务
                    </div>
                    <div class="AllAffairList" @click="$router.push({name:'ManagerSelf'})">
                        <el-icon><Menu /></el-icon>管理全部
                    </div>
                </div>
                <div class="MyAffair">
                    <div class="NullBlockTip" v-if="AffairList.length <= 0">
                        您暂无事务,先创建一个吧!
                    </div>
                    <AffairLi v-for="(item, index) in AffairList" :key="index" @click="
                        onCompleteRecord = true;
                        CompleteAffair = item;
                    " :item="item"></AffairLi>
                </div>
            </div>
        </div>
        <!-- 完成该事务板块(默认隐藏) -->
        <ComplateAffair 
            :onCompleteRecord="onCompleteRecord" :CompleteAffair="CompleteAffair">
        </ComplateAffair>
        <CreateAffair :onCreateAffair="onCreateAffair"></CreateAffair>
    </div>
</template>
<script>
    import CreateAffair from "./CreateAffair/CreateAffair.vue";
    import FinishBlock from "./FinishBlock/FinishBlock.vue";
    import ComplateAffair from "./ComplateAffair/ComplateAffair.vue";
    import AffairLi from "./AffairLi/AffairLi.vue";
    export default {
        name:'Affair',
        components: {
            CreateAffair,
            FinishBlock,
            ComplateAffair,
            AffairLi
        },
        data() {
            return {
                CompleteAffair: null,
                onCreateAffair:false,
                onCompleteRecord:false,
                // CreateAffair: {},
                AffairList: [],
            };
        },
        methods: {
            // 获取所有事务
            getAllAffair() {
                this.axios.get(
                        this.Tool.config.address +
                            "/affair/all/" +
                            this.$store.state.user.id
                    )
                    .then((res) => {
                        this.$data.AffairList = res.data;
                        // this.$forceUpdate();
                    });
            },
            showCreateAffair(bool){
                this.onCreateAffair = bool;
            },
            showCompleteRecord(bool){
                this.onCompleteRecord = bool;
            }
        },
        mounted() {
            // 初始化数据
            this.getAllAffair();
            // 页面标题
            document.title = "DataLife";
        },
    };
</script>
<style lang="less" scoped>
    @import "./Affair.less";
</style>
