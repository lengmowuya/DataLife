<template>
    <div id="AffairPage">
        <div class="AllLevel">
            <div class="AllLevelHead">
                <div class="userName">
                    {{ userName }} 
                </div>
                <!-- <el-icon><Odometer /></el-icon> -->
                
                <div class="AllLevelNumber">
                    Lv{{ userLevel }}
                </div>
            </div>
            <el-progress :title="`距离升到${userLevel+1}级,还差${userAllLevel.nextLevelAffair - userAllLevel.allLevel}次完成`" :percentage="userAllLevel.allLevel / userAllLevel.nextLevelAffair * 30 + 70 " :show-text="false" />
            <div class="upgradeHint">
                {{ `距离升到${userLevel+1}级,还差${userAllLevel.nextLevelAffair - userAllLevel.allLevel}次完成` }}
            </div>
        </div>
        <div class="PageCore">
            <FinishBlock ref="FinishBlock"></FinishBlock>
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

                        <el-icon><FolderOpened /></el-icon>
                        您暂无事务,先创建一个吧!
                    </div>
                    <div class="notCompleteBlock CompleteBlock" v-show="notCompleteList.length >0">
                        <div class="groupTitle">
                            今日待完成:{{ notCompleteList.length }}
                        </div>
                        <AffairLi v-for="(item, index) in notCompleteList" :key="index" @click="
                            onCompleteRecord = true;
                            CompleteAffair = item;
                        " :item="item"></AffairLi>
                    </div>
                    <div class="isCompleteBlock CompleteBlock" v-show="isCompleteList.length >0">
                        <div class="groupTitle">
                            今日已完成:{{ isCompleteList.length }}
                        </div>
                        <AffairLi v-for="(item, index) in isCompleteList" :key="index" @click="
                            onCompleteRecord = true;
                            CompleteAffair = item;
                        " :item="item"></AffairLi>
                    </div>
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
    import date from './../../js/date.js'
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
                userAllLevel:{
                    nextLevelAffair:0,
                    allLevel:0
                }
            };
        },
        methods: {
            refreshFinishBlock(){
                this.$refs.FinishBlock.confirm();
            },
            // 获取所有事务
            getAllAffair() {
                this.axios.get(
                        this.Tool.config.address +
                            "/affair/all/" +
                            this.$store.state.user.id
                    )
                    .then((res) => {
                        this.AffairList = res.data;
                        this.AffairList.forEach(item=>{
                            item.record.sort((a,b)=>new Date(b.time).getTime() - new Date(a.time).getTime());
                            if(item.record.length>0){
                                item.isComplete = date.isToday(new Date(item.record[0].time));
                            }
                            
                        })
                        this.AffairList.sort((a,b)=>a.isComplete - b.isComplete)
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
        computed:{
            isCompleteList(){
                return this.AffairList.filter(item=>item.isComplete);
            },
            notCompleteList(){
                return this.AffairList.filter(item=>!item.isComplete);
            },
            userName(){
                return localStorage.getItem('name');
            },
            userLevel(){
                let allLevel = this.AffairList.reduce((prev,item)=>{
                    prev += item.record.length;
                    return prev;
                },0);
                let userLevel = 0;
                let nextLevelAffair = 1;
                while(nextLevelAffair <= allLevel){
                    allLevel -= nextLevelAffair;
                    userLevel++;
                    nextLevelAffair++;
                }
                this.userAllLevel.nextLevelAffair = nextLevelAffair;
                this.userAllLevel.allLevel = allLevel;
                return userLevel;
            }
        },
        mounted() {
            // 初始化数据
            this.getAllAffair();
            // 页面标题
            document.title = "DataLife-首页";
        },
    };
</script>
<style lang="less" scoped>
    @import "./Affair.less";
</style>
