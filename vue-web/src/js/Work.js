import axios from 'axios'
import Tool from './Tools'
import { ElMessage } from 'element-plus'
import router from './../router';
// 请求拦截器-添加token信息
axios.interceptors.request.use(function (config) {
    config.headers.token = localStorage.getItem('token');
    return config;
  }, function (error) {
    // axios发生错误的处理
    return Promise.reject(error);
  });
// 请求响应器-响应token是否正常
axios.interceptors.response.use(res => {
    // console.log(res);
    if(res.data.error ==  1 && res.data.type == 'tokenError'){
        ElMessage({
            message: "用户Token已过期,请重新登录",
            type: 'error',
            duration: 5 * 1000
        })
        router.push("sign");
        return Promise.reject(new Error("Error Message"))
    }
    else {
        return Promise.resolve(res)
    }
    },
    err => {
        ElMessage({
            message: err.data.message,
            type: 'error',
            duration: 5 * 1000
        })
})

// 用户相关业务
let User = {
    SignUser(SignBlock) {
        let request = new Promise((resolve, reject) => {
            let myUser = {
                // name: SignBlock.email,
                emailCode:SignBlock.emailCode,
                email: SignBlock.email,
                passward: SignBlock.passward
            }
            if (myUser.email.trim() == '' || myUser.passward.trim() == '') {
                reject("DataError");
                return;
            }
            axios.post(Tool.config.address + '/user/sign', myUser)
                .then((res) => {
                    let user = res.data.user;
                    console.log(res);
                    localStorage.setItem('token',res.data.token);
                    localStorage.setItem('id',user._id);
                    localStorage.setItem('name',user.name);
                    localStorage.setItem('email',user.email);
                    localStorage.setItem('headImg',user.headImg);
                    resolve(res.data);
                })
        });
        return request;

    },
    // 用户登录
    LoginUser(User) {
        let request = new Promise((resolve, reject) => {
                let myUser = {
                    // name: User.email,
                    email: User.email,
                    passward: User.passward
                }
                if (myUser.email.trim() == '' || myUser.passward.trim() == '') {
                    reject("DataError");
                    return;
                }
                axios.post(Tool.config.address + '/user/login', myUser)
                    .then((res) => {
                        resolve(res.data);
                    }).catch((error) => {
                        reject("NetError", error);
                    })
            });
        return request;
    },
    sendEmailCode(address){
        let request = new Promise((resolve, reject) => {
            axios.post(Tool.config.address + '/user/sign/sendEmailCode', {email:address})
                .then((res) => {
                    resolve(res.data);
                }).catch((error) => {
                    reject("NetError", error);
                })
        });
        return request;
    },
    LoginUserGlobal(user){
        // 用户登录
        let request = new Promise((resolve,reject)=>{
            this.LoginUser(user).then(
                (data) => {
                    // let res = data.res;
                    let user = data.user;
                    let log = data.type;
                    user.id = user._id;
                    if (log == "success") {
                        let user = data.user;
                        localStorage.setItem('token',data.token);
                        localStorage.setItem('id',user.id);
                        localStorage.setItem('name',user.name);
                        localStorage.setItem('email',user.email);
                        localStorage.setItem('headImg',user.headImg);
                        resolve(data);
                    } else if (log == "null") {
                        alert("未找到用户");
                        reject();
                    } else if (log == "error") {
                        alert("密码错误");
                        reject();
                    }
                }).catch((ErrorTip) => {
                    if (ErrorTip == "DataError") {
                        alert("邮箱和密码请勿为空");
                    } else if (ErrorTip == "NetError") {
                        alert("服务请求错误");
                    } else {
                        alert("未知错误");
                        // console.log(ErrorTip);
                    }
                    reject(ErrorTip);
                })
        })
        return request;
    },
    TestServer() {
        let request = new Promise((resolve, reject) => {
            // 检测与服务器连接
            axios.get(Tool.config.address + '/test')
                .then(() => {
                    resolve();
                }).catch((error) => {
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
                axios.post(Tool.config.address + '/affair/add', NewAffair)
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
            axios.post(Tool.config.address + '/affair/remove', {id})
                .then(() => {
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
                reject('DataError');
            } else {
                axios.post(Tool.config.address + '/affair/update', NewAffair)
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
            axios.get(Tool.config.address + '/affair/all/' + localStorage.getItem('id'))
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
    // AddAffairRecord(details) {
    //     let request = new Promise((resolve, reject) => {
    //         if (details.pushSentence.trim() == '') {
    //             alert("请填入您的总结");
    //             reject('DataError');
    //             return;
    //         }
    //         let info = {
    //             affair: details.pushAffair._id,
    //             sentence: details.pushSentence
    //         }
    //         axios.post(Tool.config.address + '/affairRecord/add', info)
    //             .then(() => {
    //                 resolve();
    //             }).catch(() => {
    //                 reject('NetError');
    //             })
    //     });
    //     return request;
    // },
    RemoveAffairRecord(id) {
        let request = new Promise((resolve, reject) => {
            axios.post(Tool.config.address + '/affairRecord/remove', {
                    id
                })
                .then(() => {
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
            axios.get(Tool.config.address + '/icon/all')
                .then(res => {
                    resolve(res);
                }).catch(() => {
                    reject('NetError');
                })
        });
        return request;
    }
}
// 短文相关业务
let Thought = {
    //新增短文
    // WriteThought(info) {
    //     let request = new Promise((resolve, reject) => {
    //         let data = {
    //             text: info.writeText,
    //             emotion: info.thoughtEmotion._id,
    //             owner: localStorage.getItem('id')
    //         }
    //         if (info.writeText.trim() == "") {
    //             // alert("记录内容不能为空");
    //             reject("DataError", 'trim');
    //             return;
    //         } 
    //         // else if (info.thoughtEmotion._id == null) {
    //         //     // alert("请选择一个状态");
    //         //     reject("DataError", 'type');
    //         //     return;
    //         // }
    //         axios.post(Tool.config.address + '/thought/add', data)
    //             .then(() => {
    //                 resolve();
    //             });
    //     });
    //     return request;
    // },
    //删除短文
    RemoveThought(_id) {
        let request = new Promise((resolve, reject) => {
            axios.post(Tool.config.address + '/thought/remove', {
                    _id
                })
                .then(() => {
                    resolve();
                }).catch(() => {
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