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
        getAllAffair() {
            console.log('geting...');
            this.axios.get(
                    this.Tool.config.address +
                        "/affair/all/" +
                        this.$store.state.user.id
                )
                .then((res) => {
                    // this.AffairList = [];
                    this.$data.AffairList = res.data;
                    this.$forceUpdate();
                    // res.data.forEach((item) => {
                    //     this.AffairList.push(item);
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