<template>
    <div id="DataLife">
        <!-- 桌面端导航栏 -->
        <header id="DataLifeNav" v-if="showNav">
            <router-link to="/affair">
                <i class="el-icon-s-claim"></i>事务
            </router-link>
            <router-link to="/thought">
                <i class="el-icon-s-opportunity"></i>短语
            </router-link>
            <router-link to="/self"><i class="el-icon-s-custom"></i>生涯</router-link>
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
