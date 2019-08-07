<template>
    <div class="head-nav">
        <div class="head-nav-content">
            <el-tabs v-model="activeName" @tab-click="tabClick">
                <el-tab-pane v-for="(tab, index) of tabList" :label="tab.label" :name="tab.name" :key="index">
                </el-tab-pane>
            </el-tabs>
            <el-dropdown class="user" trigger="click">
                <img v-lazy="imgUrl">
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item icon="el-icon-switch-button" @click.native="exit()">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator';
import { Getter } from 'vuex-class';

@Component
export default class headNav extends Vue {

    @Getter('getUserHeadImg') imgUrl!: string;

    tabList = [
        {
            label: '首页',
            name: '/home'
        },
        {
            label: '关注',
            name: '/follow'
        },
    ]

    get activeName() {
        return '/' + this.$route.path.split('/')[1];
    }

    set activeName(val) {
        
    }

    //注销
    @Emit()
    exit() {}

    tabClick(tab: any, event: any) {
        this.$router.push(tab.name);
      }
}
</script>

<style lang="scss" scoped>
    /deep/ .el-tabs {
        font-size: 40px;
    }
    .head-nav {
        height: 70px;
        margin-bottom: 30px;
        background-color: #fff;
        .head-nav-content {
            position: relative;
            padding: 5px 100px;
            height: inherit;
            box-sizing: border-box;
            box-shadow: 0 -1px 5px 0 #acacaca8 inset;
            .el-tabs {
                display: inline-block;
                padding: 0 50px;
            }
            .user {
                width: 50px;
                height: 50px;
                padding: 5px;
                cursor: pointer;
                position: absolute;
                right: 150px;
                img {
                    width: 100%;
                }
            }
        }
    }
</style>
