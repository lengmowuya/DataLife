<template>
    <div id="AffairPage">
        <div class="PageCore">
            <!-- <NewAffair></NewAffair> -->
            <FinishBlock></FinishBlock>
            <!-- <AffairList></AffairList> -->
            <div class="MyAffairBigBlock">
                <div class="AffairListTools">
                    <div class="CreateAffair" @click="OpenNewAffairPanel()">
                        创建事务
                    </div>
                    <div class="AllAffairList" @click="$router.push({name:'ManagerSelf'})">
                        管理全部
                    </div>
                </div>
                <div class="MyAffair">
                    <div class="NullBlockTip" v-if="AffairList.length <= 0">
                        您暂无事务,先创建一个吧!
                    </div>
                    <div v-for="(item, index) in AffairList" :key="index" @click="
                            CompletePanel.onComplete = true;
                            CompletePanel.TargetAffair = item;
                        " :class="{
                            AffairLi: true,
                            active: activeAffairId == item._id,
                        }">
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 完成该事务板块(默认隐藏) -->
        <CompleteAffair 
            :onComplete="CompletePanel.onComplete" 
            :TargetAffair="CompletePanel.TargetAffair"
            @getAllAffair="getAllAffair"
            @closePanel="closeCompleteAffairPanel"
            >
        </CompleteAffair>
        <!-- 编辑该事务板块(默认隐藏) -->
        <!-- <EditorAffairPanel
            
            >
        </EditorAffairPanel> -->
        <NewAffairPanel ref="NewAffairPanel"></NewAffairPanel>
    </div>
</template>
<script>
// import NewAffair from "./../components/NewAffair.vue";
import NewAffairPanel from "./../components/NewAffairPanel.vue";
import FinishBlock from "./../components/FinishBlock.vue";
import AffairList from "./../components/AffairList.vue";
import EditorAffairPanel from "./../components/EditorAffairPanel.vue";
import CompleteAffair from "./../components/CompleteAffair.vue";
export default {
    components: {
        NewAffairPanel,
        FinishBlock,
        AffairList,
        EditorAffairPanel,
        CompleteAffair,
    },
    data() {
        return {
            CompletePanel: {
                onComplete: false,
                TargetAffair: null,
            },
            NewAffairPanel:{

            },
            AllAffairDay: 0,
            RecordShowDate: null,
            NowDate: {
                time: new Date().getTime(),
                data: {},
                Date: new Date(),
            },
            Record: {
                activeIndex: 0,
            },
            HistoryRecord: [],
            AffairList: [],
            RecordList: [],
            activeAffairId: "",
            IconList: [],
            // 新建事务板块信息
            NewBlock: {
                name: "",
                describe: "",
            },
        };
    },
    methods: {
        OpenNewAffairPanel(){
            this.$refs.NewAffairPanel.Open();
        },
        keyDown() {},
        // 切换选中的事务
        changeActiveAffair(id) {
            this.activeAffairId = id;
        },
        closeCompleteAffairPanel(){
            this.CompletePanel.onComplete = false;
        },
    addAffair(){
        let NewAffair = this.NewBlock;
        if(NewAffair.name.trim() == '' || NewAffair.describe.trim() == ''){
            alert("事务的名称或描述不能为空");
            return;
        }
        NewAffair.owner=this.$store.state.user.id;
        this.axios.post(this.Tool.config.address + '/affair/add',NewAffair)
            .then(()=>{
            this.NewBlock.name = '';
            this.NewBlock.describe = '';
            this.getAllAffair();
            })
    },
            removeAffairRecord(id){
        let Affair = {id};
        this.axios.post(this.Tool.config.address + '/affairRecord/remove',Affair)
            .then(()=>{
            this.Editor.onEditorAffair = false;
            this.getAllAffair();
            })
    },
    // 删除事务
    removeAffair(id){
        let Affair = {id};
        this.axios.post(this.Tool.config.address + '/affair/remove',Affair)
            .then(()=>{
            this.Editor.onEditorAffair = false;
            this.getAllAffair();
            })
    },
        // 新增事务记录

    // 更新事务信息
    updateAffair(){
        let NewAffair = this.Editor.NewAffair;
        if(NewAffair.name.trim() == '' || NewAffair.describe.trim() == '' || NewAffair.icon.trim() == ''){
            alert("事务新信息不能为空!");
            return;
        }
        this.axios.post(this.Tool.config.address + '/affair/update',NewAffair)
            .then(()=>{
            this.getAllAffair();
            this.Editor.showIconList = false;
            this.Editor.onEditorAffair = false;
            })
    },
    // 获取所有图标
    getAllIcon(){
        this.axios.get(this.Tool.config.address + '/icon/all')
            .then(res=>{
            this.IconList = res.data;
            })
    },
        // 获取所有事务
    getAllAffair(){
        let that = this;
        this.axios.get(this.Tool.config.address + '/affair/all/'+this.$store.state.user.id )
            .then(res=>{
            this.AffairList = res.data;
            this.RecordList = [];
            this.HistoryRecord = [];
            this.AffairList.forEach(item=>{
                if(Array.isArray(item.record) && item.record.length > 0){
                for(let i = 0;i<item.record.length;i++){
                    item.record[i].affair = item;
                    that.RecordList.push(item.record[i]);
                    // 设置单个记录
                    let record = item.record[i];
                    // 初始化历史记录索引
                    if(this.HistoryRecord.length == 0){
                    let newDate = {
                        data:this.NowDate.data,
                        record:[],
                        date:new Date(this.NowDate.time)
                    }
                    this.HistoryRecord.push(newDate);
                    this.RecordShowDate = this.HistoryRecord[0];
                    for(let e=1;e<100;e++){
                        let dayTime = this.NowDate.time - e * 86400000;
                        let dayData = this.Tool.FormatDate(dayTime);
                        let newDate = {
                        data:dayData,
                        record:[],
                        date:new Date(dayTime)
                        }
                        this.HistoryRecord.push(newDate);
                    }
                    }
                    for(let j = 0 ; j < this.HistoryRecord.length;j++){
                    let HisDate = this.HistoryRecord[j].data;
                    let TargetRecord = record.data;
                    let Date = this.HistoryRecord[j];
                    if(HisDate.year == TargetRecord.year && HisDate.month == TargetRecord.month && HisDate.day == TargetRecord.day){
                        Date.record.push(record);
                        break;
                    }
                    }
                    this.AllAffairDay = 0;
                    this.HistoryRecord.forEach(item=>{
                    if(item.record.length >= 1){
                        this.AllAffairDay += 1;
                    }
                    })
                }
                }
            })
            // 对记录进行时间排序
            this.RecordList.sort((a,b)=>{
                if(a.data.hour != b.data.hour){
                return b.data.hour - a.data.hour;
                }else if(a.data.min != b.data.min){
                return b.data.min - a.data.min;
                }else{
                return b.data.sec - a.data.sec;
                }
            })
            this.AffairList.sort((a,b)=>{
                return b.record.length - a.record.length;
            })
            })
    },
        // 本地修改事务
        changeAffairInfo(item) {
            this.Editor.editorAffair = item;
            this.Editor.NewAffair._id = item._id;
            this.Editor.NewAffair.name = item.name;
            this.Editor.NewAffair.describe = item.describe;
            this.Editor.NewAffair.icon = item.icon;
            if (this.Editor.NewAffair.icon == "") {
                this.Editor.NewAffair.icon = this.IconList[0].font_class;
            }
        },
    },
    computed: {
        isToday(data) {
            let NowData = this.NowDate.data;
            if (
                data.year == NowData &&
                data.month == NowData.month &&
                data.day == NowData.day
            ) {
                return true;
            }
            return false;
        },
    },
    created() {},
    mounted() {
        // 初始化数据
        this.NowDate.data = this.Tool.FormatDate(this.NowDate.time);
        this.NowDate.Date = new Date(this.NowDate.time);
        this.getAllAffair();
        this.getAllIcon();
        // 页面标题
        document.title = "DataLife-" + "事务";
        // 跳转移动端
        if (document.documentElement.clientWidth < 1000) {
            this.$router.push("affair_mobile");
        }
        this.keyDown();
    },
};
</script>
<style lang="less" scoped>
@import "./../less/Affair.less";
</style>
