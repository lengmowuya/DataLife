<template>
    <div id="DataLife">
        <!-- 桌面端导航栏 -->
        <header id="DataLifeNav" v-if="showNav">
            <router-link to="/affair">
                <i class="el-icon-s-claim"></i>事务
            </router-link>
            <router-link to="/thought">
                <i class="el-icon-s-opportunity"></i>短语
            </router-link>
            <router-link to="/self"><i class="el-icon-s-custom"></i>生涯</router-link>
        </header>
        <router-view />
    </div>
</template>
<script>
    export default {
        data() {
            return {
                showNav: true,
                List: [],
                isMobile: false,
                writeText: "",
                dateList: [],
                EmotionList: [],
                thoughtEmotion: {
                    name: "状态",
                    _id: null,
                },
                showEmotionList: false,
                date: {},
            };
        },
        methods: {
            // 1.生成以今日为基准往前的初始DateList
            CreateRecordDateList() {
                let RecordDateList = this.$store.state.RecordDateList;
                let NowDate = this.$store.state.NowDate;
                let newDate = {
                    data: this.Tool.FormatDate(NowDate.time),
                    record: [],
                    date: new Date(NowDate.time),
                };
                RecordDateList.push(newDate);
                for (let AgoDay = 1; AgoDay < 100; AgoDay++) {
                    let dayTime = NowDate.time - AgoDay * 86400000;
                    let dayData = this.Tool.FormatDate(dayTime);
                    let newDate = {
                        data: dayData,
                        record: [],
                        date: new Date(dayTime),
                    };
                    RecordDateList.push(newDate);
                }
            },
            // 2.创建并更新AffairRecord
            UpdeteAffairRecordList() {
                let AffairList = this.$store.state.AffairList;
                this.$store.state.AffairRecordList = [];
                let AffairRecordList = this.$store.state.AffairRecordList;
                AffairList.forEach((item) => {
                    // 将Affair下的Record添加到总Record列表里
                    AffairRecordList = AffairRecordList.concat(item.record);
                    item.record.forEach((record) => {
                        record.affair = item;
                    });
                });
                this.$store.state.AffairRecordList = AffairRecordList;
            },
            // 3.为RecordDateList添加其DateLi下所属的Record
            UpdeteRecordDateList() {
                let AffairRecordList = this.$store.state.AffairRecordList;
                let RecordDateList = this.$store.state.RecordDateList;
                AffairRecordList.forEach((record) => {
                    for (let j = 0; j < RecordDateList.length; j++) {
                        let HisDate = RecordDateList[j].data;
                        let TargetRecord = record.data;
                        let DateLi = RecordDateList[j];
                        if (
                            HisDate.year == TargetRecord.year &&
                            HisDate.month == TargetRecord.month &&
                            HisDate.day == TargetRecord.day
                        ) {
                            // console.log("DateLi");
                            DateLi.record.push(record);
                            break;
                        }
                    }
                });
            },
            // 4.根据AffairRecord时间对其进行从高到低排序
            SortAffairRecordDate() {
                this.$store.state.AffairRecordList.sort((a, b) => {
                    if (a.data.hour != b.data.hour) {
                        return b.data.hour - a.data.hour;
                    } else if (a.data.min != b.data.min) {
                        return b.data.min - a.data.min;
                    } else {
                        return b.data.sec - a.data.sec;
                    }
                });
            },
            // 根据Affair等级对其进行从高到低排序
            SortAffairLevel() {
                this.$store.state.AffairList.forEach((item) => {
                    let result = this.Work.Affair.ComputeLevel(item.record.length);
                    // console.log(result);
                    item.level = result.level;
                    item.count = result.count;
                });
                this.$store.state.AffairList.sort((a, b) => {
                    return b.record.length - a.record.length;
                });
            },

            BindVueToWork() {
                this.Work.prototype = this;
                this.Work.__proto__ = this;
                this.Work.User.__proto__ = this.Work.__proto__;
                this.Work.Affair.__proto__ = this.Work.__proto__;
                this.Work.AffairRecord.__proto__ = this.Work.__proto__;
                this.Work.Icon.__proto__ = this.Work.__proto__;
                this.Work.Thought.__proto__ = this.Work.__proto__;
            },
            // 用户登录
            LoginUser(isRemember, User) {
                // let that = this;
                let request = new Promise((resolve, reject) => {
                    if (this.$store.state.isLogin) {
                        resolve();
                        return;
                    }
                    this.Work.User.LoginUser(User).then(
                        (data) => {
                            let res = data.res;
                            let myUser = data.myUser;
                            let log = res.data.type;
                            myUser.id = res.data.id;
                            if (log == "success") {
                                this.$store.state.user = myUser;
                                this.$store.state.isLogin = true;
                                if (isRemember) {
                                    this.Tool.writeUserStorage(
                                        myUser.email,
                                        myUser.passward
                                    );
                                }
                                resolve();
                                if (this.$route.path == "/login") {
                                    this.$router.push("affair");
                                }
                                // console.log(that.$route.path);
                            } else if (log == "null") {
                                alert("未找到用户");
                                reject();
                            } else if (log == "error") {
                                alert("密码错误");
                                reject();
                            }
                        },
                        (ErrorTip) => {
                            if (ErrorTip == "DataError") {
                                alert("邮箱和密码请勿为空");
                            } else if (ErrorTip == "NetError") {
                                alert("服务请求错误");
                            } else {
                                alert("未知错误");
                                console.log(ErrorTip);
                            }
                            reject();
                        }
                    );
                });
                return request;
            },
        },
        beforeCreate() {
            // BindVueToWork();
            this.Work.prototype = this;
            this.Work.__proto__ = this;
            this.Work.User.__proto__ = this.Work.__proto__;
            this.Work.Affair.__proto__ = this.Work.__proto__;
            this.Work.AffairRecord.__proto__ = this.Work.__proto__;
            this.Work.Icon.__proto__ = this.Work.__proto__;
            this.Work.Thought.__proto__ = this.Work.__proto__;
        },
        mounted() {
            this.$store.state.NowDate = {
                time: new Date().getTime(),
                data: {},
                Date: new Date(),
            };
            this.BindVueToWork();
            this.$watch(
                () => this.$route,
                (count, prevCount) => {
                    if (count.fullPath == "/sign") {
                        this.showNav = false;
                    } else {
                        this.showNav = true;
                    }
                }
            );
            if (this.$store.state.user.email == "") {
                let user = this.Tool.getUserStorage();
                if (user.email == "" || user.email == undefined) {
                    return;
                }
                this.$store.state.user.email = user.email;
                this.$store.state.user.passward = user.passward;
            }
            this.LoginUser(false, this.$store.state.user)
                .then(() => {
                    this.Work.Affair.GetAllAffair().then(
                        (res) => {
                            this.$store.state.AffairList = res.data;
                            this.CreateRecordDateList();
                            this.UpdeteAffairRecordList();
                            this.UpdeteRecordDateList();
                            this.SortAffairRecordDate();
                            this.SortAffairLevel();
                        },
                        () => {
                            alert("服务请求错误-ERROR");
                        }
                    );
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        updated() {
        },
    };
</script>
<style lang="less">
@import "./App.less";
</style>
