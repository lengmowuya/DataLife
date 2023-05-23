<template>
    <div id="DataLife">
        <!-- 桌面端导航栏 -->
        <header id="DataLifeNav" v-if="showNav">
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
        <router-view />
    </div>
</template>
<script>
    import AppJS from './App';
    export default AppJS;
</script>
<style lang="less">
    @import "./App.less";
</style>
