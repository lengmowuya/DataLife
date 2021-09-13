// 数据库信息
let DB = {
    version:1,
    name:"DataLife",
    request:null,
    IndexedDB:null,
    open(){
        // 打开数据库
        let request = indexedDB.open(this.name,this.version);
        request.onerror = (event)=>
            console.log("数据库打开失败,错误代码" + event.target.error.code);
        request.onsuccess = (event)=>{
            console.log(request.result);
            this.IndexedDB = request.result;
            console.log("数据库打开成功");
            // console.log(DB);
            page_thought();
        }
        // 数据库发生升级
        request.onupgradeneeded  = (event)=>{
            console.log("数据库升级");
            this.IndexedDB = event.target.result;
            // 创建对象仓库autoIncrement
            if(!this.IndexedDB.objectStoreNames.contains(ThoughtSurface.name)){
                this.IndexedDB.createObjectStore(ThoughtSurface.name,{autoIncrement:true});
            }
            if(!this.IndexedDB.objectStoreNames.contains(EmitionSurface.name)){
                let objectStoreRequest = this.IndexedDB.createObjectStore(EmitionSurface.name,{autoIncrement:true});
                // objectStoreRequest.onsuccess = ()=>{
                    let NormalEmotion = ['忧愁','伤感',"无奈","愤怒","悲愤","痛惜","恍惚"];
                    for(let i=0;i<NormalEmotion.length;i++){
                        objectStoreRequest.add(new Emotion(NormalEmotion[i]));
                    }
                // }
            }
        }
    }

}
// 短文表
let ThoughtSurface = {
    name:"Thoughts",
    transaction:null,
    all(callback){
        let request = DB.IndexedDB.transaction([this.name],'readwrite');
        let objectStore = request.objectStore(this.name);
        let ListRequest = objectStore.getAll();
        ListRequest.onsuccess = callback;
    },
    add(text){
        let request = DB.IndexedDB.transaction([this.name],'readwrite');
        let objectStore = request.objectStore(this.name);
        objectStore.add(new Thoughts(text));
    }
}
// 状态表
let EmitionSurface = {
    name:"Emotions",
    transaction:null,
    all(callback){
        let request = DB.IndexedDB.transaction([this.name],'readwrite');
        let objectStore = request.objectStore(this.name);
        let ListRequest = objectStore.getAll();
        ListRequest.onsuccess = callback;
    },
    add(name){
        let request = DB.IndexedDB.transaction([this.name],'readwrite');
        let objectStore = request.objectStore(this.name);
        objectStore.add(new Emotion(name));
    }
}
DB.open();


// // 写入数据
// function writeDB(){
//     let request = DB.IndexedDB.transaction([this.name],'readwrite');
//     let objectStore = request.objectStore(this.name);
//     // let List = objectStore.getAll().result.length;
//     // let AddRequest = objectStore.add(new Thoughts("今天规范开发的你,不会给以后开发的你使绊子!"));
//     // AddRequest.onsuccess = (event)=>
//     //     console.log("数据写入成功");
//     // AddRequest.onerror = (event)=>
//     //     console.log("写入错误,错误代码:"+event.target.error.code);
//     let ListRequest = objectStore.getAll();
//     ListRequest.onsuccess = (event)=>{
//         console.log(ListRequest.result);
//     }
// }
// // 读取数据
// function readDB(){
//     let transaction = DB.IndexedDB.transaction([localDB.name]);
//     let objectStore = transaction.objectStore(localDB.name);
//     let request = objectStore.get(1);
//     request.onerror = (event)=>
//         console.log("事务读取失败");
//     request.onsuccess = (event)=>{
//         if(request.result){
//             // console.log(request.result);
//         }else{
//             console.log("读取数据为空");
//         }
//     }
// }