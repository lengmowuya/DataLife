<template>
    <div id="DataLife">
        <audio id="audioController" controler>
            <source src="./../src/assets/audio/award.mp3" type="audio/mpeg">
          </audio>
        <p class="errorHint" v-if="nodeError">NetError:服务链接错误,请联系DalaLife管理员!</p>
        <!-- 桌面端导航栏 -->

        <header id="DataLifeNav" v-if="showNav">
            <div id="Logo">
                <img src="./assets/DataLife.png" alt="">
                DataLife
            </div>
            <router-link to="/affair">
                <el-icon><HomeFilled /></el-icon>事务
            </router-link>
            <router-link to="/thought">
                <el-icon><Opportunity /></el-icon>短语
            </router-link>
            <router-link to="/self">
                <el-icon><UserFilled /></el-icon>生涯
            </router-link>
        </header>
        <!-- <router-view /> -->
        <div id="View">
            <router-view v-slot="{ Component }">
                <transition name="fade">
                    <!-- <keep-alive include="User,Thought" > -->
                        <component :is="Component" />
                    <!-- </keep-alive> -->
                </transition>
            </router-view>
        </div>
    </div>
</template>
<script>
    import AppJS from './App';
    export default AppJS;
</script>
<style lang="less">
    @import "./App.less";
</style>
