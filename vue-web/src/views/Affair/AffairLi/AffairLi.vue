<!-- 组件说明 -->
<template>
    <div :class='[{content:true},{AffairLi:true},{isComplete:item.isComplete}]'>
        <div class="AffairContent">
            <div class="AffairIconBlock">
                <div class="AffairIcon">
                    <svg class="iconBackground" aria-hidden="true">
                        <use :xlink:href="`#icon${item.icon.group}-${item.icon.font_class}`" />
                    </svg>
                    <svg class="icon" aria-hidden="true">
                        <use :xlink:href="`#icon${item.icon.group}-${item.icon.font_class}`" />
                    </svg>
                </div>
            </div>
            <div class="AffairText">
                <p class="AffairLiName">
                    <p class="name">
                        {{ item.name }}
                        <el-icon v-show="item.isComplete" title="今日已完成"><CircleCheckFilled /></el-icon>
                    </p>
                    <div 
                        :class="[{level:true},{level1:item.record.length>10},{level2:item.record.length>100},{level3:item.record.length>1000}]" 
                        v-show="item.record.length>0"
                    >
                        Lv{{ item.record.length }}
                    </div>
                    
                </p>
                <p class="AffairLiDescribe">
                    {{ item.describe }}
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'AffairLi',
        components: {

        },
        props:['item'],
        data () {
            return {

            };
        },
        computed: {

        },
        methods: {

        },
        mounted(){
            // console.log(this.item);
        }
    }
</script>

<style lang='less' scoped>
    @import url('./AffairLi.less');
</style>