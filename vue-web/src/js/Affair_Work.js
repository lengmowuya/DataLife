let Worker = {
    // 新增事务
    addAffair(){
        let NewAffair = this.NewBlock;
        if(NewAffair.name.trim() == '' || NewAffair.describe.trim() == ''){
            alert("事务的名称或描述不能为空");
            return;
        }
        NewAffair.owner=this.$store.state.user.id;
        this.axios.post(this.Tool.config.address + '/affair/add',NewAffair)
            .then(()=>{
            this.NewBlock.name = '';
            this.NewBlock.describe = '';
            this.getAllAffair();
            })
    },
    removeAffairRecord(id){
        let Affair = {id};
        this.axios.post(this.Tool.config.address + '/affairRecord/remove',Affair)
            .then(()=>{
            this.Editor.onEditorAffair = false;
            this.getAllAffair();
            })
    },
    // 删除事务
    removeAffair(id){
        let Affair = {id};
        this.axios.post(this.Tool.config.address + '/affair/remove',Affair)
            .then(()=>{
            this.Editor.onEditorAffair = false;
            this.getAllAffair();
            })
    },
    // 新增事务记录
    addAffairRecord(){
        if(this.pushSentence.trim() == ''){
            alert("请填入您的总结");
            return;
        }
        let info = {
            affair:this.pushAffair._id,
            sentence:this.pushSentence
        }
        this.axios.post(this.Tool.config.address + '/affairRecord/add',info)
            .then(()=>{
            this.getAllAffair();
            this.onPushRecord = false;
            this.pushAffair = null;
            this.pushSentence = '';
            })
    },
    // 更新事务信息
    updateAffair(){
        let NewAffair = this.Editor.NewAffair;
        if(NewAffair.name.trim() == '' || NewAffair.describe.trim() == '' || NewAffair.icon.trim() == ''){
            alert("事务新信息不能为空!");
            return;
        }
        this.axios.post(this.Tool.config.address + '/affair/update',NewAffair)
            .then(()=>{
            this.getAllAffair();
            this.Editor.showIconList = false;
            this.Editor.onEditorAffair = false;
            })
    },
    // 获取所有图标
    getAllIcon(){
        this.axios.get(this.Tool.config.address + '/icon/all')
            .then(res=>{
            this.IconList = res.data;
            if(this.Editor.NewAffair.icon == ''){
                this.Editor.NewAffair.icon = this.IconList[0].font_class;
            }
            })
    },
    // 获取所有事务
    getAllAffair(){
        let that = this;
        this.axios.get(this.Tool.config.address + '/affair/all/'+this.$store.state.user.id )
            .then(res=>{
            this.AffairList = res.data;
            this.RecordList = [];
            this.HistoryRecord = [];
            this.AffairList.forEach(item=>{
                if(Array.isArray(item.record) && item.record.length > 0){
                for(let i = 0;i<item.record.length;i++){
                    item.record[i].affair = item;
                    that.RecordList.push(item.record[i]);
                    // 设置单个记录
                    let record = item.record[i];
                    // 初始化历史记录索引
                    if(this.HistoryRecord.length == 0){
                    let newDate = {
                        data:this.NowDate.data,
                        record:[],
                        date:new Date(this.NowDate.time)
                    }
                    this.HistoryRecord.push(newDate);
                    this.RecordShowDate = this.HistoryRecord[0];
                    for(let e=1;e<50;e++){
                        let dayTime = this.NowDate.time - e * 86400000;
                        let dayData = this.Tool.FormatDate(dayTime);
                        let newDate = {
                        data:dayData,
                        record:[],
                        date:new Date(dayTime)
                        }
                        this.HistoryRecord.push(newDate);
                    }
                    }
                    for(let j = 0 ; j < this.HistoryRecord.length;j++){
                    let HisDate = this.HistoryRecord[j].data;
                    let TargetRecord = record.data;
                    let Date = this.HistoryRecord[j];
                    if(HisDate.year == TargetRecord.year && HisDate.month == TargetRecord.month && HisDate.day == TargetRecord.day){
                        Date.record.push(record);
                        break;
                    }
                    }
                    this.AllAffairDay = 0;
                    this.HistoryRecord.forEach(item=>{
                    if(item.record.length >= 1){
                        this.AllAffairDay += 1;
                    }
                    })
                }
                }
            })
            // 对记录进行时间排序
            this.RecordList.sort((a,b)=>{
                if(a.data.hour != b.data.hour){
                return b.data.hour - a.data.hour;
                }else if(a.data.min != b.data.min){
                return b.data.min - a.data.min;
                }else{
                return b.data.sec - a.data.sec;
                }
            })
            this.AffairList.sort((a,b)=>{
                return b.record.length - a.record.length;
            })
            this.Editor.editorAffair = this.AffairList[0];
            this.Editor.NewAffair._id = this.Editor.editorAffair._id;
            this.Editor.NewAffair.name = this.Editor.editorAffair.name;
            this.Editor.NewAffair.describe = this.Editor.editorAffair.describe;
            this.Editor.NewAffair.icon = this.Editor.editorAffair.icon;
            })
    }
}
module.exports = Worker;