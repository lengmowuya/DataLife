<template>
    <div id="AffairPage">
        <div class="PageCore">
            <FinishBlock></FinishBlock>
            <div class="MyAffairBigBlock">
                <div class="AffairListTools">
                    <div class="CreateAffair" @click="OpenNewAffairPanel()">
                        <i class="el-icon-s-management"></i>创建事务
                    </div>
                    <div class="AllAffairList" @click="$router.push({name:'ManagerSelf'})">
                        <i class="el-icon-menu"></i>管理全部
                    </div>
                </div>
                <div class="MyAffair">
                    <div class="NullBlockTip" v-if="AffairList.length <= 0">
                        您暂无事务,先创建一个吧!
                    </div>
                    <AffairLi v-for="(item, index) in AffairList" :key="index" @click="
                        CompletePanel.onComplete = true;
                        CompletePanel.TargetAffair = item;
                    " :item="item"></AffairLi>
                    <!-- <div  :class="{
                            AffairLi: true,
                            active: activeAffairId == item._id,
                        }">

                    </div> -->
                </div>
            </div>
        </div>
        <!-- 完成该事务板块(默认隐藏) -->
        <ComplateAffair :onComplete="CompletePanel.onComplete" :TargetAffair="CompletePanel.TargetAffair"
            @getAllAffair="getAllAffair" @closePanel="closeCompleteAffairPanel">
        </ComplateAffair>
        <CreateAffair ref="CreateAffair"></CreateAffair>
    </div>
</template>
<script>
    import Affair  from './Affair.js';
    export default Affair;
</script>
<style lang="less" scoped>
    @import "./Affair.less";
</style>
