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
        LoginUser(User) {
            // let that = this;
            this.Work.User.LoginUserGlobal(this.SignBlock)
                .then((data)=>{
                    console.log(data);
                    this.$store.state.user = data.user;
                    this.$store.state.user.id = data.user._id;
                    this.$store.state.isLogin = true;
                    this.$router.push("affair");
                })
        },
    },
    beforeCreate() {
        // this.BindVueToWork();
        this.Work.prototype = this;
        this.Work.__proto__ = this;
        this.Work.User.__proto__ = this.Work.__proto__;
        this.Work.Affair.__proto__ = this.Work.__proto__;
        this.Work.AffairRecord.__proto__ = this.Work.__proto__;
        this.Work.Icon.__proto__ = this.Work.__proto__;
        this.Work.Thought.__proto__ = this.Work.__proto__;
    },
    mounted() {
        this.BindVueToWork();
        // 是否显示Nav
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

        if (localStorage.getItem('id') == "" || localStorage.getItem('id') == undefined) {
            this.$router.push("sign");
        }else{
            this.$store.state.user.id = localStorage.getItem('id');
            this.$store.state.user.email = localStorage.getItem('email');
            this.$store.state.user.name = localStorage.getItem('name');
            this.$store.state.user.headImg = localStorage.getItem('headImg');
        }
        

    },
    updated() {
        if (localStorage.getItem('id') == "" || localStorage.getItem('id') == undefined) {
            this.$router.push("sign");
        }else{
            this.$store.state.user.id = localStorage.getItem('id');
            this.$store.state.user.email = localStorage.getItem('email');
            this.$store.state.user.name = localStorage.getItem('name');
            this.$store.state.user.headImg = localStorage.getItem('headImg');
        }
    },
};