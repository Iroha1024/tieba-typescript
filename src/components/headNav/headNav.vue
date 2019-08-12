<template>
    <div class="head-nav">
        <div class="head-nav-content">
            <div :class="{ logo: true, 'logo-active': logoActive }" @click="back"></div>
            <el-tabs v-model="activeName" @tab-click="tabClick">
                <el-tab-pane v-for="(tab, index) of tabList" :label="tab.label" :name="tab.name" :key="index">
                </el-tab-pane>
            </el-tabs>
            <div class="search" @keypress.enter="search">
                <input type="text" id="search" maxlength="20">
                <i class="el-icon-search" @click="search"></i>
            </div>
            <el-dropdown class="user" trigger="click">
                <img v-lazy="imgUrl">
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item icon="el-icon-user" @click.native="linkToInfo">个人</el-dropdown-item>
                    <el-dropdown-item icon="el-icon-switch-button" @click.native="exit()">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator';
import { Getter } from 'vuex-class';

import { User } from '@/interface/';

@Component
export default class headNav extends Vue {

    @Getter('getUserHeadImg') imgUrl!: string;
    @Getter('getLocalUser') getLocalUser!: User;

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

    //进入贴吧，logo变亮
    get logoActive() {
        let index = this.$route.path.indexOf('/ba');
        return index === 0;
    }

    back() {
        this.$router.go(-1);
    }

    linkToInfo() {
        this.$router.push({ path: `/info/${this.getLocalUser.id}` });
    }

    //注销
    @Emit()
    exit() {
        //清除关注吧列表
        sessionStorage.clear();
    }

    tabClick(tab: any, event: any) {
        this.$router.push(tab.name);
    }

    //搜索
    search() {
        let keyword = (<HTMLInputElement>document.getElementById('search')).value;
        if (!keyword) return;
        this.$router.push({ path: `/search/${keyword}` });
    }
}
</script>

<style lang="scss" scoped>
    /deep/ .el-tabs__item {
        font-size: 18px;
    }
    /deep/ .el-dropdown-menu__item {
        font-size: 18px !important;
        padding: 10px 20px !important;
    }
    .head-nav {
        height: $head-nav-height;
        border-bottom: 1px solid $border-color;
        background-color: #fff;
        .logo {
            height: 60px;
            width: 130px;
            margin-left: 50px;
            background-image: url('../../assets/img/tieba.png');
            display: inline-block;
            background-repeat: no-repeat;
            background-size: cover;
            margin-bottom: 5px;
            &:hover {
                cursor: pointer;
            }
        }
        .logo-active {
            background-image: url('../../assets/img/tieba.png'), linear-gradient(#1952e8, #00c8ff);
            background-blend-mode: lighten;
            background-size: cover;
        }
        .head-nav-content {
            position: relative;
            padding: 5px 0;
            margin: 0 auto;
            width: 1000px;
            height: inherit;
            box-sizing: border-box;
            .el-tabs {
                display: inline-block;
                padding: 0 50px;
            }
            .search {
                display: inline-block;
                position: absolute;
                input {
                    height: 30px;
                    width: 250px;
                    border: 1px solid #ccc;
                    margin: 10px;
                    padding: 5px 40px 5px 20px;
                    border-radius: 5px;
                    font-size: 20px;
                    &:focus {
                        border: 1px solid #000;
                    }
                }
                i {
                    font-size: 30px;
                    position: absolute;
                    left: 285px;
                    top: 17px;
                    color: #ccc;
                    &:hover {
                        cursor: pointer;
                        color: #00c8ff;
                    }
                }
            }
            .user {
                width: 50px;
                height: 50px;
                padding: 5px;
                cursor: pointer;
                position: absolute;
                right: 50px;
                img {
                    width: 100%;
                }
            }
        }
    }
</style>
