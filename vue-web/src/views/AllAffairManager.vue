<template>
    <div id="AffairPage">
        <div class="PageCore">
            <div class="MyAffairBigBlock">
                <div class="MyAffair">
                    <div class="NullBlockTip" v-if="AffairList.length <= 0">
                        您暂无事务,先创建一个吧!
                    </div>
                    <div v-for="(item, index) in AffairList" :key="index" :class="{
                            AffairLi: true,
                            active: activeAffairId == item._id,
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
                                    <i class="el-icon-s-tools"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 编辑该事务板块(默认隐藏) -->
        <EditorAffairPanel ref="EditorPanel">
        </EditorAffairPanel>
    </div>
</template>
<script>
import EditorAffairPanel from "./../components/EditorAffairPanel.vue";
export default {
    components: {
        EditorAffairPanel,
    },
    data() {
        return {
            EditorPanelInfo: {
                showPanel: false,
                TargetAffair: null,
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
        OpenEditorPanel(item){
            this.$refs.EditorPanel.Open(item)
        },
        // keyDown() {},
        // 切换选中的事务
        closeEditorPanel() {
            this.EditorPanelInfo.showPanel = false;
        },

        // 获取所有事务
        getAllAffair() {
            let that = this;
            this.axios
                .get(
                    this.Tool.config.address +
                        "/affair/all/" +
                        this.$store.state.user.id
                )
                .then((res) => {
                    this.AffairList = res.data;
                    this.RecordList = [];
                    this.HistoryRecord = [];
                    this.AffairList.forEach((item) => {
                        if (
                            Array.isArray(item.record) &&
                            item.record.length > 0
                        ) {
                            for (let i = 0; i < item.record.length; i++) {
                                item.record[i].affair = item;
                                that.RecordList.push(item.record[i]);
                                // 设置单个记录
                                let record = item.record[i];
                                // 初始化历史记录索引
                                if (this.HistoryRecord.length == 0) {
                                    let newDate = {
                                        data: this.NowDate.data,
                                        record: [],
                                        date: new Date(this.NowDate.time),
                                    };
                                    this.HistoryRecord.push(newDate);
                                    this.RecordShowDate = this.HistoryRecord[0];
                                    for (let e = 1; e < 100; e++) {
                                        let dayTime =
                                            this.NowDate.time - e * 86400000;
                                        let dayData =
                                            this.Tool.FormatDate(dayTime);
                                        let newDate = {
                                            data: dayData,
                                            record: [],
                                            date: new Date(dayTime),
                                        };
                                        this.HistoryRecord.push(newDate);
                                    }
                                }
                                for (
                                    let j = 0;
                                    j < this.HistoryRecord.length;
                                    j++
                                ) {
                                    let HisDate = this.HistoryRecord[j].data;
                                    let TargetRecord = record.data;
                                    let Date = this.HistoryRecord[j];
                                    if (
                                        HisDate.year == TargetRecord.year &&
                                        HisDate.month == TargetRecord.month &&
                                        HisDate.day == TargetRecord.day
                                    ) {
                                        Date.record.push(record);
                                        break;
                                    }
                                }
                                this.AllAffairDay = 0;
                                this.HistoryRecord.forEach((item) => {
                                    if (item.record.length >= 1) {
                                        this.AllAffairDay += 1;
                                    }
                                });
                            }
                        }
                    });
                    // 对记录进行时间排序
                    this.RecordList.sort((a, b) => {
                        if (a.data.hour != b.data.hour) {
                            return b.data.hour - a.data.hour;
                        } else if (a.data.min != b.data.min) {
                            return b.data.min - a.data.min;
                        } else {
                            return b.data.sec - a.data.sec;
                        }
                    });
                    this.AffairList.sort((a, b) => {
                        return b.record.length - a.record.length;
                    });
                });
        },
        // // 本地修改事务
        // changeAffairInfo(item) {
        //     this.Editor.editorAffair = item;
        //     this.Editor.NewAffair._id = item._id;
        //     this.Editor.NewAffair.name = item.name;
        //     this.Editor.NewAffair.describe = item.describe;
        //     this.Editor.NewAffair.icon = item.icon;
        //     if (this.Editor.NewAffair.icon == "") {
        //         this.Editor.NewAffair.icon = this.IconList[0].font_class;
        //     }
        // },        
        // 获取所有图标
        getAllIcon() {
            this.axios
                .get(this.Tool.config.address + "/icon/all")
                .then((res) => {
                    this.IconList = res.data;
                });
        },
    },
    computed: {
    },
    created() {},
    mounted() {
        this.getAllAffair();
        this.getAllIcon();
    },
};
</script>
<style lang="less" scoped>
@import "./../less/AllAffairManager.less";
</style>
