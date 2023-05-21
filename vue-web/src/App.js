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