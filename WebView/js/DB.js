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
            this.IndexedDB = request.result;
            console.log("数据库打开成功");
            console.log(DB);
            page_thought();
        }
        // 数据库发生升级
        request.onupgradeneeded  = (event)=>{
            console.log("数据库升级");
            this.IndexedDB = event.target.result;
            // 创建对象仓库autoIncrement
            if(!DB.objectStoreNames.contains(this.name)){
                let objectStore =  DB.createObjectStore(localDB.name,{autoIncrement:true});
            }
        }
    }
}
// 对象表
let ThoughtSurface = {
    name:"thoughts",
    transaction:null,
    all(callback){
        let request = DB.IndexedDB.transaction([DB.name],'readwrite');
        let objectStore = request.objectStore(DB.name);
        let ListRequest = objectStore.getAll();
        ListRequest.onsuccess = callback;
    }
}

DB.open();


// 写入数据
function writeDB(){
    let request = DB.IndexedDB.transaction([localDB.name],'readwrite');
    let objectStore = request.objectStore(localDB.name);
    // let List = objectStore.getAll().result.length;
    // let AddRequest = objectStore.add(new Thoughts("今天规范开发的你,不会给以后开发的你使绊子!"));
    // AddRequest.onsuccess = (event)=>
    //     console.log("数据写入成功");
    // AddRequest.onerror = (event)=>
    //     console.log("写入错误,错误代码:"+event.target.error.code);
    let ListRequest = objectStore.getAll();
    ListRequest.onsuccess = (event)=>{
        console.log(ListRequest.result);
    }
}
// 读取数据
function readDB(){
    let transaction = DB.IndexedDB.transaction([localDB.name]);
    let objectStore = transaction.objectStore(localDB.name);
    let request = objectStore.get(1);
    request.onerror = (event)=>
        console.log("事务读取失败");
    request.onsuccess = (event)=>{
        if(request.result){
            // console.log(request.result);
        }else{
            console.log("读取数据为空");
        }
    }
}