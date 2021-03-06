// 用户相关业务
let User = {
    SignUser(SignBlock) {
        let request = new Promise((resolve, reject) => {
            let myUser = {
                name: SignBlock.email,
                email: SignBlock.email,
                passward: SignBlock.passward
            }
            if (myUser.email.trim() == '' || myUser.passward.trim() == '') {
                reject("DataError");
                return;
            }
            this.axios.post(this.Tool.config.address + '/user/sign', myUser)
                .then((res) => {
                    resolve({
                        res,
                        myUser
                    });
                })
        });
        return request;

    },
    // 用户登录
    LoginUser(User) {
        let request = new Promise((resolve, reject) => {
            let myUser = {
                name: User.email,
                email: User.email,
                passward: User.passward
            }
            if (myUser.email.trim() == '' || myUser.passward.trim() == '') {
                reject("DataError");
                return;
            }
            this.axios.post(this.Tool.config.address + '/user/login', myUser)
                .then((res) => {
                    resolve({
                        res,
                        myUser
                    });
                })
                .catch((error) => {
                    reject("NetError", error);
                })
        });
        return request;
    },
    TestServer() {
        let request = new Promise((resolve, reject) => {
            // 检测与服务器连接
            this.axios.get(this.Tool.config.address + '/test')
                .then(() => {
                    resolve();
                })
                .catch((error) => {
                    if (error) {
                        reject(error);
                    }
                })
        });
        return request;

    }
}
// 事务相关业务
let Affair = {
    // 用户新赠事务
    AddAffair(NewAffair) {
        let request = new Promise((resolve, reject) => {
            // 事务数据不能为空
            if (NewAffair.name.trim() == '' || NewAffair.describe.trim() == '') {
                reject('DataError');
            } else {
                // 增添事务所有者
                // NewAffair.owner = this.$store.state.user.id;
                this.axios.post(this.Tool.config.address + '/affair/add', NewAffair)
                    .then(() => {
                        resolve();
                    }, () => {
                        reject("NetError");
                    })
            }
        })
        return request;
    },
    // 删除事务
    RemoveAffair(id) {
        let request = new Promise((resolve, reject) => {
            this.axios.post(this.Tool.config.address + '/affair/remove', {id})
                .then(() => {
                    // this.Editor.onEditorAffair = false;
                    // this.getAllAffair();
                    resolve();
                })
                .catch(() => {
                    reject("NetError");
                })
        })
        return request;
    },
    // 更新事务信息
    UpdateAffair(NewAffair) {
        let request = new Promise((resolve, reject) => {
            if (NewAffair.name.trim() == '' || NewAffair.describe.trim() == '' || NewAffair.icon.trim() == '') {
                // alert("事务新信息不能为空!");
                reject('DataError');
            } else {
                this.axios.post(this.Tool.config.address + '/affair/update', NewAffair)
                    .then(() => {
                        resolve();
                    })
                    .catch(() => {
                        reject("NetError");
                    })
            }

        })
        return request;
    },
    // 获取所有事务
    GetAllAffair() {
        let request = new Promise((resolve,reject)=>{
            this.axios.get(this.Tool.config.address + '/affair/all/' + this.$store.state.user.id)
                .then(res => {
                    resolve(res);
                },()=>{
                    console.log("reject");
                    reject("NetError");
                })

        });
        return request;
    },
    ComputeLevel(count){
        let nowCount = count;
        let nextLevel = 5;
        let nowLevel = 0;
        while(nowCount >= nextLevel){
            nowCount-=nextLevel;
            nextLevel+=5;
            nowLevel++;
        }
        return {level:nowLevel,count:nowCount};
    }
}
// 事务记录相关业务
let AffairRecord = {
    // 新增事务记录
    AddAffairRecord() {
        let request = new Promise((resolve, reject) => {
            if (this.pushSentence.trim() == '') {
                alert("请填入您的总结");
                // resolve();
                reject('DataError');
                return;
            }
            let info = {
                affair: this.pushAffair._id,
                sentence: this.pushSentence
            }
            this.axios.post(this.Tool.config.address + '/affairRecord/add', info)
                .then(() => {
                    resolve();
                    // this.getAllAffair();
                    // this.onPushRecord = false;
                    // this.pushAffair = null;
                    // this.pushSentence = '';
                })
                .catch(() => {
                    reject('NetError');
                })
        });
        return request;
    },
    RemoveAffairRecord(id) {
        let request = new Promise((resolve, reject) => {
            this.axios.post(this.Tool.config.address + '/affairRecord/remove', {
                    id
                })
                .then(() => {
                    // this.Editor.onEditorAffair = false;
                    // this.getAllAffair();
                    resolve();
                })
        })
        return request;
    }
}
// 图标相关业务
let Icon = {
    // 获取所有图标
    GetAllIcon() {
        let request = new Promise((resolve, reject) => {
            this.axios.get(this.Tool.config.address + '/icon/all')
                .then(res => {
                    // this.IconList = res.data;
                    // if(this.Editor.NewAffair.icon == ''){
                    //     this.Editor.NewAffair.icon = this.IconList[0].font_class;
                    // }
                    resolve(res);
                })
                .catch(() => {
                    reject('NetError');
                })
        });
        return request;
    }
}
// 短文相关业务
let Thought = {
    //新增短文
    WriteThought() {
        let request = new Promise((resolve, reject) => {
            let data = {
                text: this.writeText,
                emotion: this.thoughtEmotion._id,
                owner: this.$store.state.user.id
            }
            if (this.writeText.trim() == "") {
                // alert("记录内容不能为空");
                reject("DataError", 'trim');
                return;
            } else if (this.thoughtEmotion._id == null) {
                // alert("请选择一个状态");
                reject("DataError", 'type');
                return;
            }
            // let that = this;
            this.axios.post(this.Tool.config.address + '/thought/add', data)
                .then(() => {
                    //   that.updateDate();
                    resolve();
                });
            // this.writeText = "";
        });
        return request;
    },
    //删除短文
    RemoveThought(_id) {
        let request = new Promise((resolve, reject) => {
            // let that = this;
            this.axios.post(this.Tool.config.address + '/thought/remove', {
                    _id
                })
                .then(() => {
                    // that.updateDate();
                    resolve();
                })
                .catch(() => {
                    reject('NetError');
                })
        })
        return request;
    },
}
let Work = {
    User,
    Affair,
    AffairRecord,
    Icon,
    Thought
}
export default Work;