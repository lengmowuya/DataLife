import CreateAffair from "./CreateAffair/CreateAffair.vue";
import FinishBlock from "./FinishBlock/FinishBlock.vue";
import ComplateAffair from "./ComplateAffair/ComplateAffair.vue";
import AffairLi from "./AffairLi/AffairLi.vue";
export default {
    components: {
        CreateAffair,
        FinishBlock,
        ComplateAffair,
        AffairLi
    },
    data() {
        return {
            CompletePanel: {
                onComplete: false,
                TargetAffair: null,
            },
            CreateAffair: {},
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
        };
    },
    methods: {
        OpenNewAffairPanel() {
            this.$refs.CreateAffair.Open();
        },
        keyDown() {},
        // 切换选中的事务
        changeActiveAffair(id) {
            this.activeAffairId = id;
        },
        closeCompleteAffairPanel() {
            this.CompletePanel.onComplete = false;
        },
        // 获取所有图标
        getAllIcon() {
            this.axios
                .get(this.Tool.config.address + "/icon/all")
                .then((res) => {
                    this.IconList = res.data;
                });
        },
        // 获取所有事务
        /*
         */
        getAllAffair() {
            let that = this;
            this.axios
                .get(
                    this.Tool.config.address +
                        "/affair/all/" +
                        this.$store.state.user.id
                )
                .then((res) => {
                    this.AffairList.length == 0;
                    res.data.forEach((item) => {
                        this.AffairList.push(item);
                    });
                    // this.AffairList = res.data;
                    // this.RecordList = [];
                    // this.HistoryRecord = [];
                    // this.AffairList.forEach((item) => {
                    //     if (
                    //         Array.isArray(item.record) &&
                    //         item.record.length > 0
                    //     ) {
                    //         for (let i = 0; i < item.record.length; i++) {
                    //             item.record[i].affair = item;
                    //             that.RecordList.push(item.record[i]);
                    //             // 设置单个记录
                    //             let record = item.record[i];
                    //             // 初始化历史记录索引
                    //             if (this.HistoryRecord.length == 0) {
                    //                 let newDate = {
                    //                     data: this.NowDate.data,
                    //                     record: [],
                    //                     date: new Date(this.NowDate.time),
                    //                 };
                    //                 this.HistoryRecord.push(newDate);
                    //                 this.RecordShowDate = this.HistoryRecord[0];
                    //                 for (let e = 1; e < 100; e++) {
                    //                     let dayTime =
                    //                         this.NowDate.time - e * 86400000;
                    //                     let dayData =
                    //                         this.Tool.FormatDate(dayTime);
                    //                     let newDate = {
                    //                         data: dayData,
                    //                         record: [],
                    //                         date: new Date(dayTime),
                    //                     };
                    //                     this.HistoryRecord.push(newDate);
                    //                 }
                    //             }
                    //             for (
                    //                 let j = 0;
                    //                 j < this.HistoryRecord.length;
                    //                 j++
                    //             ) {
                    //                 let HisDate = this.HistoryRecord[j].data;
                    //                 let TargetRecord = record.data;
                    //                 let Date = this.HistoryRecord[j];
                    //                 if (
                    //                     HisDate.year == TargetRecord.year &&
                    //                     HisDate.month == TargetRecord.month &&
                    //                     HisDate.day == TargetRecord.day
                    //                 ) {
                    //                     Date.record.push(record);
                    //                     break;
                    //                 }
                    //             }
                    //             this.AllAffairDay = 0;
                    //             this.HistoryRecord.forEach((item) => {
                    //                 if (item.record.length >= 1) {
                    //                     this.AllAffairDay += 1;
                    //                 }
                    //             });
                    //         }
                    //     }
                    // });
                    // // 对记录进行时间排序
                    // this.RecordList.sort((a, b) => {
                    //     if (a.data.hour != b.data.hour) {
                    //         return b.data.hour - a.data.hour;
                    //     } else if (a.data.min != b.data.min) {
                    //         return b.data.min - a.data.min;
                    //     } else {
                    //         return b.data.sec - a.data.sec;
                    //     }
                    // });
                    // this.AffairList.sort((a, b) => {
                    //     return b.record.length - a.record.length;
                    // });
                });
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
        this.keyDown();
    },
};