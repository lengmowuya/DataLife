<template>
    <div id="SignPage" :class="{onSign:onSign}">
        <div class="backgroundLogo">DataLife</div>
        <transition name="appear">
            <SignBlock @changePage="changePage"  v-show="onSign"></SignBlock>
        </transition>
        <transition name="appear">
            <LoginBlock @changePage="changePage" v-show="!onSign"></LoginBlock>
        </transition>
    </div>
</template>

<script>
import SignBlock from './SignBlock/SignBlock.vue';
import LoginBlock from './LoginBlock/LoginBlock.vue';
export default {
    name:'Sign',
    components:{
        SignBlock,
        LoginBlock
    },
    data() {
        return {
            nodeError: false,
            onSign: false
        };
    },
    methods: {
        changePage(toSign){
            this.onSign = toSign;
        }
    },
    mounted() {
        // 检测与服务器连接
        this.Work.User.TestServer().then(
            () => {
                this.nodeError = false;
            },
            (error) => {
                console.log(error);
                this.nodeError = true;
            }
        );
    },
};
</script>

<style scoped lang="less">
@import url(./Sign.less);
</style>