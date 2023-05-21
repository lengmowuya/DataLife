<!-- 组件说明 -->
<template>
    <div class='content AffairLi'>
        <div class="AffairContent">
            <div class="AffairIconBlock">
                <div class="AffairIcon">
                    <svg class="iconBackground" aria-hidden="true">
                        <use :xlink:href="'#icon-' + item.icon" />
                    </svg>
                    <svg class="icon" aria-hidden="true">
                        <use :xlink:href="'#icon-' + item.icon" />
                    </svg>
                </div>
            </div>
            <div class="AffairText">
                <p class="AffairLiName">{{ item.name }}</p>
                <p class="AffairLiDescribe">
                    {{ item.describe }}
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
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
            console.log(this.item);
        }
    }
</script>

<style lang='less' scoped>
    @import url('./AffairLi.less');
</style>